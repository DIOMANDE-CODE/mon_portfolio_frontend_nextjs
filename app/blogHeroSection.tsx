"use client";
import Image from "next/image";
import Link from "next/link";
import TypingText from "@/components/TypingText";

const ROLES = [
  "Génie Logiciel",
  "Intégration IA",
  "Infographe",
  "Monteur Vidéo"
];

const STATS = [
  { n: "+3",  l: "Ans d'expérience" },
  { n: "+30", l: "Projets livrés"   },
  // { n: "10+", l: "Technologies"     },
];

export default function BlogHeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* Petits points flottants décoratifs */}
      <div className="hero-float-dot dot-a" />
      <div className="hero-float-dot dot-b" />
      <div className="hero-float-dot dot-c" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-layout">

          {/* ── Texte ── */}
          <div className="hero-content" data-aos="fade-right" data-aos-duration="900">
            <br/>
            <div className="hero-greeting">Bienvenue, je suis</div>
            <h1 className="hero-name">
              DIOMANDE<br />DROH MARTIAL
            </h1>

            <div className="hero-role-line">
              <TypingText texts={ROLES} />
            </div>

            <p className="hero-desc">
              Vous avez une idée ? Je la transforme en application web ou mobile
              fonctionnelle, rapide et moderne. J&apos;intègre également l&apos;intelligence
              artificielle à vos solutions pour les rendre plus puissantes et modernes aux marchés actuels.
            </p>

            <div className="hero-actions">
              <Link href="/projet" className="btn-primary-dark">
                <i className="bi bi-folder2-open" />
                Mes réalisations
              </Link>
              <Link href="/profil" className="btn-outline-dark">
                <i className="bi bi-person-fill" />
                Mon Profil
              </Link>
            </div>

            <div className="hero-badges-row">
              <span className="hero-status">
                <span className="status-dot" />
                Disponible pour des missions
              </span>
              <span className="hero-mini-badge">
                <i className="bi bi-lightning-fill" style={{ color: "#f59e0b" }} />
                Livraison rapide
              </span>
              <span className="hero-mini-badge">
                <i className="bi bi-shield-check" style={{ color: "#22c55e" }} />
                Sécurité
              </span>
            </div>

            {/* ── Stats animées ── */}
            <div className="hero-stats-row" data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
              {STATS.map((s, i) => (
                <div key={i} style={{ display: "contents" }}>
                  {i > 0 && <div className="hero-stat-sep" />}
                  <div className="hero-stat-item">
                    <span className="hero-stat-n">{s.n}</span>
                    <span className="hero-stat-l">{s.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visuels ── */}
          <div className="hero-visuals" data-aos="fade-left" data-aos-duration="900" data-aos-delay="200">
            <div className="hero-visuals-grid">
              <div className="hero-img-main">
                {/* Desktop : image principale */}
                <Image
                  className="hero-img-desktop-only"
                  src="/assets/img/index/index_image_1.jpg"
                  alt="Développement web & mobile"
                  width={600}
                  height={800}
                  priority
                />
                {/* Mobile : image avec code informatique */}
                <Image
                  className="hero-img-mobile-only"
                  src="/assets/img/index/index_image_2.jpg"
                  alt="Code informatique — développement"
                  width={600}
                  height={400}
                  priority
                />
                {/* Badge flottant sur l'image principale */}
                <div className="hero-img-badge">
                  <i className="bi bi-star-fill" style={{ color: "#f59e0b" }} />
                  Full-Stack
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div className="hero-img-secondary">
                  <Image
                    src="/assets/img/index/index_image_2.jpg"
                    alt="Intelligence Artificielle"
                    width={400}
                    height={280}
                    priority
                  />
                  {/* Badge flottant sur la 2ème image */}
                  <div className="hero-img-badge badge-sm">
                    <i className="bi bi-cpu-fill" style={{ color: "var(--accent-purple)" }} />
                    IA & ML
                  </div>
                </div>
                <div className="hero-code-block">
                  <div>
                    <span style={{ color: "#7c3aed" }}>const</span>{" "}
                    <span style={{ color: "#00d4ff" }}>dev</span>{" = {"}
                  </div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <span style={{ color: "#94a3b8" }}>stack:</span>{" "}
                    <span style={{ color: "#f59e0b" }}>&quot;Full-Stack&quot;</span>,
                  </div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <span style={{ color: "#94a3b8" }}>ai:</span>{" "}
                    <span style={{ color: "#f472b6" }}>true</span>,
                  </div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <span style={{ color: "#94a3b8" }}>passion:</span>{" "}
                    <span style={{ color: "#86efac" }}>&quot;∞&quot;</span>
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Indicateur de scroll ── */}
      <div className="hero-scroll-hint">
        <span className="hero-scroll-label">Défiler</span>
        <div className="hero-scroll-track">
          <div className="hero-scroll-thumb" />
        </div>
      </div>
    </section>
  );
}
