"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/lib/storage";

const links = [
  { href: "/", label: "Home" },
  { href: "/reptiles", label: "Species" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "My Reptiles" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setLoggedIn(!!user);
    setName(user?.displayName ?? "");
    setOpen(false);
  }, [pathname]);

  function handleLogout() {
    logoutUser();
    setLoggedIn(false);
    setName("");
    window.location.href = "/";
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <img src="/logo-drakora.png" alt="Drakora logo" className="brand-logo" style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", objectFit: "cover", boxShadow: "0 0 0 1px rgba(183,220,198,0.25)" }} />
          <span className="brand-text">Drakora</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
          {loggedIn ? (
            <>
              <span className="nav-user">Hi, {name}</span>
              <button type="button" className="nav-cta ghost" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="nav-cta">
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
