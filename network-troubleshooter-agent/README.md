# Network Troubleshooter Agent

An AI agent that diagnoses network problems layer by layer (DNS → ping → TCP → TLS → HTTP)
using real, read-only network tools, with an Azure AI Foundry model as the brain.

**Model (LLM) + Harness (prompt, tools, guardrails, loop) = Agent**

| File | What it is |
|---|---|
| `.env` | Azure AI Foundry endpoint, API key, model deployment name, security settings. Copy from `.env.example`. **Never commit it.** |
| `agent.py` | The tools (`dns_lookup`, `ping_host`, `traceroute`, `check_tcp_port`, `tls_certificate`, `http_check`), the model, and the agent loop (`chat`). |
| `guardrails.py` | Input validation and target policy (SSRF / injection protection) for every tool call. |
| `main.py` | FastAPI server with one route, `POST /api/chat`, that calls `chat()`. API key, rate limit, schema limits. |
| `frontend/src/App.jsx` | React chat box. Sends the message and history, shows the answer and tool steps. |
| `requirements.txt` | langchain-azure-ai, fastapi, uvicorn, httpx, python-dotenv |
| `evals/` | Evaluation suite: guardrails, agent loop, API boundary, live golden cases. |
| `AGENTS.md` | Standing context for coding agents working on this code. |
| `Dockerfile` | Sandbox: non-root container with only the tools the agent needs. |

## Run it

```bash
cd network-troubleshooter-agent
cp .env.example .env            # fill in your Azure AI Foundry values + APP_API_KEY
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8000

# second terminal
cd frontend && npm install && npm run dev   # http://localhost:5173
```

## How the agent loop works

```
user message → chat() → model
   → tool calls → guardrails (validate, resolve, policy-check) → run tool
   → result wrapped in <tool_output> (untrusted data) → back to model
→ final "Diagnosis / Evidence / Next steps", or loop again (max 8 steps, 12 tool calls)
```

## Security

| Threat | Mitigation |
|---|---|
| **Prompt injection** from a user or a network response | System prompt treats `<tool_output>` as data. Tools return summaries, never page bodies. Client history can hold only `user`/`assistant` text, so it cannot fake system or tool messages. |
| **Command injection** (`8.8.8.8; rm -rf /`) | Strict hostname/IP validation. Fixed binaries, argument lists, no shell. |
| **SSRF** into your network or cloud metadata | Targets are resolved and checked. Cloud metadata IPs (`169.254.169.254`, Azure `168.63.129.16`), loopback and link-local are always blocked. Private ranges are blocked unless `ALLOW_PRIVATE_TARGETS=true`. |
| **DNS rebinding** | Tools connect to the IP that passed the check, not the name. HTTP keeps the real hostname only for SNI and certificate checks. Env proxies are ignored. |
| **Port scanning / abuse** | Allowlisted ports only. `APP_API_KEY` auth. Rate limit of 10 requests/min per IP. |
| **Runaway loops / token bills** | `MAX_STEPS=8`, `MAX_TOOL_CALLS=12`, history capped at 20 turns, tool output truncated. |
| **Secret leakage** | `.env` is gitignored. The API key is added by the dev proxy on the server, never shipped in the JS bundle. Errors are logged on the server, and clients get a generic message. |
| **XSS** | The UI renders plain text only. |
| **Blast radius** | The Docker image runs as non-root, `--read-only`, `--cap-drop ALL --cap-add NET_RAW`. |

In production, put the API behind HTTPS and a reverse proxy that adds the API key or
real user authentication (for example Entra ID). Use Azure Key Vault or managed
identity instead of a key in `.env`.

## Evaluation engineering

```bash
pip install -r requirements-dev.txt
pytest evals                     # offline, deterministic: runs in under 1s, no Azure cost
python evals/run_live_evals.py   # golden cases against the real model (uses tokens)
```

Each layer is scored separately, not just the final answer:

1. **Guardrails** (`test_guardrails.py`): known-answer tests, the "2 + 2 = 4" style. Injection strings, metadata IPs, bad ports and bad URLs must be refused.
2. **Agent loop** (`test_agent_loop.py`): a scripted fake model checks tool dispatch, blocking inside the loop, unknown tools, step and tool budgets, and history-role filtering.
3. **API boundary** (`test_api.py`): auth, rate limit, schema limits, and that errors don't leak details.
4. **Live golden cases** (`golden_cases.json`): with the real model, checks that the right tools were chosen, that the policy fired, and that the answer contains the expected text.
