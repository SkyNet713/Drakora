import Image from "next/image";
import Link from "next/link";
import SpeciesCarousel from "@/components/SpeciesCarousel";
import WelcomeVoice from "@/components/WelcomeVoice";
import ReadPageAloud from "@/components/ReadPageAloud";
import { reptiles } from "@/data/reptiles";

export default function HomePage() {
  return (
    <>
      <WelcomeVoice />
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/hero-drakora.jpg"
            alt="Drakora — various reptiles in a dark purple mystical forest"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          <h1 className="hero-brand">
            Drakora
            <em>Reptile Care</em>
          </h1>
          <p className="hero-lead">
            Species guides for dragons, snakes, geckos, monitors, and chameleons — plus health tracking, schedules, and a personal keeper dashboard.
          </p>
          <p style={{ color: "#e6b84a", fontSize: "0.85rem", marginBottom: "0.75rem" }}>🔊 Voice option is at the bottom of this page — look for the "Read page aloud" button.</p>
          <div className="hero-actions">
            <Link href="/reptiles" className="btn primary">
              Browse species
            </Link>
            <Link href="/login" className="btn secondary">
              Keeper login
            </Link>
          </div>
        </div>
      </section>

      <SpeciesCarousel reptiles={reptiles} />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Why split pages</p>
          <h2>Care depth without one endless scroll</h2>
          <p>
            Each reptile lives on its own guide page so you can load only what
            you need — diet, disease signs, enclosure minimums, lighting,
            humidity, substrate, and short-term substitutes.
          </p>
        </div>
        <div className="species-grid">
          {reptiles.map((r, i) => (
            <Link
              key={r.slug}
              href={`/reptiles/${r.slug}`}
              className={`species-tile stagger-${Math.min(i + 1, 6)}`}
            >
              <Image
                src={r.image}
                alt={r.imageAlt}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
              />
              <div className="species-tile-veil" />
              <div className="species-tile-copy">
                <h3>{r.name}</h3>
                <p>{r.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div style={{ textAlign: "center", marginTop: "2rem", paddingBottom: "2rem" }}>
        <ReadPageAloud />
      </div>
    </>
  );
}
