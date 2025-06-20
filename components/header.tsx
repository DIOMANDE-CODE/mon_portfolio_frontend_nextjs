"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header id="header" className="header position-relative">
        <div className="container-fluid container-xl position-relative">
          <div className="top-row d-flex align-items-center justify-content-between">
            <Link href="/" className="logo d-flex align-items-end">
              <h1 className="sitename">&#60; DIOMANDE DROH MARTIAL /&gt;</h1>
            </Link>
            <div className="d-flex align-items-center">
              <div className="social-links">
                <Link
                  href="https://web.facebook.com/Young.CAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                  title="Blog Young"
                >
                  <i className="bi bi-facebook" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-wrap">
          <div className="container d-flex justify-content-center position-relative">
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  {pathname === "/" ? (
                    <Link href="/" className="active">
                      Acceuil
                    </Link>
                  ) : (
                    <Link href="/">Acceuil</Link>
                  )}
                </li>
                <li>
                  {pathname === "/projet" ? (
                    <Link href="/projet" className="active">
                      Mes travaux
                    </Link>
                  ) : (
                    <Link href="/projet">Mes travaux</Link>
                  )}
                </li>
                <li>
                  {pathname === "/visuel" ? (
                    <Link href="/visuel" className="active">
                      Mes visuels
                    </Link>
                  ) : (
                    <Link href="/visuel">Mes visuels</Link>
                  )}
                </li>
                <li>
                  {pathname === "/profil" ? (
                    <Link href="/profil" className="active">
                      Mon Profil
                    </Link>
                  ) : (
                    <Link href="/profil">Mon Profil</Link>
                  )}
                </li>
                <li>
                  {pathname === "/contact" ? (
                    <Link href="/contact" className="active">
                      Me joindre
                    </Link>
                  ) : (
                    <Link href="/contact">Me joindre</Link>
                  )}
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
          </div>
        </div>
      </header>

      {/* Scroll Top */}
      <Link
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </Link>
    </>
  );
}
