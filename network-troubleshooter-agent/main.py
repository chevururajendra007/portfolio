"""FastAPI server with one route, POST /api/chat, that calls chat()."""
import logging
import os
import secrets
import time
from collections import defaultdict, deque
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from agent import chat
from guardrails import MAX_MESSAGE_CHARS

log = logging.getLogger("nsip")
app = FastAPI(title="Network Security Intelligence Platform (NSIP)", docs_url=None, redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")],
    allow_methods=["POST"],
    allow_headers=["Content-Type", "X-API-Key"],
)

RATE_LIMIT, RATE_WINDOW = 10, 60  # requests per client IP per minute
_hits: dict[str, deque] = defaultdict(deque)


class Turn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(max_length=8000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=MAX_MESSAGE_CHARS)
    history: list[Turn] = Field(default_factory=list, max_length=20)


def authorize(request: Request, x_api_key: str | None = Header(default=None)) -> None:
    expected = os.getenv("APP_API_KEY")
    if expected and not secrets.compare_digest(x_api_key or "", expected):
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    now, hits = time.monotonic(), _hits[request.client.host if request.client else "?"]
    while hits and now - hits[0] > RATE_WINDOW:
        hits.popleft()
    if len(hits) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many requests, slow down")
    hits.append(now)


@app.post("/api/chat", dependencies=[Depends(authorize)])
def chat_endpoint(req: ChatRequest) -> dict:
    try:
        result = chat(req.message, [t.model_dump() for t in req.history])
    except Exception:
        log.exception("agent failure")  # full detail in server logs, never in the response
        raise HTTPException(status_code=502, detail="The agent failed to answer. Try again.")
    log.info("chat tools=%s", [(s["tool"], s["status"]) for s in result["steps"]])  # audit trail
    return result
