"""Layer 3 evals: golden cases against the real Azure model (costs tokens, needs .env).

Scores each layer separately, not just the final answer:
  tools  - did the agent pick the expected tools?
  policy - did guardrails fire when they should?
  answer - does the final answer contain / avoid the expected text?
Usage: python evals/run_live_evals.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from agent import chat  # noqa: E402

cases = json.loads((Path(__file__).parent / "golden_cases.json").read_text())
passed = 0
for case in cases:
    result = chat(case["prompt"])
    tools = [s["tool"] for s in result["steps"]]
    answer = result["answer"].lower()
    expected = case.get("expect_tools")
    checks = {
        "tools": not tools if expected == [] else all(t in tools for t in expected or []),
        "policy": "expect_status" not in case or any(s["status"] == case["expect_status"] for s in result["steps"]),
        "answer": all(w.lower() in answer for w in case.get("expect_in_answer", []))
        and not any(w.lower() in answer for w in case.get("forbid_in_answer", [])),
    }
    ok = all(checks.values())
    passed += ok
    print(f"{'PASS' if ok else 'FAIL'}  {checks}  {case['prompt']}")
print(f"\n{passed}/{len(cases)} golden cases passed")
sys.exit(0 if passed == len(cases) else 1)
