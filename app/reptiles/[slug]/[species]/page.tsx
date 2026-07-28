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

  return (
    <>
      <section className="guide-hero">
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

      <section className="section">
        <Link href={`/reptiles/${slug}`} className="btn secondary" style={{ marginBottom: "2rem", display: "inline-block" }}>← Back to {parent.name}</Link>
        <div className="care-grid">
          {sections.map((sec) => (
            <article key={sec.title} className="care-panel">
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
