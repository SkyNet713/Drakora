import Link from "next/link";

export const metadata = {
  title: "About — Drakora",
  description: "A mobile-optimized reptile care site with interactive schedules, health indicators, and species guides.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="eyebrow">About</p>
        <h1 className="page-title">Built for keepers, by design</h1>
        <p className="page-intro" style={{ marginBottom: "2rem" }}>
          Drakora is a mobile-first care site with interactive schedule tracking, health-risk indicators, and nested species guides. Each guide includes habitat minimums, lighting requirements, humidity targets, substrate recommendations, and feeding schedules — all tied to a lightweight profile system that saves directly to your browser.
        </p>
        <article className="care-panel glass-card" style={{ marginBottom: "1.25rem" }}>
          <h2>Interactive features</h2>
          <ul>
            <li>Profile modal connects each species to your personal reptile list</li>
            <li>Interactive care schedule with progress tracking</li>
            <li>Health status indicators with acknowledgment tracking</li>
          </ul>
        </article>
        <article className="care-panel glass-card" style={{ marginBottom: "1.25rem" }}>
          <h2>Mobile optimized</h2>
          <p>Responsive cards, touch-friendly buttons, and viewport-specific CSS ensure the site works cleanly on phones and tablets.</p>
        </article>
        <Link href="/" className="btn primary">Back to guides</Link>
      </div>
    </section>
  );
}
