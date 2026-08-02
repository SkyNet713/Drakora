"use client";

import { useState } from "react";

export default function InteractiveSchedule({ feeding: initialFeeding, watering: initialWatering, cleaning: initialCleaning }: { feeding: string; watering: string; cleaning: string }) {
  const [doneFeeding, setDoneFeeding] = useState(() => typeof window !== "undefined" && localStorage.getItem("schedule_feeding") === "true");
  const [doneWatering, setDoneWatering] = useState(() => typeof window !== "undefined" && localStorage.getItem("schedule_watering") === "true");
  const [doneCleaning, setDoneCleaning] = useState(() => typeof window !== "undefined" && localStorage.getItem("schedule_cleaning") === "true");

  const progress = [doneFeeding, doneWatering, doneCleaning].filter(Boolean).length;

  return (
    <div aria-label="Interactive care schedule" style={{ border: "2px solid #5fbf8a", borderRadius: "1rem", padding: "1.25rem", background: "rgba(16,38,26,0.8)" }}>
      <h3 style={{ margin: "0 0 1rem", color: "#8fbfa4" }}>Interactive Care Schedule</h3>
      <div style={{ display: "flex", gap: "0.5rem", height: "12px", borderRadius: "999px", overflow: "hidden", background: "#143222", marginBottom: "1rem" }}>
        <div style={{ width: `${(progress / 3) * 100}%`, background: "linear-gradient(90deg, #2f6b49, #4aa56f)", transition: "width 0.5s ease" }} />
      </div>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", color: "#e8f2ea" }}>
          <input type="checkbox" checked={doneFeeding} onChange={() => { const v = !doneFeeding; setDoneFeeding(v); localStorage.setItem("schedule_feeding", String(v)); }} />
          <span>Feeding: {initialFeeding}</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", color: "#e8f2ea" }}>
          <input type="checkbox" checked={doneWatering} onChange={() => { const v = !doneWatering; setDoneWatering(v); localStorage.setItem("schedule_watering", String(v)); }} />
          <span>Watering: {initialWatering}</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", color: "#e8f2ea" }}>
          <input type="checkbox" checked={doneCleaning} onChange={() => { const v = !doneCleaning; setDoneCleaning(v); localStorage.setItem("schedule_cleaning", String(v)); }} />
          <span>Cleaning: {initialCleaning}</span>
        </label>
      </div>
    </div>
  );
}
