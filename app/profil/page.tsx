import type { Metadata } from "next";
import Link from "next/link";
import AuthorInfo from "./authorInfo";
import AuthorContent from "./authorContent";
import AuthorExperiences from "./authorExperiences";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  title: "Mon Profil — Ingénieur Logiciel & Développeur Full-Stack",
  description:
    "Découvrez le profil de Diomande Droh Martial : ingénieur logiciel, développeur Full-Stack (React, Next.js, Python, Django), intégrateur IA, infographe et monteur vidéo. +3 ans d'expérience, +30 projets livrés.",
  alternates: { canonical: `${SITE_URL}/profil` },
  openGraph: {
    url: `${SITE_URL}/profil`,
    title: "Profil — Diomande Droh Martial, Ingénieur Logiciel Full-Stack",
    description:
      "Compétences, expérience et projets de Diomande Droh Martial. React, Next.js, Python, Django, IA et bien plus.",
  },
};

export default function ProfilPage() {
  return (
    <main className="main">
      <div className="page-title">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" /> Accueil</Link>
              </li>
              <li className="breadcrumb-item active">Mon profil</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Section héro : photo + bio + contact ── */}
      <section className="profil-hero-section">
        <div className="container">
          <AuthorInfo />
        </div>
      </section>

      {/* ── Grande carte skills / biographie ── */}
      <section className="profil-card-section">
        <div className="container">
          <AuthorContent />
        </div>
      </section>

      {/* ── Section expériences ── */}
      <div className="container">
        <AuthorExperiences />
      </div>
    </main>
  );
}
