import Link from "next/link";
import ReadAloud from "@/components/ReadAloud";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">Drakora</p>
          <p className="footer-note">
            Care guides for education — always consult an exotic vet for medical
            concerns.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/reptiles">Species guides</Link>
          <Link href="/login">Keeper login</Link>
          <Link href="/dashboard">My reptiles</Link>
        </div>
        <div className="footer-accessibility" style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#b7dcc6" }}>
            Accessibility: This site supports screen readers. Listen to our guide: <a href="/voice-drakora.mp3" style={{ color: "#e6b84a", textDecoration: "underline" }}>Drakora voice intro (MP3)</a>
          </p>
          <ReadAloud />
        </div>
      </div>
    </footer>
  );
}
