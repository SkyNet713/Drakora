import Link from "next/link";

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
      </div>
    </footer>
  );
}
