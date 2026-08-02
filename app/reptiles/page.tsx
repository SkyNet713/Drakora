import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { reptiles } from "@/data/reptiles";
import SelectReptileButton from "@/components/SelectReptileButton";

export const metadata: Metadata = {
  title: "Species Guides",
  description:
    "Browse reptile care guides for bearded dragons, snakes, geckos, monitor lizards, and chameleons.",
};

type Theme = "desert" | "river" | "forest";

const themeColors: Record<Theme, { bg: string; mid: string; light: string }> = {
  desert: { bg: "#5a3a20", mid: "#7a4a30", light: "#9a5a40" },
  river: { bg: "#2e2a3e", mid: "#3e3a4e", light: "#4e4a5e" },
  forest: { bg: "#2a3020", mid: "#3a4020", light: "#4a5020" },
};

function getTheme(slug: string): Theme {
  if (slug.includes("gecko") || slug.includes("chameleon")) return "forest";
  if (slug.includes("monitor") || slug.includes("snake")) return "river";
  if (slug.includes("dragon")) return "desert";
  return "forest";
}

export default function ReptilesPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Species library</p>
        <h1 className="page-title">Choose a reptile guide</h1>
        <p className="page-intro">
          Open a dedicated page for each group. Panels cover diet, disease risks,
          habitat minimums, lighting, humidity, substrate, and temporary
          substitutes.
        </p>
      </div>

      <div className="species-grid">
        {reptiles.map((r) => {
          const theme = getTheme(r.slug);
          const colorTheme = themeColors[theme];
          const themeVars = {
            "--tile-bg": `${colorTheme.bg}30`,
            "--tile-bg-solid": colorTheme.bg,
            "--tile-mid": colorTheme.mid,
            "--tile-light": colorTheme.light,
          } as CSSProperties;

          return (
            <div
              key={r.slug}
              className={`species-tile species-tile-theme-${theme}`}
              style={themeVars}
            >
              <Link href={`/reptiles/${r.slug}`} className="species-tile-link">
                <img
                  src={r.image}
                  alt={r.imageAlt}
                  loading="lazy"
                  width={640}
                  height={360}
                  className="species-tile-image"
                />
                <div className="species-tile-overlay" />
                <div className="species-tile-float species-tile-float-a" />
                <div className="species-tile-float species-tile-float-b" />

                <div className="species-tile-content">
                  <h3>{r.name}</h3>
                  <p>{r.tagline}</p>
                  <div className="species-tile-badges">
                    <span>{r.humidity}</span>
                    <span>{r.tempRange}</span>
                  </div>
                </div>
              </Link>
              <div className="species-tile-actions">
                <SelectReptileButton slug={r.slug} name={r.name} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
