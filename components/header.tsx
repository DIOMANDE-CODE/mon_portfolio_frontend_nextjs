"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const navItems = [
  { href: "/",        label: "Accueil",     icon: "bi-house"        },
  { href: "/projet",  label: "Mes travaux", icon: "bi-folder2-open" },
  { href: "/visuel",  label: "Mes visuels", icon: "bi-images"       },
  { href: "/profil",  label: "Mon Profil",  icon: "bi-person"       },
  // { href: "/contact", label: "Me joindre",  icon: "bi-chat-text"    },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fermer le menu mobile à chaque changement de route */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* Fermer le menu mobile avec Escape */
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  /* Verrouiller le scroll body quand le menu mobile est ouvert */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Skip-to-content (accessibilité clavier) */}
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      <header id="header" className={scrolled ? "scrolled" : ""} role="banner">
        <div className="header-inner">

          {/* Logo */}
          <Link href="/" className="logo-text" aria-label="DROH — Accueil">
            &lt; DDM /&gt;
          </Link>

          {/* Navigation desktop */}
          <nav role="navigation" aria-label="Navigation principale">
            <ul className="nav-links">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive ? "active" : ""}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA desktop */}
          {/* <Link href="/contact" className="header-cta" aria-label="Me contacter">
            <i className="bi bi-lightning-fill" aria-hidden="true" />
            Commencer un projet
          </Link> */}

          {/* Bouton hamburger mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation mobile */}
        <nav
          id="mobile-nav"
          className={`mobile-nav ${mobileOpen ? "open" : ""}`}
          aria-label="Navigation mobile"
          aria-hidden={!mobileOpen}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}

          <Link href="/contact" className="mobile-nav-cta" tabIndex={mobileOpen ? 0 : -1}>
            <i className="bi bi-lightning-fill" aria-hidden="true" />
            Commencer un projet
          </Link>
        </nav>

        {/* Overlay sombre derrière le menu mobile */}
        {mobileOpen && (
          <div
            className="mobile-nav-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    </>
  );
}
