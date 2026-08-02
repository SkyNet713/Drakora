import Link from "next/link";
import type { Metadata } from "next";
import { reptiles } from "@/data/reptiles";
import SelectReptileButton from "@/components/SelectReptileButton";

export const metadata: Metadata = {
  title: "Species Guides",
  description:
    "Browse reptile care guides for bearded dragons, snakes, geckos, monitor lizards, and chameleons.",
};

export default function ReptilesPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Species library</p>
        <h1 className="page-title">Choose a reptile guide</h1>
        <p className="page-intro">
          Open a dedicated page for each group. Panels cover diet, disease
          risks, habitat minimums, lighting, humidity, substrate, and temporary
          substitutes.
        </p>
      </div>

      <div className="species-grid">
        {reptiles.map((r) => {
          const theme = r.slug.includes("gecko") || r.slug.includes("chameleon") ? "forest" : r.slug.includes("monitor") ? "river" : r.slug.includes("dragon") ? "desert" : r.slug.includes("snake") ? "river" : "forest";
          const colorTheme = theme === "desert" ? { bg: "#5a3a20", mid: "#7a4a30", light: "#9a5a40" } : theme === "river" ? { bg: "#2e2a3e", mid: "#3e3a4e", light: "#4e4a5e" } : { bg: "#2a3020", mid: "#3a4020", light: "#4a5020" };
          return (
            <div key={r.slug} className="species-tile" style={{ minHeight: "340px", position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${colorTheme.bg}30, #120520)` }}>
            <Link href={`/reptiles/${r.slug}`} style={{ position: "relative", display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
              <img
                src={r.image}
                alt={r.imageAlt}
                style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 25%, rgba(5,15,10,0.92) 100%)", zIndex: 1 }} />
              {/* Animated decorative shapes */}
              {theme === "desert" ? (
                <>
                  <div style={{ position: "absolute", top: "15%", left: "-30px", width: "140px", height: "60px", borderRadius: "50%", background: `radial-gradient(circle, ${colorTheme.bg}, transparent 70%)`, opacity: 0.9, zIndex: 0, animation: "floatDown 8s ease-in-out infinite" }} />
                  <div style={{ position: "absolute", bottom: "20%", right: "-20px", width: "100px", height: "80px", borderRadius: "40%", background: `linear-gradient(45deg, ${colorTheme.light}, transparent)`, opacity: 0.85, zIndex: 0, animation: "floatUp 7s ease-in-out infinite" }} />
                </>
              ) : theme === "river" ? (
                <>
                  <div style={{ position: "absolute", top: "10%", left: "-20px", width: "160px", height: "50px", borderRadius: "999px", background: `linear-gradient(90deg, ${colorTheme.bg}, transparent)`, opacity: 0.9, zIndex: 0, animation: "floatSide 6s ease-in-out infinite" }} />
                  <div style={{ position: "absolute", bottom: "25%", right: "-30px", width: "120px", height: "50px", borderRadius: "999px", background: `linear-gradient(-90deg, ${colorTheme.mid}, transparent)`, opacity: 0.85, zIndex: 0, animation: "floatSide 9s ease-in-out infinite" }} />
                </>
              ) : (
                <>
                  <div style={{ position: "absolute", top: "20%", left: "-40px", width: "120px", height: "140px", borderRadius: "20px", background: `linear-gradient(180deg, ${colorTheme.bg}, transparent)`, opacity: 0.85, zIndex: 0, animation: "floatDown 7s ease-in-out infinite" }} />
                  <div style={{ position: "absolute", bottom: "15%", right: "-30px", width: "100px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${colorTheme.mid}, transparent)`, opacity: 0.9, zIndex: 0, animation: "floatUp 8s ease-in-out infinite" }} />
                </>
              )}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, padding: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 0.25rem", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{r.name}</h3>
                <p style={{ margin: 0, color: "#b7dcc6", fontSize: "0.9rem", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{r.tagline}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "999px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.75rem", color: "#e8f2ea" }}>{r.humidity}</span>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "999px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.75rem", color: "#e8f2ea" }}>{r.tempRange}</span>
                </div>
              </div>
            </Link>
            <div style={{ padding: "0 1.25rem 1.25rem", position: "relative", zIndex: 3 }}>
              <SelectReptileButton slug={r.slug} name={r.name} />
            </div>
          </div>
        )
      })}
      </div>
    </section>
  );
}
