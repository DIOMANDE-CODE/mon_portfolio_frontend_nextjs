import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";

type Tech = { id: number; nom_technologie: string };

async function getProjet(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}projet/detail/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  return res.json();
}

export default function DetailProjet(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const detail = use(getProjet(id));

  const categories = Array.isArray(detail.categorie_projet) ? detail.categorie_projet : [detail.categorie_projet];
  const proprietaires = Array.isArray(detail.proprietaire) ? detail.proprietaire : [detail.proprietaire];
  const technologies: Tech[] = detail.technologie ?? [];

  return (
    <main className="main">
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
                  {new Date(detail.date_creation).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
