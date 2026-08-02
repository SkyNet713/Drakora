import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getReptile, reptiles } from "@/data/reptiles";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reptile = getReptile(slug);
  if (!reptile) return { title: "Not found" };
  return {
    title: reptile.name,
    description: reptile.description,
  };
}

export default async function ReptileGuidePage({ params }: Props) {
  const { slug } = await params;
  const reptile = getReptile(slug);
  if (!reptile) notFound();

  const sections = [
    reptile.diet,
    reptile.diseases,
    reptile.habitat,
    reptile.lighting,
    reptile.humidityDetail,
    reptile.substrate,
    reptile.substitutes,
  ];

  return (
    <>
      <section className="guide-hero">
        <div className="guide-hero-media">
          <Image
            src={reptile.image}
            alt={reptile.imageAlt}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="guide-hero-shade" />
        <div className="guide-hero-copy">
          <p className="eyebrow">{reptile.scientificHint}</p>

          <p className="page-intro" style={{ maxWidth: "40rem" }}>
            {reptile.description}
          </p>
          <div className="guide-meta">
            <span className="chip">Humidity {reptile.humidity}</span>
            <span className="chip">{reptile.tempRange}</span>
          </div>
          <div className="species-switcher">
            {reptiles.map((r) => (
              <Link
                key={r.slug}
                href={`/reptiles/${r.slug}`}
                className={r.slug === reptile.slug ? "active" : ""}
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {reptile.species && reptile.species.length > 0 && (
        <section className="section" style={{ paddingTop: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "1.5rem" }}>Species</h2>
          <div className="species-grid">
            {reptile.species.map((s) => {
              const accents: Record<string, string> = {
                "crested-gecko": "#5a8f7b", "gargoyle-gecko": "#8a6e4f", "leopard-gecko": "#c9a45c",
                "day-gecko": "#4aa56f", "moorish-gecko": "#9d7a5e", "nile-monitor": "#3d8f63",
                "savanna-monitor": "#c4956a", "asian-water-monitor": "#6aaea8", "ackie-monitor": "#8fbfa4",
                "veiled-chameleon": "#5fbf8a", "panther-chameleon": "#d4b483", "jacksons-chameleon": "#7ec8a3",
              };
              const accent = accents[s.slug] || "#8fbfa4";
              return (
                <Link key={s.slug} href={`/reptiles/${slug}/${s.slug}`} className="species-tile" style={{ minHeight: "260px", background: `linear-gradient(135deg, ${accent}22, ${accent}55)` }}>
                  <Image src={`/subspecies/${s.slug}.png`} alt={s.name} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 20%, ${accent}dd 100%)`, zIndex: 1 }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", zIndex: 2 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.25rem", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{s.name}</h3>
                    <p style={{ margin: 0, color: "#fff", fontSize: "0.85rem", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{s.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="section">
        <div className="care-grid">
          {sections.map((section) => (
            <article key={section.title} className="care-panel">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}

          <article className="care-panel">
            <h2>Signs of health risk</h2>
            <p>
              Use these as early-warning cues for {reptile.name.toLowerCase()}.
              Seek an exotic veterinarian if symptoms persist.
            </p>
            <div className="risk-list">
              {reptile.healthRiskSigns.map((sign) => (
                <div key={sign} className="risk-item">
                  {sign}
                </div>
              ))}
            </div>
          </article>

          <article className="care-panel">
            <h2>Suggested care schedule</h2>
            <p>Default rhythms you can copy into your keeper dashboard.</p>
            <ul>
              <li>
                <strong>Feeding:</strong> {reptile.scheduleDefaults.feeding}
              </li>
              <li>
                <strong>Watering:</strong> {reptile.scheduleDefaults.watering}
              </li>
              <li>
                <strong>Cleaning:</strong> {reptile.scheduleDefaults.cleaning}
              </li>
            </ul>
            <div style={{ marginTop: "1rem" }}>
              <Link href="/dashboard" className="btn primary">
                Track this species in My Reptiles
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
