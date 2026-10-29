# TunnelSight AI — Network Troubleshooter Agent

An AI agent that diagnoses network problems layer by layer (DNS → ping → TCP → TLS → HTTP)
using real, read-only network tools. The brain is either a cloud model (Azure AI Foundry) or a
local model on your own machine (Ollama, LM Studio, vLLM and others). You choose with one line in `.env`.

**Model (LLM) + Harness (prompt, tools, guardrails, loop) = Agent**

| File | What it is |
|---|---|
| `.env` | Which LLM to use (`LLM_PROVIDER`), its URL, key and model name, and the security settings. Copy from `.env.example`. **Never commit it.** |
| `agent.py` | The tools (`dns_lookup`, `ping_host`, `traceroute`, `check_tcp_port`, `tls_certificate`, `http_check`), the model (cloud or local), and the agent loop (`chat`). |
| `guardrails.py` | Input validation and target policy (SSRF / injection protection) for every tool call. |
| `main.py` | FastAPI server with one route, `POST /api/chat`, that calls `chat()`. API key, rate limit, schema limits. |
| `frontend/src/App.jsx` | React chat box. Sends the message and history, shows the answer and tool steps. |
| `requirements.txt` | langchain-azure-ai, langchain-openai, fastapi, uvicorn, httpx, python-dotenv |
| `evals/` | Evaluation suite: guardrails, agent loop, API boundary, live golden cases. |
| `AGENTS.md` | Standing context for coding agents working on this code. |
| `Dockerfile` | Sandbox: non-root container with only the tools the agent needs. |

## Run it

```bash
cd network-troubleshooter-agent
cp .env.example .env            # choose LLM_PROVIDER, fill in its values + APP_API_KEY
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8000

# second terminal
cd frontend && npm install && npm run dev   # http://localhost:5173
```

## Choosing the LLM: cloud or local

Set `LLM_PROVIDER` in `.env`, then restart the server. No code changes are needed.

| | `LLM_PROVIDER=azure` (default) | `LLM_PROVIDER=local` |
|---|---|---|
| Where the model runs | Microsoft's cloud | Your own machine or server |
| Internet needed | Yes | No, after the one-time model download |
| Cost | Billed per token | No token bill (you pay for the hardware and power) |
| Settings used | `AZURE_AI_ENDPOINT`, `AZURE_AI_API_KEY`, `AZURE_AI_MODEL` | `LOCAL_LLM_URL`, `LOCAL_LLM_MODEL`, optional `LOCAL_LLM_API_KEY` |

`local` works with any runtime that offers the OpenAI-compatible API:

| Runtime | `LOCAL_LLM_URL` |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio (start its local server) | `http://localhost:1234/v1` |
| vLLM | `http://localhost:8000/v1` (run this app on another port, e.g. `--port 8001`) |
| llama.cpp server, Foundry Local | the URL it prints at startup, ending in `/v1` |

Example with Ollama:

```bash
# 1. Install Ollama from ollama.com, then download a model that supports tool calling
ollama pull qwen2.5:7b
# 2. In .env
LLM_PROVIDER=local
LOCAL_LLM_URL=http://localhost:11434/v1
LOCAL_LLM_MODEL=qwen2.5:7b
# 3. Restart the server
uvicorn main:app --port 8000
```

Notes:
- The model **must support tool calling**, or the agent cannot run checks. Good choices are
  `qwen2.5` / `qwen3` (7B or larger), `llama3.1:8b` and `mistral-nemo`. Very small models (under 3B)
  often pick the wrong tool.
- A 7B model needs about 8 GB of RAM or GPU memory. It runs on CPU too, but slowly, so allow up to 3 minutes per answer.
- For a fully offline server, download the runtime and the model on a machine with internet access, then copy them over.
  With Ollama, the models are in `~/.ollama/models`.
- Requests to the local runtime ignore proxy settings, so prompts never leave the machine through a proxy.
- Run `python evals/run_live_evals.py` after switching models to check that the new model still picks the right tools.

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
