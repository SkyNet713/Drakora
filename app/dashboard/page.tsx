"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { reptiles, getReptile } from "@/data/reptiles";
import { healthInfoLookup } from "@/data/healthInfo";
import {
  deletePersonalReptile,
  getCurrentUser,
  type PersonalReptile,
  updateProfile,
  upsertPersonalReptile,
  type UserProfile,
} from "@/lib/storage";

const emptyForm = {
  id: "",
  name: "",
  speciesSlug: "bearded-dragons",
  notes: "",
  age: "",
  weight: "",
  lastFed: "",
  lastWatered: "",
  feedingSchedule: "",
  wateringSchedule: "",
  cleaningSchedule: "",
  substrateSchedule: "",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [profileName, setProfileName] = useState("");
  const [message, setMessage] = useState("");

  function refresh() {
    const current = getCurrentUser();
    setUser(current);
    setProfileName(current?.displayName ?? "");
  }

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      router.replace("/login");
      return;
    }
    setUser(current);
    setProfileName(current.displayName);
    setReady(true);

    // Check for guide-linked schedule pre-fill
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const addSlug = params.get("add");
      if (addSlug) {
        const guide = getReptile(addSlug);
        setForm({
          ...emptyForm,
          speciesSlug: addSlug,
          name: guide?.name ? guide.name + " (new)" : "",
          feedingSchedule: params.get("feeding") || guide?.scheduleDefaults.feeding || "",
          wateringSchedule: params.get("watering") || guide?.scheduleDefaults.watering || "",
          cleaningSchedule: params.get("cleaning") || guide?.scheduleDefaults.cleaning || "",
        });
        setModalOpen(true);
        // Clean URL without navigating
        window.history.replaceState({}, "", "/dashboard");
      }
    }

    // Load saved reptiles from Firebase
    (async () => {
      try {
        const { db } = await import("@/lib/firebase");
        const { collection, getDocs, query, where } = await import("firebase/firestore");
        const snap = await getDocs(query(collection(db, "reptiles"), where("userEmail", "==", current.email)));
        const saved = snap.docs.map((d) => ({ id: d.id, ...d.data() } as any));
        if (saved.length > 0) {
          current.reptiles = saved;
          setUser({ ...current, reptiles: saved });
        }
      } catch (e) {
        console.error("Failed to load from Firebase:", e);
      }
    })();
  }, [router]);

  const selectedGuide = useMemo(
    () => getReptile(form.speciesSlug),
    [form.speciesSlug]
  );

  function openCreate() {
    const guide = getReptile("bearded-dragons");
    setForm({
      ...emptyForm,
      feedingSchedule: guide?.scheduleDefaults.feeding ?? "",
      wateringSchedule: guide?.scheduleDefaults.watering ?? "",
    });
    setModalOpen(true);
  }

  function openEdit(pet: PersonalReptile) {
    setForm({
      id: pet.id,
      name: pet.name,
      speciesSlug: pet.speciesSlug,
      notes: pet.notes,
      age: pet.age,
      weight: (pet as any).weight || "",
      lastFed: pet.lastFed,
      lastWatered: pet.lastWatered,
      feedingSchedule: pet.feedingSchedule,
      wateringSchedule: pet.wateringSchedule,
      cleaningSchedule: (pet as any).cleaningSchedule || "",
      substrateSchedule: (pet as any).substrateSchedule || "",
    });
    setModalOpen(true);
  }

  function onSpeciesChange(slug: string) {
    const guide = getReptile(slug);
    setForm((prev) => ({
      ...prev,
      speciesSlug: slug,
      feedingSchedule: prev.feedingSchedule || guide?.scheduleDefaults.feeding || "",
      wateringSchedule:
        prev.wateringSchedule || guide?.scheduleDefaults.watering || "",
    }));
  }

  function onSavePet(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    upsertPersonalReptile({
      id: form.id || undefined,
      name: form.name.trim(),
      speciesSlug: form.speciesSlug,
      notes: form.notes,
      age: form.age,
      weight: form.weight,
      lastFed: form.lastFed,
      lastWatered: form.lastWatered,
      feedingSchedule: form.feedingSchedule,
      wateringSchedule: form.wateringSchedule,
      cleaningSchedule: form.cleaningSchedule,
      substrateSchedule: form.substrateSchedule,
    });
    setModalOpen(false);
    setMessage("Reptile profile saved.");
    refresh();
  }

  function onDelete(id: string) {
    if (!window.confirm("Remove this reptile from your list?")) return;
    deletePersonalReptile(id);
    setMessage("Reptile removed.");
    refresh();
  }

  function markDone(pet: PersonalReptile, field: "lastFed" | "lastWatered") {
    upsertPersonalReptile({
      ...pet,
      [field]: new Date().toISOString().slice(0, 10),
    });
    refresh();
  }

  function onSaveProfile(e: FormEvent) {
    e.preventDefault();
    updateProfile(profileName.trim() || user?.displayName || "Keeper");
    setMessage("Profile updated.");
    refresh();
  }

  if (!ready || !user) {
    return (
      <section className="section">
        <p className="page-intro">Loading your haven…</p>
      </section>
    );
  }

  if (!ready || !user) {
    return (
      <section className="section">
        <p className="page-intro">Loading your haven…</p>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Keeper dashboard</p>
          <h1>My reptiles</h1>
          <p className="page-intro">
            Update profiles, log care days, and keep feeding/watering schedules
            beside species-specific health-risk signs.
          </p>
        </div>
        <button type="button" className="btn primary" onClick={openCreate}>
          Add reptile
        </button>
      </div>

      {message ? <p className="form-success">{message}</p> : null}

      <article className="care-panel" style={{ marginBottom: "1.25rem" }}>
        <h2>User information</h2>
        <form className="form" onSubmit={onSaveProfile}>
          <label>
            Display name
            <input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input value={user.email} disabled />
          </label>
          <button type="submit" className="btn secondary small">
            Save profile
          </button>
        </form>
      </article>

      {user.reptiles.length === 0 ? (
        <div className="empty-state">
          <p>No personal reptiles yet. Add one to build a care schedule.</p>
          <button type="button" className="btn primary" onClick={openCreate}>
            Add your first reptile
          </button>
        </div>
      ) : (
        <div className="pet-grid">
          {user.reptiles.map((pet) => {
            const guide = getReptile(pet.speciesSlug);
            return (
              <article key={pet.id} className="pet-panel">
                <div>
                  <h3>{pet.name}</h3>
                  <p className="pet-meta">
                    {guide?.name ?? pet.speciesSlug}
                    {pet.age ? ` · ${pet.age}` : ""}
                  </p>
                </div>

                <div className="schedule-box" style={{ marginTop: "0.75rem" }}>
                  <strong>Quick actions:</strong>{" "}
                  {guide ? (
                    <Link href={`/reptiles/${guide.slug}`} style={{ marginRight: "0.75rem" }}>View guide</Link>
                  ) : null}
                  <Link href="#" onClick={(e) => { e.preventDefault(); alert("Interactive schedule and health badges coming next — demo the profile save/edit and health signs above."); }}>
                    Track health & schedule
                  </Link>
                </div>

                <div className="schedule-box">
                  <div>
                    <strong>Feeding schedule:</strong> {pet.feedingSchedule || "—"}
                  </div>
                  <div>
                    <strong>Watering schedule:</strong>{" "}
                    {pet.wateringSchedule || "—"}
                  </div>
                  <div>
                    <strong>Last fed:</strong> {pet.lastFed || "Not logged"}
                  </div>
                  <div>
                    <strong>Last watered:</strong> {pet.lastWatered || "Not logged"}
                  </div>
                </div>

                {pet.notes ? (
                  <p className="pet-meta">Notes: {pet.notes}</p>
                ) : null}

                {guide ? (
                  <div className="schedule-box">
                    <strong>Health-risk signs for {guide.name} (free feature — click to expand):</strong>
                    <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                      {guide.healthRiskSigns.slice(0, 4).map((sign) => {
                        const key = `ack_health_${pet.id}_${sign}`;
                        const info = healthInfoLookup[sign];
                        const isChecked = typeof window !== "undefined" ? localStorage.getItem(key) === "1" : false;
                        return (
                          <li key={sign} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", flex: 1 }}>
                              <input
                                type="checkbox"
                                defaultChecked={isChecked}
                                onChange={(e) => {
                                  if (typeof window !== "undefined") {
                                    localStorage.setItem(key, e.target.checked ? "1" : "0");
                                  }
                                }}
                                style={{ accentColor: "#3d8f63", marginTop: "0.2rem", flexShrink: 0 }}
                              />
                              <div style={{ flex: 1 }}>
                                <span style={{ textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.7 : 1, fontWeight: 600 }}>{sign}</span>
                                {info ? (
                                  <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "var(--fern)", lineHeight: 1.4 }}>
                                    <img src={info.image} alt={sign} loading="lazy" width={200} height={100} style={{ width: "100%", maxHeight: "100px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.35rem", border: "1px solid var(--line)" }} />
                                    <p style={{ margin: "0 0 0.25rem", fontWeight: 600, color: info.severe ? "#ffb4a2" : "#b7dcc6" }}>
                                      {info.severe ? "⚠️ Severe — vet visit strongly recommended" : "⚡ Monitor closely — see vet if worsens"}
                                    </p>
                                    <p style={{ margin: 0 }}><strong>Cure / Action:</strong> {info.cure}</p>
                                    <p style={{ margin: 0 }}><strong>Prevention:</strong> {info.prevent}</p>
                                    <p style={{ margin: "0.25rem 0 0", color: info.severe ? "#ffc7b8" : "#8fbfa4" }}><strong>Vet recommendation:</strong> {info.vet}</p>
                                  </div>
                                ) : (
                                  <div style={{ marginTop: "0.15rem", fontSize: "0.8rem", color: "var(--mist)" }}>No detailed info available yet.</div>
                                )}
                              </div>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                    <Link href={`/reptiles/${guide.slug}`} style={{ marginTop: "0.75rem", display: "inline-block" }}>Open full guide →</Link>
                  </div>
                ) : null}

                {/* Custom reminder calendar — premium feature */}
                <div className="schedule-box" style={{ marginTop: "0.5rem", background: "rgba(217,120,92,0.08)", border: "1px dashed rgba(217,120,92,0.3)" }}>
                  <strong style={{ color: "#ffc7b8" }}>Premium reminder calendar ({pet.name})</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--fern)", margin: "0.25rem 0" }}>
                    Age: {pet.age || "Not set"} · Weight: {(pet as any).weight || "Not set"}
                  </p>
                  <ul style={{ fontSize: "0.85rem", paddingLeft: "1rem", margin: 0 }}>
                    <li>Feeding reminder: {(pet as any).feedingSchedule ? `Custom (${(pet as any).feedingSchedule.slice(0,30)}...)` : "Based on guide defaults"}</li>
                    <li>Watering reminder: {(pet as any).wateringSchedule ? `Custom` : "Based on guide defaults"}</li>
                    <li>Cleaning reminder: {(pet as any).cleaningSchedule ? `Custom` : "Based on guide defaults"}</li>
                    <li>Substrate reminder: {(pet as any).substrateSchedule ? `Custom` : "Based on guide defaults"}</li>
                    <li>Misting needed: {guide?.slug?.includes("crested") || guide?.slug?.includes("day") ? "Yes — maintain 60–80% humidity" : "As needed for species"}</li>
                  </ul>
                  <p style={{ fontSize: "0.75rem", color: "#ffc7b8", marginTop: "0.25rem" }}>
                    Custom notifications included with $2.99/mo premium reminders.
                  </p>
                </div>

                <div className="pet-actions">
                  <button
                    type="button"
                    className="btn secondary small"
                    onClick={() => markDone(pet, "lastFed")}
                  >
                    Log feeding
                  </button>
                  <button
                    type="button"
                    className="btn secondary small"
                    onClick={() => markDone(pet, "lastWatered")}
                  >
                    Log watering
                  </button>
                  <button
                    type="button"
                    className="btn secondary small"
                    onClick={() => openEdit(pet)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn danger small"
                    onClick={() => onDelete(pet.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Premium reminders + services */}
      <article className="care-panel" style={{ marginTop: "1.25rem" }}>
        <h2>Premium reminders & services</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.25rem" }}>Mobile reminder notifications — FREE for testing</h3>
            <p style={{ color: "var(--fern)", margin: "0 0 0.5rem", fontSize: "0.92rem" }}>
              Get notified for feeding, watering, cleaning, and substrate changes per reptile. Works on any mobile browser.
            </p>
            <button type="button" className="btn primary small" onClick={() => alert("Reminder subscription coming soon — integration in progress.")}>Subscribe to reminders</button>
            <button type="button" className="btn secondary small" onClick={async () => {
              if ('serviceWorker' in navigator) {
                try {
                  const reg = await navigator.serviceWorker.register('/sw.js');
                  const perm = await Notification.requestPermission();
                  if (perm === 'granted') {
                    alert('Push notifications enabled — FREE for testing/development. Reminders will appear on mobile browsers.');
                    if (typeof window !== 'undefined') localStorage.setItem('push_subscribed', '1');
                  } else {
                    alert('Notification permission denied.');
                  }
                } catch (e) {
                  alert('Push setup failed: ' + (e instanceof Error ? e.message : String(e)));
                }
              } else {
                alert('Service workers not supported on this browser.');
              }
            }}>Enable mobile push reminders</button>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.25rem" }}>Consulting & digital guides — FREE for testing</h3>
            <p style={{ color: "var(--fern)", margin: "0 0 0.5rem", fontSize: "0.92rem" }}>
              One-on-one husbandry reviews, custom care plans, and downloadable setup checklists.
            </p>
            <a href="#" className="btn secondary small" onClick={(e) => { e.preventDefault(); alert("Consulting booking coming soon."); }}>Book consulting</a>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.25rem" }}>Support the site — guides stay free</h3>
            <p style={{ color: "var(--fern)", margin: "0 0 0.5rem", fontSize: "0.92rem" }}>
              Patreon supporters get premium reminders, early guides, and profile badges.
            </p>
            <a href="#" className="btn primary small" onClick={(e) => { e.preventDefault(); alert("Support page coming soon."); }}>Become a supporter</a>
          </div>
        </div>
      </article>

      {modalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>{form.id ? "Update reptile" : "Add reptile"}</h2>
            <form className="form" onSubmit={onSavePet}>
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Spike"
                  required
                />
              </label>
              <label>
                Species
                <select
                  value={form.speciesSlug}
                  onChange={(e) => onSpeciesChange(e.target.value)}
                >
                  {reptiles.map((r) => (
                    r.species ? r.species.map((s: any) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    )) : (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                      </option>
                    )
                  )).flat()}
                </select>
              </label>
              <label>
                Weight (g / kg)
                <input
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="e.g. 320g or 1.2kg"
                />
              </label>
              <label>
                Age / life stage
                <input
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Juvenile · 8 months"
                />
              </label>
              <label>
                Feeding schedule
                <textarea
                  value={form.feedingSchedule}
                  onChange={(e) =>
                    setForm({ ...form, feedingSchedule: e.target.value })
                  }
                />
              </label>
              <label>
                Watering schedule
                <textarea
                  value={form.wateringSchedule}
                  onChange={(e) =>
                    setForm({ ...form, wateringSchedule: e.target.value })
                  }
                />
              </label>
              <label>
                Last fed
                <input
                  type="date"
                  value={form.lastFed}
                  onChange={(e) => setForm({ ...form, lastFed: e.target.value })}
                />
              </label>
              <label>
                Last watered
                <input
                  type="date"
                  value={form.lastWatered}
                  onChange={(e) =>
                    setForm({ ...form, lastWatered: e.target.value })
                  }
                />
              </label>
              <label>
                Substrate / cleaning schedule
                <textarea
                  value={form.cleaningSchedule}
                  onChange={(e) => setForm({ ...form, cleaningSchedule: e.target.value })}
                  placeholder="Spot clean daily; full refresh every 2–3 weeks"
                />
              </label>
              <label>
                Substrate change schedule
                <textarea
                  value={form.substrateSchedule}
                  onChange={(e) => setForm({ ...form, substrateSchedule: e.target.value })}
                  placeholder="Full substrate replacement every 4–6 weeks"
                />
              </label>
              <label>
                Notes
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Shedding, vet visits, preferences…"
                />
              </label>
              {selectedGuide ? (
                <p className="form-success">
                  Defaults available from the {selectedGuide.name} guide.
                </p>
              ) : null}
              <div className="pet-actions">
                <button type="submit" className="btn primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
