"use client";

export default function ReadPageAloud() {
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
        marginTop: "0.5rem",
      }}
      onClick={() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const textToRead = document.body.innerText.slice(0, 1200);
          const utterance = new SpeechSynthesisUtterance(textToRead);
          utterance.rate = 0.9;
          utterance.pitch = 0.8;
          window.speechSynthesis.speak(utterance);
        }
      }}
    >
      🔊 Read this page aloud
    </button>
  );
}
