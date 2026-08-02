"use client";
import { useState, useEffect } from "react";

export default function HealthStatus({ signs }: { signs: string[] }) {
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  useEffect(() => { const saved = localStorage.getItem("acknowledged_health"); if (saved) setAcknowledged(JSON.parse(saved)); }, []);
  const toggle = (sign: string) => {
    const next = acknowledged.includes(sign) ? acknowledged.filter(s => s !== sign) : [...acknowledged, sign];
    setAcknowledged(next);
    localStorage.setItem("acknowledged_health", JSON.stringify(next));
  };
  return (
    <div aria-label="Live health status indicators" style={{ border: "2px solid #d9785c", borderRadius: "1rem", padding: "1rem", background: "rgba(217,120,92,0.08)" }}>
      <h3 style={{ margin: "0 0 0.75rem", color: "#ffc7b8" }}>Live Health Status Indicators</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {signs.map((sign) => (
          <button key={sign} onClick={() => toggle(sign)} aria-pressed={acknowledged.includes(sign)} style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", border: "none", background: acknowledged.includes(sign) ? "#3d8f63" : "#d9785c", color: "#fff", fontSize: "0.8rem", fontWeight: 600, boxShadow: acknowledged.includes(sign) ? "0 2px 8px rgba(61,143,99,0.4)" : "0 2px 8px rgba(217,120,92,0.4)", cursor: "pointer", transition: "background 0.3s ease" }}>
            {acknowledged.includes(sign) ? "✓" : "⚠"} {sign}
          </button>
        ))}
      </div>
    </div>
  );
}
