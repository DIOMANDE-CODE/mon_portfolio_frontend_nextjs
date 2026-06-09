"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "@/hook/useFetch";

interface AuthorInfo {
  id: number;
  photo_profil: string;
  nom: string;
  fonctions: string;
  slogan: string;
  nombre_projet: number;
  nombre_recompense: number;
  lien_facebook: string;
  lien_instagram: string;
  lien_linkedin: string;
  lien_twitter: string;
  lien_github: string;
}

export default function AuthorInfo() {
  const { data, error, loading } = useFetch("users/list/");
  const [authors, setAuthors] = useState<AuthorInfo[]>([]);

  useEffect(() => {
    if (data) setAuthors(data as AuthorInfo[]);
  }, [data]);

  if (loading)
    return (
      <div className="profil-hero-loading">
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
      {authors.map((author, i) => (
        <div className="profil-hero-inner" key={author.id ?? i}>

          {/* ── Gauche : texte, contact, social ── */}
          <div className="profil-hero-content" data-aos="fade-right" data-aos-duration="800">

            <div className="profil-about-tag">À PROPOS DE MOI</div>

            <h1 className="profil-big-title">
              {author.nom.split(" ")[0]}<br />
              <span className="gradient-text">
                {author.nom.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="profil-function-badge">
              <i className="bi bi-code-slash" />
              {author.fonctions}
            </p>

            <blockquote className="profil-slogan">
              <i className="bi bi-quote" />
              {author.slogan}
            </blockquote>

            {/* Contact */}
            <div className="profil-contact-section">
              <h3 className="profil-section-heading">Contact</h3>
              <div className="profil-contact-grid">
                <div className="profil-contact-item">
                  <span className="profil-contact-icon">
                    <i className="bi bi-envelope-fill" />
                  </span>
                  <span>diomandedroh79@gmail.com</span>
                </div>
                <div className="profil-contact-item">
                  <span className="profil-contact-icon">
                    <i className="bi bi-whatsapp" />
                  </span>
                  <span>+225 05 95 03 16 94</span>
                </div>
                {/* {author.lien_linkedin && (
                  <div className="profil-contact-item">
                    <span className="profil-contact-icon">
                      <i className="bi bi-linkedin" />
                    </span>
                    <a
                      href={author.lien_linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      linkedin.com/in/droh
                    </a>
                  </div>
                )} */}
                {/* {author.lien_github && (
                  <div className="profil-contact-item">
                    <span className="profil-contact-icon">
                      <i className="bi bi-github" />
                    </span>
                    <a
                      href={author.lien_github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      github.com/droh
                    </a>
                  </div>
                )} */}
              </div>
            </div>

            {/* Social */}
            <div className="social-icons-row" style={{ marginTop: "1.75rem" }}>
              {author.lien_github && (
                <Link href={author.lien_github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
                  <i className="bi bi-github" />
                </Link>
              )}
              <Link
                href={author.lien_linkedin || "https://linkedin.com/in/diomande-droh-martial-a48005244"}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin" />
              </Link>
              {author.lien_instagram && (
                <Link href={author.lien_instagram} target="_blank" rel="noreferrer" className="social-icon-btn" title="Instagram">
                  <i className="bi bi-instagram" />
                </Link>
              )}
              {author.lien_twitter && (
                <Link href={author.lien_twitter} target="_blank" rel="noreferrer" className="social-icon-btn" title="Twitter / X">
                  <i className="bi bi-twitter-x" />
                </Link>
              )}
            </div>
          </div>

          {/* ── Droite : photo cadrée ── */}
          <div
            className="profil-photo-wrapper"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="150"
          >
            {/* Badge flottant haut-droite */}
            <div className="profil-stat-badge top-right">
              <span className="profil-stat-num">+{author.nombre_projet}</span>
              <span className="profil-stat-lbl">Projets</span>
            </div>

            {/* Badge flottant bas-gauche */}
            <div className="profil-stat-badge bottom-left">
              <span className="profil-stat-num">{author.nombre_recompense}</span>
              <span className="profil-stat-lbl">Récompense</span>
            </div>

            {/* Photo portrait */}
            <div className="profil-photo-frame">
              <Image
                width={400}
                height={540}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${author.photo_profil}`}
                alt={author.nom}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 8%",
                }}
              />
              <div className="profil-photo-glow" />
            </div>

            {/* Anneaux décoratifs */}
            <div className="profil-deco-ring" />
            <div className="profil-deco-ring-2" />
          </div>

        </div>
      ))}
    </>
  );
}
