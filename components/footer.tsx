import Link from "next/link";

const EXPERTISES = [
  "Développement Web Full-Stack",
  "Développement Mobile",
  "Intelligence Artificielle",
  "Communication digitale",
  "Infographie",
];

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/projet", label: "Mes travaux" },
  { href: "/visuel", label: "Mes visuels" },
  { href: "/profil", label: "Mon profil" },
  // { href: "/contact", label: "Me joindre"   },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" role="contentinfo">
      <div className="container">
        <div className="row gy-4">

          {/* ── Colonne 1 : identité + contact ── */}
          <div className="col-lg-4 col-md-12">
            <span className="footer-logo" aria-label="DROH — logo">&lt; DIOMANDE DROH MARTIAL /&gt;</span>
            <p className="footer-tagline">
              Développeur Full-Stack passionné par la création d&apos;applications web
              modernes, performantes et intelligentes.
            </p>
            <ul className="footer-list" aria-label="Coordonnées">
              <li>
                <i className="bi bi-geo-alt footer-icon" aria-hidden="true" />
                <span>Abidjan · Yamoussoukro, Côte d&apos;Ivoire</span>
              </li>
              <li>
                <i className="bi bi-whatsapp footer-icon" aria-hidden="true" />
                <a href="https://wa.me/2250595031694" target="_blank"
                  rel="noopener noreferrer" className="footer-contact-link">
                  +225 05 95 03 16 94
                </a>
              </li>
              <li>
                <i className="bi bi-envelope footer-icon" aria-hidden="true" />
                <a href="mailto:diomandedrohmartial01@gmail.com" target="_blank"
                  rel="noopener noreferrer" className="footer-contact-link">
                  diomandedrohmartial01@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* ── Colonne 2 : navigation ── */}
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-heading">Navigation</h4>
            <nav aria-label="Navigation pied de page">
              <ul className="footer-list">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="footer-nav-link">
                      <i className="bi bi-chevron-right footer-arrow" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Colonne 3 : expertises ── */}
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-heading">Expertises</h4>
            <ul className="footer-list" aria-label="Domaines d'expertise">
              {EXPERTISES.map((s) => (
                <li key={s} className="footer-expertise-item">
                  <span className="footer-bullet" aria-hidden="true">▸</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Icônes sociales */}
        <div className="footer-socials">
          <a href="https://github.com/DIOMANDE-CODE" target="_blank" rel="noreferrer" className="footer-social-btn" title="GitHub" aria-label="GitHub">
            <i className="bi bi-github" />
          </a>
          <a href="https://linkedin.com/in/diomande-droh-martial-a48005244" target="_blank" rel="noreferrer" className="footer-social-btn" title="LinkedIn" aria-label="LinkedIn">
            <i className="bi bi-linkedin" />
          </a>
          <a href="mailto:diomandedrohmartial01@gmail.com" className="footer-social-btn" title="Email" aria-label="Email">
            <i className="bi bi-envelope-fill" />
          </a>
          <a href="https://wa.me/2250595031694" target="_blank" rel="noreferrer" className="footer-social-btn" title="WhatsApp" aria-label="WhatsApp">
            <i className="bi bi-whatsapp" />
          </a>
        </div>

        {/* <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {year} <span>DIOMANDE DROH MARTIAL</span>. Tous droits réservés.
          </p>
        </div> */}
      </div>
    </footer>
  );
}
