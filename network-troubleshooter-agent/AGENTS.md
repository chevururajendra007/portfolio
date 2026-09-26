# AGENTS.md — standing context for coding agents working on this folder

## What this is
A network troubleshooting agent: Azure AI Foundry model + a harness of read-only
network tools, a guarded agent loop, a FastAPI route and a React chat box.

## Map
- `agent.py` — tools, model, `chat()` loop. System prompt lives here.
- `guardrails.py` — ALL validation/policy for tool arguments. Tools must call it.
- `main.py` — `POST /api/chat`: API key, rate limit, schema limits.
- `frontend/src/App.jsx` — chat UI. Render text only; never `dangerouslySetInnerHTML`.
- `evals/` — `pytest evals` (offline, must stay green); `run_live_evals.py` (costs tokens).

## Rules for changing the agent
1. New tool = read-only diagnostic only. Resolve targets with `resolve_target()` and
   connect to the returned IP. No `shell=True`, no user-controlled binary names or flags.
2. Never loosen `ALWAYS_BLOCKED`, loopback or link-local blocking.
3. Keep `MAX_STEPS` / `MAX_TOOL_CALLS` limits; they cap cost and runaway loops.
4. Every change to tools, prompt or guardrails ships with an eval in `evals/`.
5. `.env` is never committed. Only `.env.example`.
