"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Reptile } from "@/data/reptiles";

type Props = {
  reptiles: Reptile[];
};

export default function SpeciesCarousel({ reptiles }: Props) {
  const [index, setIndex] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const syncVisibility = () => {
      // Pause autoplay while the tab is hidden to avoid unnecessary work.
      setIsPageVisible(document.visibilityState === "visible");
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (reptiles.length <= 1 || !isPageVisible) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % reptiles.length);
    }, 5500);

    return () => window.clearInterval(id);
  }, [isPageVisible, reptiles.length]);

  const activeIndex = reptiles.length > 0 ? index % reptiles.length : 0;
  const active = useMemo(() => reptiles[activeIndex] ?? reptiles[0], [activeIndex, reptiles]);
  const panelStyles = useMemo(
    () => reptiles.map((r) => ({ ["--accent" as string]: r.accent }) as CSSProperties),
    [reptiles]
  );

  if (reptiles.length === 0 || !active) {
    return null;
  }

  const moveIndex = (delta: number) => {
    if (reptiles.length <= 1) return;
    setIndex((current) => (current + delta + reptiles.length) % reptiles.length);
  };

  return (
    <section className="carousel-section" aria-label="Featured reptiles">
      <div className="section-heading">
        <p className="eyebrow">Canopy guides</p>
        <h2>Meet the reptiles</h2>
        <p>Swipe through dense-forest care panels — each species has its own page.</p>
      </div>

      <div className="carousel">
        {reptiles.map((r, i) => (
          <article
            key={r.slug}
            className={`carousel-panel ${i === activeIndex ? "active" : ""}`}
            style={panelStyles[i]}
            aria-hidden={i !== activeIndex}
          >
            <div className="carousel-media">
              <Image
                src={r.image}
                alt={r.imageAlt}
                fill
                priority={i === 0}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <div className="carousel-veil" />
            </div>
            <div className="carousel-copy">
              <p className="species-latin">{r.scientificHint}</p>
              <h3>{r.name}</h3>
              <p>{r.tagline}</p>
              <ul className="quick-stats">
                <li>
                  <span>Humidity</span>
                  <strong>{r.humidity}</strong>
                </li>
                <li>
                  <span>Temps</span>
                  <strong>{r.tempRange}</strong>
                </li>
              </ul>
              <Link href={`/reptiles/${r.slug}`} className="btn primary">
                Open full care guide
              </Link>
            </div>
          </article>
        ))}

        <div className="carousel-controls">
          <button
            type="button"
            aria-label="Previous reptile"
            onClick={() => moveIndex(-1)}
          >
            ‹
          </button>
          <div className="dots">
            {reptiles.map((r, i) => (
              <button
                key={r.slug}
                type="button"
                aria-label={`Show ${r.name}`}
                className={i === activeIndex ? "on" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next reptile"
            onClick={() => moveIndex(1)}
          >
            ›
          </button>
        </div>
        <p className="carousel-caption">{active.name}</p>
      </div>
    </section>
  );
}
