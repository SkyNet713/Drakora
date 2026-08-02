"use client";
import { useState } from "react";
import { upsertPersonalReptile } from "@/lib/storage";

export default function ReptileProfileModal({ open, onClose, onSave, name }: { open: boolean; onClose: () => void; onSave: (data: { name: string; age: string; weight: string }) => void; name: string }) {
  const [reptileName, setReptileName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [saved, setSaved] = useState(false);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(5,15,10,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <div style={{ background: "#0a1c12", border: "2px solid #5fbf8a", borderRadius: "1.25rem", padding: "2rem", maxWidth: "420px", width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 1.25rem", color: "#b7dcc6", fontFamily: "var(--font-display)" }}>Add {name}</h3>
        <label style={{ display: "block", marginBottom: "0.75rem", color: "#e8f2ea", fontSize: "0.9rem" }}>
          Pet Name
          <input value={reptileName} onChange={(e) => setReptileName(e.target.value)} placeholder="Enter name" style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #3d8f63", background: "#06140d", color: "#fff", marginTop: "0.25rem" }} />
        </label>
        <label style={{ display: "block", marginBottom: "0.75rem", color: "#e8f2ea", fontSize: "0.9rem" }}>
          Age
          <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 2 years" style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #3d8f63", background: "#06140d", color: "#fff", marginTop: "0.25rem" }} />
        </label>
        <label style={{ display: "block", marginBottom: "1.25rem", color: "#e8f2ea", fontSize: "0.9rem" }}>
          Weight
          <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 450g" style={{ width: "100%", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #3d8f63", background: "#06140d", color: "#fff", marginTop: "0.25rem" }} />
        </label>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          {saved && <span style={{ color: "#8fbfa4", fontSize: "0.85rem", animation: "fadeIn 0.3s ease" }}>✓ Saved</span>}
          <button onClick={onClose} style={{ padding: "0.6rem 1rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#e8f2ea", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { const profile = { name: reptileName || name, age, weight: weight, notes: "Added from species card", feedingSchedule: "", wateringSchedule: "", cleaningSchedule: "", substrateSchedule: "", speciesSlug: name.toLowerCase().replace(/\s+/g, "-"), lastFed: "", lastWatered: "" }; upsertPersonalReptile(profile); onSave({ name: profile.name, age: profile.age, weight: profile.weight }); setSaved(true); setTimeout(() => { setSaved(false); onClose(); }, 700); }} style={{ padding: "0.6rem 1.25rem", borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #2f6b49, #4aa56f)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}
