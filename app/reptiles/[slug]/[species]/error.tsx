"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#e8f2ea" }}>
      <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>Something went wrong</h2>
      <p style={{ color: "#8fbfa4", marginBottom: "1.5rem" }}>{error.message || "Please try reloading."}</p>
      <button onClick={() => reset()} style={{ padding: "0.75rem 1.5rem", borderRadius: "999px", background: "#2f6b49", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
        Try again
      </button>
    </div>
  );
}
