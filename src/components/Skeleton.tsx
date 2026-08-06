"use client";

export default function Skeleton() {
  return (
    <div
      style={{
        background: "#2a103e",
        border: "2px solid #e6b84a",
        borderRadius: "0.6rem",
        padding: "1rem",
        minHeight: "140px",
        animation: "shimmer 1.5s infinite ease-in-out",
        opacity: 0.85,
      }}
    >
      <div style={{ width: "60%", height: "1.1rem", background: "#e6b84a", borderRadius: "0.3rem", marginBottom: "0.75rem", opacity: 0.35 }} />
      <div style={{ width: "40%", height: "0.8rem", background: "#e6b84a", borderRadius: "0.3rem", opacity: 0.2 }} />
    </div>
  );
}
