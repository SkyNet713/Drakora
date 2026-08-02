"use client";

import { useState } from "react";
import ReptileProfileModal from "./ReptileProfileModal";

export default function SelectReptileButton({ slug, name, group }: { slug: string; name: string; group?: string }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <button
        aria-label={`Add ${name} to my profile`}
        onClick={() => setOpen(true)}
        style={{
          marginTop: "0.75rem",
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: saved ? "2px solid #5fbf8a" : "1px solid rgba(143,191,164,0.25)",
          background: saved ? "linear-gradient(135deg, #2f6b49, #4aa56f)" : "rgba(16,38,26,0.7)",
          color: "#e8f2ea",
          fontWeight: 600,
          fontSize: "0.85rem",
          cursor: "pointer",
          transition: "all 0.25s ease",
          boxShadow: saved ? "0 4px 16px rgba(95,191,138,0.35)" : "none",
        }}
      >
        {saved ? `✓ Added · Schedule set` : `+ Add to my profile`}
      </button>
      <ReptileProfileModal open={open} onClose={() => setOpen(false)} onSave={(data) => { setSaved(true); console.log("Profile saved:", { ...data, group: group || "", species: slug, name }); }} name={name} />
    </>
  );
}
