"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hook/useFetch";

interface Competence {
  id: number;
  nom_competence: string;
}

interface AuthorContent {
  id: number;
  biographie: string;
  competences: Competence[];
}

const SOFT_SKILLS = [
  "Travail en équipe",
  "Communication",
  "Esprit critique",
  "Gestion du temps",
  "Curiosité",
  "Adaptabilité",
];

const DOMAINS = [
  "Développement Web",
  "Développement Mobile",
  "Intelligence Artificielle",
  "Communication visuelle",
  "Montage Vidéo",
  "Infographie",
];

function chipColor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("react") || n.includes("next") || n.includes("angular") || n.includes("vue")) return "chip-blue";
  if (n.includes("python") || n.includes("django") || n.includes("flask")) return "chip-yellow";
  if (n.includes("node") || n.includes("express") || n.includes("mongo")) return "chip-green";
  if (n.includes("type") || n.includes("java") || n.includes("kotlin") || n.includes("swift")) return "chip-orange";
  if (n.includes("docker") || n.includes("cloud") || n.includes("aws") || n.includes("linux")) return "chip-cyan";
  if (n.includes("ia") || n.includes("ai") || n.includes("ml") || n.includes("deep") || n.includes("tensor")) return "chip-pink";
  return "chip-purple";
}

export default function AuthorContent() {
  const { data, error, loading } = useFetch("users/list/");
  const [contents, setContents] = useState<AuthorContent[]>([]);

  useEffect(() => {
    if (data) setContents(data as AuthorContent[]);
  }, [data]);

  if (loading)
    return (
      <div className="profil-card-loading">
        <div className="loading-spinner" />
      </div>
    );
  if (error)
    return (
      <div className="error-box">
        <i className="bi bi-exclamation-triangle" /> {String(error)}
      </div>
    );

  return (
    <>
      {contents.map((info, i) => (
        <div
          className="profil-skills-card"
          key={info.id ?? i}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Lueurs décoratives */}
          <div className="profil-card-glow-1" />
          <div className="profil-card-glow-2" />

          <div className="profil-card-grid">

            {/* ── Colonne gauche : biographie + stack ── */}
            <div className="profil-card-col">

              {/* Biographie */}
              <div>
                <h3 className="profil-card-title">Biographie</h3>
                <div className="profil-bio-text">
                  {info.biographie
                    .split("\n")
                    .filter((p) => p.trim())
                    .map((p, i) => (
                      <p key={`bio-${info.id}-${i}`}>{p}</p>
                    ))}
                </div>
              </div>

              {/* Stack technique */}
              <div>
                <h3 className="profil-card-title">Stack technique</h3>
                <div className="profil-tech-chips">
                  {info.competences.map((c, ci) => (
                    <span
                      className={`profil-tech-chip ${chipColor(c.nom_competence)}`}
                      key={c.id ?? `comp-${ci}`}
                    >
                      <i className="bi bi-code-slash" />
                      {c.nom_competence}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Colonne droite : soft skills, domaines, langues ── */}
            <div className="profil-card-col">

              {/* Soft Skills */}
              <div>
                <h3 className="profil-card-title">Soft Skills</h3>
                <div className="profil-soft-grid">
                  {SOFT_SKILLS.map((s, i) => (
                    <div className="profil-soft-item" key={i}>
                      <i className="bi bi-check2-circle" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Domaines */}
              <div>
                <h3 className="profil-card-title">Domaines d&apos;interventions</h3>
                <div className="profil-domains-grid">
                  {DOMAINS.map((d, i) => (
                    <div className="profil-domain-item" key={i}>
                      <div className="profil-domain-dot" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div>
                <h3 className="profil-card-title">Langues</h3>
                <div className="profil-lang-row">
                  <div className="profil-lang-item">
                    <span className="profil-lang-flag">🇫🇷</span>
                    <span>Français</span>
                    <span className="profil-lang-level">Natif</span>
                  </div>
                  <div className="profil-lang-divider" />
                  <div className="profil-lang-item">
                    <span className="profil-lang-flag">🇬🇧</span>
                    <span>Anglais</span>
                    <span className="profil-lang-level">Intermédiaire</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </>
  );
}
