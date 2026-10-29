# TunnelSight AI sandbox: one agent per container, non-root, only the network tools it needs.
FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends iputils-ping traceroute \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 agent
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY agent.py guardrails.py main.py ./
USER agent
EXPOSE 8000
# Build with: docker build -t tunnelsight-ai .
# Run with:   docker run --env-file .env --read-only --cap-drop ALL --cap-add NET_RAW -p 8000:8000 tunnelsight-ai
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
