"""Layer 1 evals: deterministic known answers for the guardrails (the '2 + 2 = 4' tests).
No network, no model. These must always pass."""
import pytest

from guardrails import GuardrailError, check_ip, truncate, validate_host, validate_port, validate_url


@pytest.mark.parametrize("host", ["example.com", "sub.example.co.uk", "8.8.8.8", "2606:4700:4700::1111", "Example.COM."])
def test_valid_hosts_pass(host):
    assert validate_host(host)


@pytest.mark.parametrize("host", [
    "", "-c 1000 8.8.8.8", "example.com; rm -rf /", "$(whoami).example.com", "`id`",
    "http://example.com", "exa mple.com", "localhost", "a" * 300, "example.com\n8.8.8.8",
])
def test_injection_and_junk_hosts_blocked(host):
    with pytest.raises(GuardrailError):
        validate_host(host)


@pytest.mark.parametrize("ip", ["169.254.169.254", "168.63.129.16", "127.0.0.1", "::1", "0.0.0.0", "::ffff:127.0.0.1"])
def test_metadata_and_loopback_always_blocked(ip, monkeypatch):
    monkeypatch.setenv("ALLOW_PRIVATE_TARGETS", "true")
    with pytest.raises(GuardrailError):
        check_ip(ip)


@pytest.mark.parametrize("ip", ["10.0.0.5", "192.168.1.1", "172.16.4.4", "fd12::1"])
def test_private_ranges_follow_setting(ip, monkeypatch):
    monkeypatch.setenv("ALLOW_PRIVATE_TARGETS", "false")
    with pytest.raises(GuardrailError):
        check_ip(ip)
    monkeypatch.setenv("ALLOW_PRIVATE_TARGETS", "true")
    check_ip(ip)


def test_public_ip_allowed():
    check_ip("1.1.1.1")


def test_ports():
    assert validate_port(443) == 443
    with pytest.raises(GuardrailError):
        validate_port(31337)


@pytest.mark.parametrize("url", ["file:///etc/passwd", "gopher://x.com", "https://user:pw@example.com", "https://example.com:31337/"])
def test_bad_urls_blocked(url):
    with pytest.raises(GuardrailError):
        validate_url(url)


def test_good_url_parsed():
    assert validate_url("https://example.com/health?x=1") == ("https", "example.com", 443, "/health?x=1")


def test_truncate():
    assert truncate("abc", 10) == "abc"
    assert truncate("x" * 20, 10).startswith("x" * 10 + "\n...[truncated 10")
