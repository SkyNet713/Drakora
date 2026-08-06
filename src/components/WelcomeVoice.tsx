"use client";

import { useEffect } from "react";

export default function WelcomeVoice() {
  useEffect(() => {
    const audio = new Audio("/voice-drakora.mp3");
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }, []);

  return null;
}
