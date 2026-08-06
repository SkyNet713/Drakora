"use client";

export default function ReadAloud() {
  return (
    <button
      style={{
        background: "#2a103e",
        color: "#e6b84a",
        border: "1px solid #e6b84a",
        borderRadius: "999px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "0.85rem",
      }}
      onClick={() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(
            document.body.innerText.slice(0, 500)
          );
          utterance.rate = 0.9;
          utterance.pitch = 0.8;
          window.speechSynthesis.speak(utterance);
        }
      }}
    >
      🔊 Read page aloud
    </button>
  );
}
