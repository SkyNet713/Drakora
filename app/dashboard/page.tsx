"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { reptiles, getReptile } from "@/data/reptiles";
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

  // Health risk info lookup for all reptiles (free feature)
  const healthInfoLookup: Record<string, { cure: string; prevent: string; vet: string; image: string; severe: boolean }> = {
    "Wrinkled skin or sunken eyes": { cure: "Start with an electrolyte soak (reptile-safe electrolyte solution or diluted Pedialyte) for 15–20 minutes in shallow warm water. Then increase misting frequency and offer fresh clean water immediately. Monitor for improvement over 24–48 hours.", prevent: "Maintain humidity within species target daily; provide fresh water in a shallow dish that is cleaned and refilled daily; mist according to schedule (night peaks for many species).", vet: "Severe dehydration — if sunken eyes and tacky saliva persist beyond 24 hours or if the reptile is unresponsive, seek emergency vet fluids and assessment immediately.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=60", severe: true },
    "Persistent stuck shed": { cure: "Soak in warm shallow water; gently remove with damp cotton swab.", prevent: "Keep humid hide at 70%+; mist regularly.", vet: "Retained shed around toes/eyes needs vet removal.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: false },
    "Rapid weight loss or weak grip": { cure: "Offer high-calorie insects (black soldier fly larvae, silkworms, roaches) in a calm, warm environment. Check temperature gradient and humidity immediately. Weigh weekly. If tremors are present, provide calcium + D3 and seek vet assessment.", prevent: "Monitor weight weekly with a digital scale; maintain proper UVB (replace bulbs on schedule) and calcium dusting; provide adequate vertical space and safe branches.", vet: "Rapid loss with tremors = emergency vet visit for possible MBD or parasitic infection. Do not delay.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=60", severe: true },
    "Jaw softness or tremors": { cure: "Increase calcium + D3; provide UVB; vet assessment.", prevent: "Dust all feeders; use quality UVB bulb; replace on schedule.", vet: "Severe — requires immediate vet care for MBD.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Weight drop and reduced tongue-feeding": { cure: "Offer favorite foods; check temperature; reduce stress.", prevent: "Stable environment; minimize handling; variety in diet.", vet: "Prolonged refusal (>5 days) requires vet exam.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: false },
    "Weak grip or frequent slips": { cure: "Check calcium/UVB; add more climbing branches; reduce stress.", prevent: "Proper supplementation; adequate vertical space; safe branches.", vet: "Persistent weakness may indicate MBD — see vet.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=60", severe: false },
    "Sunken eyes and tacky saliva": { cure: "Provide fresh water; mist; offer electrolyte soak if needed.", prevent: "Daily fresh water; maintain humidity peaks.", vet: "Severe dehydration requires vet fluids.", image: "https://images.unsplash.com/photo-1500375592092-040eb43e8fc5?w=200&q=60", severe: true },
    "Stuck shed on toe pads": { cure: "Warm soak; gently rub with damp swab; apply coconut oil lightly.", prevent: "Humid hide; regular misting; monitor toe pads.", vet: "Retained shed causing circulation issues needs vet.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=60", severe: false },
    "Tail thinning or prolonged refusal to eat": { cure: "Offer smaller frequent meals; check temperature gradient; reduce stress.", prevent: "Consistent feeding schedule; proper environment.", vet: "Tail thinning with refusal = vet exam needed.", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=60", severe: true },
    "Straining stool or bloating": { cure: "Warm soak; gentle abdominal massage; check substrate ingestion.", prevent: "Safe substrate; proper prey size; hydration.", vet: "Severe bloating/straining requires immediate vet care.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: true },
    "Retained shed around toes": { cure: "Soak 15 min; gently peel with damp cotton swab; apply oil.", prevent: "Humid hide maintained daily; monitor toes weekly.", vet: "Multiple toes affected — vet removal recommended.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: false },
    "Tremors or bowed limbs": { cure: "Provide immediate calcium + D3 supplementation and correct UVB bulb. Place the reptile in a safe, low-stress enclosure with easy access to food and water. Do not attempt force-feeding.", prevent: "Quality UVB bulb replaced on manufacturer schedule; regular dusting of feeders; monitor growth and posture weekly.", vet: "Severe MBD — emergency vet visit required for fluids, radiographs, and treatment plan. Time-sensitive.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Skin abrasions or peeling": { cure: "Clean gently with diluted chlorhexidine or reptile-safe antiseptic. Apply a thin layer of safe topical if recommended by a vet. Improve humidity and remove rough surfaces. Monitor wound daily for infection signs (redness, swelling, discharge).", prevent: "Smooth branches; proper humidity; gentle handling; avoid sharp décor edges.", vet: "Open/deep wounds need vet care for infection prevention and possible antibiotics or wound management. Severe if deep or spreading.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=60", severe: true },
    "Persistent dark stress coloration": { cure: "Reduce handling; add more hides; check temperature; increase cover.", prevent: "Visual barriers; adequate hides; stable environment.", vet: "If persistent with weight loss = vet exam.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=60", severe: false },
    "Weak grip at high perches": { cure: "Check calcium; add lower perches; reduce height of highest branches temporarily.", prevent: "Proper UVB/calcium; varied perch heights; safe climbing surfaces.", vet: "If combined with weight loss = vet exam.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: false },
    "Sunken eyes or sticky shed": { cure: "Rehydrate; mist more; offer fresh water; warm soak for shed.", prevent: "Maintain humidity; clean water daily; mist regularly.", vet: "Severe = vet assessment for infection/dehydration.", image: "https://images.unsplash.com/photo-1500375592092-040eb43e8fc5?w=200&q=60", severe: true },
    "Skin tears from rough handling": { cure: "Clean gently; apply safe reptile antiseptic; handle less.", prevent: "Gentle handling; smooth décor; avoid sharp edges.", vet: "Deep tears = vet for infection prevention.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=60", severe: true },
    "MBD from low UVB and supplementation gaps": { cure: "Correct UVB and calcium immediately; vet assessment.", prevent: "Quality UVB replaced on schedule; regular dusting.", vet: "Severe MBD requires vet treatment.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Respiratory irritation in stagnant humidity": { cure: "Improve ventilation; reduce misting frequency temporarily; clean enclosure.", prevent: "Good airflow; avoid constant dampness; clean regularly.", vet: "Wheezing/open-mouth breathing = vet visit.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: true },
    "Tail injuries from falls or handling": { cure: "Clean wound; limit climbing height temporarily; monitor for infection.", prevent: "Safe branch heights; gentle handling; adequate grip surfaces.", vet: "Deep/open tail wounds = vet care.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=60", severe: false },
    "Dehydration during low-humidity periods": { cure: "Rehydrate with soak; increase misting; offer fresh water immediately.", prevent: "Monitor humidity; mist as needed; fresh water daily.", vet: "Severe dehydration requires vet fluids.", image: "https://images.unsplash.com/photo-1500375592092-040eb43e8fc5?w=200&q=60", severe: true },
    "Regurgitation or repeated refusal to feed": { cure: "Rest; check temperature; offer smaller prey; reduce stress.", prevent: "Proper prey size; correct temperature; minimal handling after feeding.", vet: "Repeated regurgitation = urgent vet visit.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: true },
    "Wheezing, mucus, or open-mouth breathing": { cure: "Improve ventilation; check humidity; clean enclosure; vet assessment.", prevent: "Proper airflow; clean environment; avoid temperature extremes.", vet: "Severe respiratory signs require immediate vet care.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: true },
    "Stuck shed around eyes or tail tip": { cure: "Soak; gently assist with damp swab; never force.", prevent: "Humid hide maintained; regular misting; monitor eyes/tail.", vet: "Retained eye caps = vet removal; tail tip circulation risk.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=60", severe: false },
    "Lethargy paired with weight loss": { cure: "Offer favorite foods; check environment; reduce stress; vet exam.", prevent: "Stable conditions; proper diet; regular weight checks.", vet: "Weight loss with lethargy requires vet diagnosis.", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=60", severe: true },
    "Visible mites or frequent soaking": { cure: "Treat with reptile-safe mite treatment; clean entire enclosure; replace substrate.", prevent: "Quarantine new animals; inspect regularly; clean décor.", vet: "Heavy infestation = vet-prescribed treatment.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: true },
    "Rapid unexplained weight changes": { cure: "Weigh weekly; adjust feeding portion; check temperature; vet exam.", prevent: "Regular weight monitoring; consistent feeding; proper heat.", vet: "Rapid change = vet assessment needed.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Open-mouth breathing or mucus": { cure: "Improve ventilation immediately, check temperature and humidity, clean the enclosure thoroughly, and isolate the animal from other reptiles. Offer fresh water. Monitor breathing closely.", prevent: "Proper airflow; clean environment; avoid temperature drops and stagnant humidity.", vet: "Severe respiratory infection needs vet antibiotics and possibly imaging. Seek care same day.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: true },
    "Reduced tongue-flicking and responsiveness": { cure: "Check environment (heat, humidity, stress); reduce handling temporarily; vet if persistent.", prevent: "Stable conditions; minimal unnecessary stress; adequate space.", vet: "Persistent unresponsiveness = vet exam.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=60", severe: true },
    "Visible fat pads and inactivity": { cure: "Reduce feeding portion; increase activity space; review diet; vet check.", prevent: "Portion control; varied invertebrates; regular weight checks.", vet: "Obesity-related issues need vet guidance.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: false },
    "Difficulty shedding despite humidity": { cure: "Provide humid hide; warm soak; assist gently; review humidity levels.", prevent: "Maintain proper humidity; provide humid retreat; monitor skin.", vet: "Persistent dysecdysis = vet care.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=60", severe: false },
    "Bone softness or limb weakness": { cure: "Correct UVB/calcium immediately; vet assessment for MBD.", prevent: "Quality UVB; regular dusting; proper diet.", vet: "Severe MBD requires immediate vet treatment.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Chronic appetite suppression": { cure: "Check temperature gradient; review diet variety; reduce stress; vet exam.", prevent: "Stable environment; varied feeders; regular health checks.", vet: "Prolonged refusal requires vet diagnosis.", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=60", severe: true },
    "Chronic hiding and refusal to bask": { cure: "Check temperature; add more hides; reduce stress; review lighting.", prevent: "Proper bask zone; adequate cover; stable conditions.", vet: "If combined with weight loss = vet visit.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: false },
    "Limb weakness or tremors": { cure: "Correct calcium/UVB immediately with proper supplementation and bulb check. Reduce climbing height temporarily to prevent falls. Monitor closely for 24–48 hours.", prevent: "Regular supplementation schedule; quality UVB replaced on time; proper heat gradient maintained.", vet: "Severe = emergency vet visit (possible advanced MBD). Do not wait — limb weakness can progress rapidly.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=60", severe: true },
    "Rapid fat gain at tail base": { cure: "Reduce portion size; switch to lower-fat feeders; increase activity space; vet check.", prevent: "Portion control; varied invertebrates; regular monitoring.", vet: "Severe obesity = vet guidance needed.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=60", severe: false },
    "No burrowing behavior despite deep substrate": { cure: "Check temperature; add secure hides; review substrate depth/quality.", prevent: "Adequate substrate depth; secure hides; proper temperature.", vet: "If persistent with other signs = vet exam.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=60", severe: false },
  };

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
                                    <img src={info.image} alt={sign} style={{ width: "100%", maxHeight: "100px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.35rem", border: "1px solid var(--line)" }} />
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
