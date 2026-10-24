"""Provider switch: LLM_PROVIDER in .env picks the cloud or the local model. No network calls."""
import pytest

import agent


@pytest.fixture(autouse=True)
def fresh_model_cache():
    agent.get_model.cache_clear()
    yield
    agent.get_model.cache_clear()


def test_local_provider_uses_openai_compatible_url(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "local")
    monkeypatch.setenv("LOCAL_LLM_URL", "http://localhost:11434/v1")
    monkeypatch.setenv("LOCAL_LLM_MODEL", "qwen2.5:7b")
    model = agent.get_model()
    assert type(model.bound).__name__ == "ChatOpenAI"
    assert model.bound.model_name == "qwen2.5:7b"
    assert model.bound.openai_api_base == "http://localhost:11434/v1"
    assert [t["function"]["name"] for t in model.kwargs["tools"]] == [t.name for t in agent.TOOLS]


def test_azure_is_the_default(monkeypatch):
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    monkeypatch.setenv("AZURE_AI_ENDPOINT", "https://x.services.ai.azure.com/openai/v1")
    monkeypatch.setenv("AZURE_AI_API_KEY", "k")
    monkeypatch.setenv("AZURE_AI_MODEL", "gpt-4o")
    assert type(agent.get_model().bound).__module__.startswith("langchain_azure_ai")


def test_unknown_provider_is_a_clear_error(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "openia")
    with pytest.raises(ValueError, match="must be 'azure' or 'local'"):
        agent.get_model()
