import { useState } from "react";

// React chat box. Sends the message and history, shows the answer and the tool steps.
// All text is rendered as plain text (no dangerouslySetInnerHTML), so model or
// network output can never inject HTML/JS into the page.
export default function App() {
  const [history, setHistory] = useState([]);
  const [steps, setSteps] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(e) {
    e.preventDefault();
    const message = input.trim();
    if (!message || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        // No API key here: anything in the bundle is public. The proxy adds it server-side.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Request rejected");
      setHistory([...history, { role: "user", content: message }, { role: "assistant", content: data.answer }]);
      setSteps(data.steps);
      setInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "2rem auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" }}>
      <h1>TunnelSight AI</h1>
      <p style={{ marginTop: "-0.5rem" }}>AI network troubleshooter: DNS, reachability, ports, TLS and HTTP.</p>
      <p style={{ color: "#666" }}>Try: "Why can't I reach example.com over HTTPS?"</p>
      {history.map((t, i) => (
        <div key={i} style={{ whiteSpace: "pre-wrap", margin: "0.75rem 0", padding: "0.75rem", borderRadius: 8,
          background: t.role === "user" ? "#eef4ff" : "#f5f5f5" }}>
          <strong>{t.role === "user" ? "You" : "Agent"}:</strong> {t.content}
        </div>
      ))}
      {steps.length > 0 && (
        <details>
          <summary>Tool calls in last answer ({steps.length})</summary>
          <ol>
            {steps.map((s, i) => (
              <li key={i}><code>{s.tool}({JSON.stringify(s.args)})</code> [{s.status}]<pre>{s.output}</pre></li>
            ))}
          </ol>
        </details>
      )}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <form onSubmit={send} style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} disabled={busy}
          placeholder="Describe the network problem..." style={{ flex: 1, padding: 8 }} />
        <button disabled={busy}>{busy ? "Checking..." : "Send"}</button>
      </form>
    </main>
  );
}
