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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="project-list-img-overlay">
          <Link
            href={`/projet/${projet.id}`}
            className="project-list-overlay-btn"
            aria-label={`Voir ${projet.titre_projet}`}
          >
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

/* ── Barre de filtres horizontale ── */
const HIDDEN_CATEGORIES = ["conception graphique", "graphisme"];

function CategoriesFilterBar({
  activeCatId,
  activeName,
  onSelect,
}: {
  activeCatId: number | null;
  activeName: string;
  onSelect: (id: number | null, name: string) => void;
}) {
  const { data, loading } = useFetch("projet/categorie/list");
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      const all = data as Category[];
      setCats(all.filter((c) => !HIDDEN_CATEGORIES.includes(c.nom_categorie.toLowerCase())));
    }
  }, [data]);

  const total = cats.reduce((sum, c) => sum + c.nombre_projets, 0);

  return (
    <div className="proj-filter-section" data-aos="fade-up">
      <div className="proj-filter-bar" role="group" aria-label="Filtrer par catégorie">

        {/* Filtre "Tous" */}
        <button
          className={`proj-filter-btn${activeCatId === null ? " active" : ""}`}
          onClick={() => onSelect(null, "Tous les projets")}
          aria-pressed={activeCatId === null}
        >
          <i className="bi bi-grid-fill" aria-hidden="true" />
          <span>Tous</span>
          {!loading && <span className="proj-filter-count">{total}</span>}
        </button>

        {/* Skeleton pendant le chargement */}
        {loading && (
          <>
            {[80, 110, 90, 100].map((w, i) => (
              <div key={i} className="proj-filter-skeleton" style={{ width: w }} />
            ))}
          </>
        )}

        {/* Catégories */}
        {cats.map((cat) => (
          <button
            key={cat.id}
            className={`proj-filter-btn${activeCatId === cat.id ? " active" : ""}`}
            onClick={() => onSelect(cat.id, cat.nom_categorie)}
            aria-pressed={activeCatId === cat.id}
          >
            <span>{cat.nom_categorie}</span>
            <span className="proj-filter-count">{cat.nombre_projets}</span>
          </button>
        ))}
      </div>

      {/* Indicateur du filtre actif */}
      {activeCatId !== null && (
        <div className="proj-active-filter">
          <i className="bi bi-funnel-fill" aria-hidden="true" />
          <span>{activeName}</span>
          <button
            className="proj-clear-btn"
            onClick={() => onSelect(null, "Tous les projets")}
            aria-label="Supprimer le filtre"
          >
            <i className="bi bi-x" aria-hidden="true" />
            Tout afficher
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Page principale ── */
export default function ProjetsPage() {
  const [activeCatId,  setActiveCatId]  = useState<number | null>(null);
  const [activeName,   setActiveName]   = useState("Tous les projets");

  const handleSelect = (id: number | null, name: string) => {
    setActiveCatId(id);
    setActiveName(name);
  };

  const apiUrl = activeCatId === null
    ? "projet/list/"
    : `projet/categorie/projet/${activeCatId}/`;

  return (
    <main className="main" id="main-content">

      {/* ── Header de page ── */}
      <div className="page-title">
        <div className="container">
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" /> Accueil</Link>
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

        {/* ── Barre de filtres (au-dessus des projets) ── */}
        <CategoriesFilterBar
          activeCatId={activeCatId}
          activeName={activeName}
          onSelect={handleSelect}
        />

        {/* ── Grille de projets ── */}
        <div data-aos="fade-up">
          <ProjetGrid url={apiUrl} />
        </div>

      </div>
    </main>
  );
}
