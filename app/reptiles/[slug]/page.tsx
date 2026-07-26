import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  type CareGuide,
  type ReptileSpecies,
  getAllSlugs,
  getReptile,
  reptiles,
} from "@/data/reptiles";

type Props = {
  params: Promise<{ slug: string }>;
};

type CareGuideView = CareGuide & {
  name: string;
};

function CareGuidePanels({ guide }: { guide: CareGuideView }) {
  const sections = [
    guide.diet,
    guide.diseases,
    guide.habitat,
    guide.lighting,
    guide.humidityDetail,
    guide.substrate,
    guide.substitutes,
  ];

  return (
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
          Use these as early-warning cues for {guide.name.toLowerCase()}. Seek an
          exotic veterinarian if symptoms persist.
        </p>
        <div className="risk-list">
          {guide.healthRiskSigns.map((sign) => (
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
            <strong>Feeding:</strong> {guide.scheduleDefaults.feeding}
          </li>
          <li>
            <strong>Watering:</strong> {guide.scheduleDefaults.watering}
          </li>
          <li>
            <strong>Cleaning:</strong> {guide.scheduleDefaults.cleaning}
          </li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/dashboard" className="btn primary">
            Track this species in My Reptiles
          </Link>
        </div>
      </article>
    </div>
  );
}

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
  const species = reptile.species ?? [];

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
          <h1 className="guide-title">{reptile.name}</h1>
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
          {species.length ? (
            <div className="species-switcher-visual">
              {species.map((entry) => (
                <Link key={entry.slug} href={`#${entry.slug}`} className="species-switcher-item">
                  <div className="species-switcher-image">
                    <Image
                      src={entry.image}
                      alt={entry.imageAlt}
                      fill
                      sizes="60px"
                    />
                  </div>
                  <span className="species-switcher-label">{entry.name}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        {species.length ? (
          <div className="species-guides">
            {species.map((entry: ReptileSpecies) => (
              <article key={entry.slug} id={entry.slug} className="species-guide">
                <div className="section-heading">
                  <p className="eyebrow">{entry.scientificHint}</p>
                  <h2 className="page-title">{entry.name}</h2>
                  <p className="page-intro">{entry.description}</p>
                </div>
                <div className="species-guide-media">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                  />
                </div>
                <div className="guide-meta">
                  <span className="chip">Humidity {entry.humidity}</span>
                  <span className="chip">{entry.tempRange}</span>
                </div>
                <CareGuidePanels guide={entry} />
              </article>
            ))}
          </div>
        ) : (
          <CareGuidePanels guide={reptile} />
        )}
      </section>
    </>
  );
}
