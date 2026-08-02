"use client";

import { useEffect, useState } from "react";

type Props = {
  feeding: string;
  watering: string;
  cleaning: string;
};

export default function CopyScheduleButton({ feeding, watering, cleaning }: Props) {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(id);
  }, [toast]);

  const scheduleText = `Feeding: ${feeding}\nWatering: ${watering}\nCleaning: ${cleaning}`;

  async function copySchedule() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(scheduleText);
      setToast("Schedule copied");
      return;
    }

    setToast(`Clipboard unavailable. Copy manually: ${feeding} | ${watering} | ${cleaning}`);
  }

  return (
    <>
      <button
        type="button"
        className="btn secondary small"
        onClick={() => {
          void copySchedule();
        }}
      >
        Copy schedule
      </button>
      {toast ? (
        <span role="status" aria-live="polite" className="form-success">
          {toast}
        </span>
      ) : null}
    </>
  );
}
