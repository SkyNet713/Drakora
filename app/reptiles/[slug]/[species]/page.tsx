import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReptile } from "@/data/reptiles";
import type { ReptileSpecies } from "@/data/reptiles";

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
    s.diet, s.diseases, s.habitat, s.lighting, s.humidityDetail, s.substrate, s.substitutes,
  ];

  const colorMap: Record<string, string> = {
    "crested-gecko":"#5a8f7b", "gargoyle-gecko":"#8a6e4f", "leopard-gecko":"#c9a45c",
    "day-gecko":"#4aa56f", "moorish-gecko":"#9d7a5e", "nile-monitor":"#3d8f63",
    "savanna-monitor":"#c4956a", "asian-water-monitor":"#6aaea8", "ackie-monitor":"#8fbfa4",
    "veiled-chameleon":"#5fbf8a", "panther-chameleon":"#d4b483", "jacksons-chameleon":"#7ec8a3",
  };
  const accent = colorMap[species] || "#8fbfa4";

  return (
    <>
      <section className="guide-hero" style={{ background: `linear-gradient(135deg, ${accent}22, #06140d 70%)` }}>
        <div className="guide-hero-media">
          <Image src={s.image} alt={s.imageAlt} fill priority sizes="100vw" />
        </div>
        <div className="guide-hero-shade" />
        <div className="guide-hero-copy">
          <p className="eyebrow">{parent.name} · {s.scientificHint}</p>
          <h1 className="guide-title">{s.name}</h1>
          <p className="page-intro">{s.description}</p>
          <div className="guide-meta">
            <span className="chip">Humidity {s.humidity}</span>
            <span className="chip">{s.tempRange}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: `linear-gradient(180deg, #06140d, ${accent}15)` }}>
        <Link href={`/reptiles/${slug}`} className="btn secondary" style={{ marginBottom: "2rem", display: "inline-block" }}>← Back to {parent.name}</Link>
        <div style={{ borderRadius: "1rem", overflow: "hidden", marginBottom: "2rem", border: "1px solid var(--line)" }}>
          <Image src={`/subspecies/${species}.png`} alt={s.name} width={800} height={300} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
        </div>
        <div style={{ background: `${accent}18`, padding: "1.25rem", borderRadius: "1rem", marginBottom: "2rem", border: `1px solid ${accent}55` }}>
          <p style={{ color: "var(--mist)", lineHeight: 1.6, margin: 0 }}>{s.description}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div className="chip" style={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ display: "block", fontSize: "0.7rem", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Humidity</span>
            <strong style={{ fontSize: "1rem" }}>{s.humidity}</strong>
          </div>
          <div className="chip" style={{ textAlign: "center", padding: "1rem" }}>
            <span style={{ display: "block", fontSize: "0.7rem", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Temperature</span>
            <strong style={{ fontSize: "1rem" }}>{s.tempRange}</strong>
          </div>
        </div>
        <div className="care-grid">
          {sections.map((sec) => (
            <article key={sec.title} className="care-panel" style={{ background: `linear-gradient(180deg, ${accent}15, ${accent}08)` }}>
              <h2>{sec.title}</h2>
              <p>{sec.content}</p>
              {sec.bullets ? <ul>{sec.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
            </article>
          ))}
          <article className="care-panel">
            <h2>Health Risk Signs</h2>
            <div className="risk-list">
              {s.healthRiskSigns.map((sign) => (
                <div key={sign} className="risk-item">{sign}</div>
              ))}
            </div>
          </article>
          <article className="care-panel">
            <h2>Suggested Care Schedule</h2>
            <ul>
              <li><strong>Feeding:</strong> {s.scheduleDefaults.feeding}</li>
              <li><strong>Watering:</strong> {s.scheduleDefaults.watering}</li>
              <li><strong>Cleaning:</strong> {s.scheduleDefaults.cleaning}</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
