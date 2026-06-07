"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hook/useFetch";

interface Categorie    { id: number; nom_categorie: string; }
interface Proprietaire { id: number; nom: string; photo_profil: string; }
interface Projet {
  id: number;
  titre_projet: string;
  categorie_projet: Categorie[];
  date_debut: string;
  image_projet: string;
  proprietaire: Proprietaire[];
}
interface Category { id: number; nom_categorie: string; nombre_projets: number; }

function toArray<T>(val: T | T[]): T[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

/* ── Carte projet ── */
function ProjetCard({ projet, delay = 0 }: { projet: Projet; delay?: number }) {
  const cats   = toArray(projet.categorie_projet);
  const owners = toArray(projet.proprietaire);

  return (
    <article
      className="project-list-card"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="project-list-card-img">
        <Image
          width={600}
          height={340}
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${projet.image_projet}`}
          alt={projet.titre_projet}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="project-list-img-overlay">
          <Link href={`/projet/${projet.id}`} className="project-list-overlay-btn" aria-label={`Voir ${projet.titre_projet}`}>
            <i className="bi bi-arrow-right-circle" aria-hidden="true" />
            Voir le projet
          </Link>
        </div>
      </div>

      <div className="project-list-card-body">
        <div className="project-card-cats-row">
          {cats.map((c, ci) => (
            <span className="category-tag" key={c.id ?? `cat-${ci}`}>{c.nom_categorie}</span>
          ))}
        </div>

        <h2 className="project-list-title">
          <Link href={`/projet/${projet.id}`}>{projet.titre_projet}</Link>
        </h2>

        {owners.map((owner, oi) => (
          <div className="project-owner-row" key={owner.id ?? `owner-${oi}`}>
            <Image
              width={34}
              height={34}
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${owner.photo_profil}`}
              alt={owner.nom}
              className="owner-avatar"
            />
            <div>
              <div className="owner-info-text">{owner.nom}</div>
              <div className="owner-date">
                <i className="bi bi-calendar3 owner-date-icon" aria-hidden="true" />
                {projet.date_debut}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ── Grille de projets ── */
function ProjetGrid({ url }: { url: string }) {
  const { data, loading, error } = useFetch(url);
  const [projets, setProjets] = useState<Projet[]>([]);

  useEffect(() => { if (data) setProjets(data as Projet[]); }, [data]);

  const sorted = useMemo(
    () => [...projets].sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()),
    [projets]
  );

  if (loading)
    return (
      <div className="loading-box" style={{ minHeight: "300px" }}>
        <div className="loading-spinner" />
        Chargement…
      </div>
    );
  if (error)
    return (
      <div className="error-box">
        <i className="bi bi-exclamation-triangle" aria-hidden="true" /> {String(error)}
      </div>
    );
  if (sorted.length === 0)
    return (
      <div className="empty-state">
        <i className="bi bi-folder2" aria-hidden="true" />
        <p>Aucun projet dans cette catégorie.</p>
      </div>
    );

  return (
    <div className="projects-main-grid" role="list">
      {sorted.map((p, i) => (
        <ProjetCard key={p.id} projet={p} delay={Math.min(i * 60, 300)} />
      ))}
    </div>
  );
}

/* ── Sidebar filtres ── */
function CategoriesSidebar({
  activeCatId,
  onSelect,
}: {
  activeCatId: number | null;
  onSelect: (id: number | null) => void;
}) {
  const { data, loading, error } = useFetch("projet/categorie/list");
  const [cats, setCats] = useState<Category[]>([]);

  const HIDDEN_CATEGORIES = ["conception graphique", "graphisme"];

  useEffect(() => {
    if (data) {
      const all = data as Category[];
      setCats(all.filter((c) => !HIDDEN_CATEGORIES.includes(c.nom_categorie.toLowerCase())));
    }
  }, [data]);

  if (loading)
    return (
      <div className="sidebar-card">
        <div className="loading-box" style={{ padding: "1.5rem" }}>
          <div className="loading-spinner" />
        </div>
      </div>
    );
  if (error) return null;

  const total = cats.reduce((sum, c) => sum + c.nombre_projets, 0);

  return (
    <aside className="sidebar-card" data-aos="fade-left" aria-label="Filtrer par catégorie">
      <h3 className="sidebar-title">
        <i className="bi bi-funnel" aria-hidden="true" />
        Filtrer
      </h3>

      <button
        className={`filter-item ${activeCatId === null ? "active" : ""}`}
        onClick={() => onSelect(null)}
        aria-pressed={activeCatId === null}
      >
        <span>Tous les projets</span>
        <span className="filter-count">{total}</span>
      </button>

      {cats.map((cat) => (
        <button
          key={cat.id}
          className={`filter-item ${activeCatId === cat.id ? "active" : ""}`}
          onClick={() => onSelect(cat.id)}
          aria-pressed={activeCatId === cat.id}
        >
          <span>{cat.nom_categorie}</span>
          <span className="filter-count">{cat.nombre_projets}</span>
        </button>
      ))}
    </aside>
  );
}

/* ── Page principale ── */
export default function ProjetsPage() {
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [activeName, setActiveName]   = useState<string>("Tous les projets");

  const handleSelect = (id: number | null, name = "Tous les projets") => {
    setActiveCatId(id);
    setActiveName(name);
  };

  const apiUrl = activeCatId === null
    ? "projet/list/"
    : `projet/categorie/projet/${activeCatId}/`;

  return (
    <main className="main" id="main-content">
      <div className="page-title">
        <div className="container">
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" aria-hidden="true" /> Accueil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Mes travaux</li>
            </ol>
          </nav>
          <div className="title-wrapper">
            <h1>Catalogue des réalisations</h1>
            <p>
              Parcourez les travaux pour voir comment j&apos;applique mes compétences
              et transforme les idées en résultats tangibles.
            </p>
          </div>
        </div>
      </div>

      <div className="container section-pb">
        {/* Indicateur de filtre actif */}
        <div className="active-filter-bar" data-aos="fade-up">
          <span className="active-filter-label">
            <i className="bi bi-funnel-fill" aria-hidden="true" />
            {activeName}
          </span>
          {activeCatId !== null && (
            <button
              className="active-filter-clear"
              onClick={() => handleSelect(null)}
              aria-label="Supprimer le filtre"
            >
              <i className="bi bi-x" aria-hidden="true" />
              Tout afficher
            </button>
          )}
        </div>

        <div className="projects-layout">
          {/* Grille */}
          <div data-aos="fade-up">
            <ProjetGrid url={apiUrl} />
          </div>

          {/* Sidebar */}
          <CategoriesSidebar
            activeCatId={activeCatId}
            onSelect={(id) => {
              const name = id === null ? "Tous les projets" : undefined;
              handleSelect(id, name);
            }}
          />
        </div>
      </div>
    </main>
  );
}
