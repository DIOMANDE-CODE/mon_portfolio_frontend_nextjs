import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { formatPeriodeFR, formatDateFR } from "@/utils/dateUtils";

type Tech = { id: number; nom_technologie: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomande-droh-martial.vercel.app";
const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "https://res.cloudinary.com/darkqhocp/";

async function getProjet(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}projet/detail/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  return res.json();
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  try {
    const { id } = await props.params;
    const detail = await getProjet(id);

    const title = detail.titre_projet as string;
    const rawDesc = (detail.description_projet as string) ?? "";
    const description = rawDesc.replace(/\n+/g, " ").substring(0, 160);
    const imageUrl = `${CLOUD_URL}${detail.image_projet}`;
    const categories: { nom_categorie: string }[] = Array.isArray(detail.categorie_projet)
      ? detail.categorie_projet
      : [detail.categorie_projet];
    const techs: Tech[] = detail.technologie ?? [];
    const techNames = techs.map((t) => t.nom_technologie).join(", ");

    return {
      title,
      description,
      keywords: [
        title,
        "Diomande Droh Martial",
        ...categories.map((c) => c.nom_categorie),
        ...techs.map((t) => t.nom_technologie),
        "projet développeur", "portfolio",
      ],
      alternates: { canonical: `${SITE_URL}/projet/${id}` },
      openGraph: {
        type: "article",
        url: `${SITE_URL}/projet/${id}`,
        title: `${title} — Projet de Diomande Droh Martial`,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        authors: ["Diomande Droh Martial"],
        publishedTime: detail.date_creation,
        tags: techs.map((t) => t.nom_technologie),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} — Diomande Droh Martial`,
        description,
        images: [imageUrl],
      },
      other: {
        "article:author": "Diomande Droh Martial",
        "article:section": categories[0]?.nom_categorie ?? "Développement",
        "article:tag": techNames,
      },
    };
  } catch {
    return {
      title: "Détail du projet — Diomande Droh Martial",
      description: "Découvrez ce projet réalisé par Diomande Droh Martial, développeur Full-Stack.",
    };
  }
}

export default function DetailProjet(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const detail = use(getProjet(id));

  const categories = Array.isArray(detail.categorie_projet) ? detail.categorie_projet : [detail.categorie_projet];
  const proprietaires = Array.isArray(detail.proprietaire) ? detail.proprietaire : [detail.proprietaire];
  const technologies: Tech[] = detail.technologie ?? [];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": detail.titre_projet,
    "description": (detail.description_projet as string)?.replace(/\n+/g, " ").substring(0, 300),
    "url": `${SITE_URL}/projet/${id}`,
    "image": `${CLOUD_URL}${detail.image_projet}`,
    "dateCreated": detail.date_creation,
    "author": {
      "@type": "Person",
      "name": "Diomande Droh Martial",
      "url": SITE_URL,
    },
    "creator": {
      "@type": "Person",
      "name": "Diomande Droh Martial",
    },
    "genre": categories.map((c: { nom_categorie: string }) => c.nom_categorie).join(", "),
    "keywords": technologies.map((t) => t.nom_technologie).join(", "),
  };

  return (
    <main className="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="page-title">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" /> Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/projet">Mes travaux</Link>
              </li>
              <li className="breadcrumb-item active">Détail</li>
            </ol>
          </nav>
          <div className="title-wrapper" style={{ position: "relative", zIndex: 1 }}>
            <h1>Détail du projet</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "4rem" }}>
        <div className="row">
          <div className="col-lg-10">
            {/* Image hero */}
            <div className="detail-hero-img" data-aos="zoom-in">
              <Image
                width={1200}
                height={600}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${detail.image_projet}`}
                alt={detail.titre_projet}
                priority
              />
              {detail.lien_drive && (
                <div className="detail-hero-overlay">
                  <a href={detail.lien_drive} target="_blank" rel="noreferrer" className="view-content-btn">
                    <i className="bi bi-play-circle" />
                    Voir le contenu
                  </a>
                </div>
              )}
            </div>

            {/* Article */}
            <div className="detail-article" data-aos="fade-up" data-aos-delay="100">
              {/* Catégories */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                {categories.map((cat: { id: number; nom_categorie: string }) => (
                  <span className="category-tag" key={cat.id}>{cat.nom_categorie}</span>
                ))}
              </div>

              <h1 className="detail-title">{detail.titre_projet}</h1>

              {/* Meta auteur */}
              <div className="detail-meta-row">
                {proprietaires.map((p: { id: number; photo_profil: string; nom: string; fonctions: string }, pi: number) => (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} key={p.id ?? `owner-${pi}`}>
                    <Image
                      width={44}
                      height={44}
                      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${p.photo_profil}`}
                      alt={p.nom}
                      className="detail-author-img"
                    />
                    <div>
                      <div className="detail-author-name">{p.nom}</div>
                      <div className="detail-author-role">{p.fonctions}</div>
                    </div>
                  </div>
                ))}
                <div className="detail-date">
                  <i className="bi bi-calendar3" />
                  {detail.date_debut
                    ? formatPeriodeFR(detail.date_debut, detail.date_fin, true)
                    : formatDateFR(detail.date_creation, true)}
                </div>
              </div>

              {/* Description */}
              <div className="detail-content">
                {detail.description_projet
                  .split("\n")
                  .map((para: string, i: number) =>
                    para.trim() ? <p key={i}>{para}</p> : null
                  )}
              </div>

              {/* Technologies */}
              {technologies.length > 0 && (
                <div className="detail-meta-block">
                  <h4><i className="bi bi-cpu" style={{ marginRight: "0.4rem", color: "var(--accent-cyan)" }} />Technologies &amp; Outils utilisés</h4>
                  <div className="tags-row">
                    {technologies.map((tech) => (
                      <span className="tech-tag" key={tech.id}>{tech.nom_technologie}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ressources */}
              {(detail.lien_github || detail.lien_drive || detail.lien_projet || detail.lien_facebook || detail.lien_instagram) && (
                <div className="detail-meta-block">
                  <h4><i className="bi bi-link-45deg" style={{ marginRight: "0.4rem", color: "var(--accent-purple)" }} />Ressources</h4>
                  <div className="resource-links">
                    {detail.lien_github && (
                      <a href={detail.lien_github} target="_blank" rel="noreferrer" className="resource-link">
                        <i className="bi bi-github" /> GitHub
                      </a>
                    )}
                    {detail.lien_drive && (
                      <a href={detail.lien_drive} target="_blank" rel="noreferrer" className="resource-link">
                        <i className="bi bi-folder" /> Drive
                      </a>
                    )}
                    {detail.lien_projet && (
                      <a href={detail.lien_projet} target="_blank" rel="noreferrer" className="resource-link">
                        <i className="bi bi-globe" /> Voir le projet
                      </a>
                    )}
                    {detail.lien_facebook && (
                      <a href={detail.lien_facebook} target="_blank" rel="noreferrer" className="resource-link">
                        <i className="bi bi-facebook" /> Facebook
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
