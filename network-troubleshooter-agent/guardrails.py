"""Guardrails: every tool argument passes through here before touching the network.

The model decides *what* to check; this module decides *whether it is allowed*.
Treat model output like untrusted user input (the agent-era SQL injection).
"""
import ipaddress
import os
import re
import socket
from urllib.parse import urlsplit

# Cloud metadata / platform endpoints. Never reachable, whatever the settings say.
ALWAYS_BLOCKED = {
    ipaddress.ip_address("169.254.169.254"),  # AWS/Azure/GCP instance metadata
    ipaddress.ip_address("168.63.129.16"),  # Azure WireServer
    ipaddress.ip_address("fd00:ec2::254"),  # AWS IMDS over IPv6
}

ALLOWED_PORTS = {21, 22, 25, 53, 80, 110, 143, 389, 443, 445, 465, 587, 636,
                 993, 995, 1433, 1521, 3306, 3389, 5432, 5671, 5672, 6379,
                 8080, 8443, 9092, 9200, 27017}

HOSTNAME_RE = re.compile(
    r"^(?=.{1,253}\.?$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.?$"
)

MAX_MESSAGE_CHARS = 2000
MAX_TOOL_OUTPUT_CHARS = 4000


def private_targets_allowed() -> bool:
    return os.getenv("ALLOW_PRIVATE_TARGETS", "false").lower() == "true"


class GuardrailError(ValueError):
    """Raised when a request is refused by policy. The message is safe to show the model."""


def validate_host(host: str) -> str:
    """Return a clean hostname or IP literal, or raise. Blocks flags, shell chars, URLs."""
    host = (host or "").strip().rstrip(".")
    if not host or len(host) > 253:
        raise GuardrailError("host is empty or too long")
    try:
        return str(ipaddress.ip_address(host))
    except ValueError:
        pass
    if not HOSTNAME_RE.match(host):
        raise GuardrailError(f"'{host[:60]}' is not a valid hostname or IP address")
    if host.lower() in {"localhost", "metadata", "metadata.google.internal"}:
        raise GuardrailError(f"'{host}' is not an allowed target")
    return host.lower()


def check_ip(ip: str) -> None:
    """Refuse IPs outside the target policy (SSRF protection)."""
    addr = ipaddress.ip_address(ip)
    if getattr(addr, "ipv4_mapped", None):
        addr = addr.ipv4_mapped
    if addr in ALWAYS_BLOCKED:
        raise GuardrailError(f"{addr} is a cloud metadata endpoint and is always blocked")
    if addr.is_loopback or addr.is_link_local or addr.is_multicast or addr.is_unspecified or addr.is_reserved:
        raise GuardrailError(f"{addr} is a loopback/link-local/reserved address and is blocked")
    if not addr.is_global and not private_targets_allowed():
        raise GuardrailError(
            f"{addr} is a private address; private targets are disabled (ALLOW_PRIVATE_TARGETS=false)"
        )


def resolve_target(host: str) -> list[str]:
    """Validate, resolve and policy-check a host. Returns the allowed IPs.

    Tools connect to these IPs directly, so a DNS answer cannot change between
    the check and the connection (DNS rebinding).
    """
    host = validate_host(host)
    try:
        infos = socket.getaddrinfo(host, None, proto=socket.IPPROTO_TCP)
    except socket.gaierror as exc:
        raise GuardrailError(f"DNS resolution failed for {host}: {exc.strerror}") from None
    ips = list(dict.fromkeys(info[4][0] for info in infos))
    for ip in ips:
        check_ip(ip)
    return ips


def validate_port(port: int) -> int:
    port = int(port)
    if port not in ALLOWED_PORTS:
        raise GuardrailError(f"port {port} is not in the allowed port list")
    return port


def validate_url(url: str) -> tuple[str, str, int, str]:
    """Return (scheme, host, port, path) for an http(s) URL, or raise."""
    parts = urlsplit((url or "").strip())
    if parts.scheme not in {"http", "https"}:
        raise GuardrailError("only http:// and https:// URLs are allowed")
    if parts.username or parts.password:
        raise GuardrailError("URLs with embedded credentials are not allowed")
    host = validate_host(parts.hostname or "")
    port = validate_port(parts.port or (443 if parts.scheme == "https" else 80))
    path = parts.path or "/"
    if parts.query:
        path += "?" + parts.query
    return parts.scheme, host, port, path


def truncate(text: str, limit: int = MAX_TOOL_OUTPUT_CHARS) -> str:
    """Cap tool output so one noisy command cannot flood the context window."""
    return text if len(text) <= limit else text[:limit] + f"\n...[truncated {len(text) - limit} chars]"
