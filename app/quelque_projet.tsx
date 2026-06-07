"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useFetch from "@/hook/useFetch";

interface Categorie {
  id: number;
  nom_categorie: string;
}

interface Projet {
  id: number;
  titre_projet: string;
  categorie_projet: Categorie[];
  date_debut: string;
  image_projet: string;
}

export default function QuelqueProjets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const { data, loading, error } = useFetch("projet/list/");

  useEffect(() => {
    if (data) setProjets(data as Projet[]);
  }, [data]);

  if (loading)
    return (
      <div className="loading-box">
        <div className="loading-spinner" />
        Chargement des projets…
      </div>
    );
  if (error)
    return (
      <div className="error-box">
        <i className="bi bi-exclamation-triangle" />
        Erreur : {String(error)}
      </div>
    );

  const sorted = [...projets]
    .sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime())
    .slice(0, 6);

  return (
    <section
      className="projects-section"
      style={{ background: "rgba(13,13,32,0.35)", borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <p>Portfolio</p>
          <h2>Quelques réalisations</h2>
        </div>

        <div className="projects-grid-home">
          {sorted.map((post, i) => {
            const cats = Array.isArray(post.categorie_projet)
              ? post.categorie_projet
              : post.categorie_projet
              ? [post.categorie_projet]
              : [];

            return (
              <div
                className="project-card"
                key={post.id}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                data-aos-duration="600"
              >
                {/* Image + overlay au hover */}
                <div className="project-card-img">
                  <Image
                    width={600}
                    height={400}
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${post.image_projet}`}
                    alt={post.titre_projet}
                    loading="lazy"
                  />
                  <div className="project-card-overlay">
                    <Link href={`/projet/${post.id}`} className="project-overlay-btn">
                      <i className="bi bi-arrow-right-circle" />
                      Voir le projet
                    </Link>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="project-card-body">
                  <div className="project-card-cats">
                    {cats.map((c, ci) => (
                      <span className="category-tag" key={c.id ?? `cat-${ci}`}>{c.nom_categorie}</span>
                    ))}
                  </div>
                  <p className="project-card-title">
                    <Link href={`/projet/${post.id}`}>{post.titre_projet}</Link>
                  </p>
                  <div className="project-card-footer-row">
                    <span className="project-card-date">
                      <i className="bi bi-calendar3" />
                      {post.date_debut}
                    </span>
                    <Link href={`/projet/${post.id}`} className="project-card-arrow" aria-label="Voir">
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>

                {/* Ligne de lueur animée en bas */}
                <div className="project-card-glow-line" />
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }} data-aos="fade-up">
          <Link href="/projet" className="view-all-link">
            Voir tous les projets
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
