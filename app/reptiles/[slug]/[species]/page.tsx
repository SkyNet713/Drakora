import Link from "next/link";
import { notFound } from "next/navigation";
import { getReptile } from "@/data/reptiles";
import type { ReptileSpecies } from "@/data/reptiles";
import CopyScheduleButton from "./CopyScheduleButton";

type Props = {
  params: Promise<{ slug: string; species: string }>;
};

export default async function SubSpeciesPage({ params }: Props) {
  const { slug, species } = await params;
  const parent = getReptile(slug);
  if (!parent || !parent.species) notFound();
  const s = parent.species.find((sp) => sp.slug === species) as ReptileSpecies | undefined;
  if (!s) notFound();

  const sections = [
    s?.diet, s?.diseases, s?.habitat, s?.lighting, s?.humidityDetail, s?.substrate, s?.substitutes,
  ].filter(Boolean) as { title: string; content: string; bullets?: string[] }[];

  const colorMap: Record<string, string> = {
    "crested-gecko":"#5a8f7b", "gargoyle-gecko":"#8a6e4f", "leopard-gecko":"#c9a45c",
    "day-gecko":"#4aa56f", "moorish-gecko":"#9d7a5e", "nile-monitor":"#3d8f63",
    "savanna-monitor":"#c4956a", "asian-water-monitor":"#6aaea8", "ackie-monitor":"#8fbfa4",
    "veiled-chameleon":"#5fbf8a", "panther-chameleon":"#d4b483", "jacksons-chameleon":"#7ec8a3",
  };
  const accent = colorMap[species] || "#8fbfa4";

  return (
    <section className="section" style={{ paddingTop: "2rem" }}>
      <Link href={`/reptiles/${slug}`} className="btn secondary" style={{ marginBottom: "2rem", display: "inline-block" }}>← Back to {parent.name}</Link>

      <div style={{ border: `2px solid ${accent}`, borderRadius: "1rem", padding: "1.5rem", background: `linear-gradient(135deg, ${accent}10, #120520)` }}>
        <h1 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.5rem", color: "#fff" }}>{s.name}</h1>
        <p style={{ color: "var(--mist)", fontStyle: "italic", margin: "0 0 1rem" }}>{s.scientificHint}</p>
        <p style={{ color: "var(--fern)", lineHeight: 1.6 }}>{s.description}</p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <span style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", border: `1px solid ${accent}`, background: `${accent}15`, color: "#fff", fontSize: "0.85rem" }}>Humidity: {s.humidity}</span>
          <span style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", border: `1px solid ${accent}`, background: `${accent}15`, color: "#fff", fontSize: "0.85rem" }}>Temp: {s.tempRange}</span>
        </div>
        <div style={{ marginTop: "1.25rem" }}>
          <a href="#" className="btn primary small" style={{ textDecoration: "none", display: "inline-block", marginTop: "0.75rem" }} onClick={(e) => { e.preventDefault(); alert("Profile feature coming soon."); }}>+ Add to my profile</a>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.75rem" }}>Species Image</h2>
          <img src={s.image} alt={s.imageAlt} loading="lazy" width={640} height={420} style={{ width: "100%", borderRadius: "0.75rem", border: `2px solid ${accent}`, display: "block" }} />
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.75rem" }}>Habitat Setup</h2>
          <p style={{ color: "var(--mist)", lineHeight: 1.6 }}>{s.habitat.content}</p>
          <ul style={{ paddingLeft: "1.1rem", color: "var(--cream)", lineHeight: 1.6, marginTop: "0.75rem" }}>
            {s.habitat.bullets?.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: "2.5rem", border: `2px solid ${accent}`, borderRadius: "1rem", padding: "1.25rem", background: `${accent}08` }}>
        <h3 style={{ margin: "0 0 1rem", color: "var(--mist)", fontFamily: "var(--font-display)" }}>Enrichment & Setup</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <div>
            <h4 style={{ color: "var(--amber)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Live Plants</h4>
            <ul style={{ paddingLeft: "1.1rem", color: "var(--cream)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              {species.includes("gecko") ? (
                <>
                  <li>Pothos, bromeliads, snake plant, ferns</li>
                  <li>Live moss (sphagnum) for humidity pockets</li>
                </>
              ) : species.includes("monitor") ? (
                <>
                  <li>Sturdy grasses, bamboo, spider plant</li>
                  <li>Deep-rooted plants safe for large lizards</li>
                </>
              ) : (
                <>
                  <li>Hibiscus, pothos, ficus, dracaena</li>
                  <li>Dense foliage with strong branches</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 style={{ color: "var(--amber)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Decor & Brands</h4>
            <ul style={{ paddingLeft: "1.1rem", color: "var(--cream)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              <li>Cork rounds & hides (Zoo Med / Exo Terra)</li>
              <li>Bioactive soil mix (ABG / The Bio Dude)</li>
              <li>LED grow lights (Arcadia / Jungle Dawn)</li>
              <li>Thermostats & hygrometers (Inkbird / Govee)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "var(--amber)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Enrichment</h4>
            <ul style={{ paddingLeft: "1.1rem", color: "var(--cream)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              <li>Climbing branches, bamboo tubes, rock ledges</li>
              <li>Dig boxes and burrow tunnels for monitors</li>
              <li>Live feeding stations and foraging toys</li>
              <li>Visual barriers and hiding spots</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="care-grid" style={{ marginTop: "2.5rem" }}>
        {sections.map((sec) => (
          <article key={sec.title} className="care-panel glass-card">
            <h2>{sec.title}</h2>
            <p>{sec.content}</p>
            {sec.bullets ? <ul>{sec.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </article>
        ))}
        <article className="care-panel glass-card">
          <h2>Health Risk Signs</h2>
          <div style={{ border: "2px solid #d9785c", borderRadius: "1rem", padding: "1rem", background: "rgba(217,120,92,0.08)" }}><h3 style={{ margin: "0 0 0.75rem", color: "#ffc7b8" }}>Health Risk Signs</h3><div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>{s.healthRiskSigns.map((sign) => <span key={sign} style={{ padding: "0.35rem 0.75rem", borderRadius: "999px", border: "1px solid #d9785c", background: "#d9785c", color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{sign}</span>)}</div></div>
        </article>
        <article className="care-panel glass-card">
          <h2>Suggested Care Schedule</h2>
          <div style={{ border: "2px solid #5fbf8a", borderRadius: "1rem", padding: "1.25rem", background: "rgba(95,191,138,0.08)" }}><h3 style={{ margin: "0 0 1rem", color: "#8fbfa4" }}>Schedule</h3><ul style={{ paddingLeft: "1.1rem", color: "var(--cream)", lineHeight: 1.6 }}><li><strong>Feeding:</strong> {s.scheduleDefaults.feeding}</li><li><strong>Watering:</strong> {s.scheduleDefaults.watering}</li><li><strong>Cleaning:</strong> {s.scheduleDefaults.cleaning}</li></ul></div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={`/dashboard?add=${species}&feeding=${encodeURIComponent(s.scheduleDefaults.feeding)}&watering=${encodeURIComponent(s.scheduleDefaults.watering)}&cleaning=${encodeURIComponent(s.scheduleDefaults.cleaning)}`} className="btn primary small" style={{ textDecoration: "none" }}>
              Add to My Reptiles
            </a>
            <CopyScheduleButton
              feeding={s.scheduleDefaults.feeding}
              watering={s.scheduleDefaults.watering}
              cleaning={s.scheduleDefaults.cleaning}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
