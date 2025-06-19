"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import useFetch from "@/hook/useFetch";

import Link from "next/link";
import "@/public/assets/css/clickable.css";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const TriCategorie = ({ id, setId }: Props) => {
  interface Categorie {
    id: number;
    nom_categorie: string;
  }

  interface Proprietaire {
    id: number;
    nom: string;
    photo_profil: string;
  }

  interface Travaux {
    id: number;
    titre_projet: string;
    categorie_projet: Categorie[];
    date_debut: string;
    image_projet: string;
    proprietaire: Proprietaire[];
  }

  const { data, error, loading } = useFetch(`projet/categorie/projet/${id}/`);
  const [triCategorie, setTriCategorie] = useState<Travaux[]>([]);

  useEffect(() => {
    setId(id);
    if (data) {
      setTriCategorie(data);
    }
  }, [id, setId, data]);

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  return (
    <>
      {triCategorie
        .sort(
          (a, b) =>
            new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()
        )
        .map((projet) => (
          <div className="col-lg-6" key={projet.id}>
            <article>
              <div className="post-img">
                <Image
                  width={5000}
                  height={5000}
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${projet.image_projet}`}
                  alt=""
                  className="img-fluid"
                  priority
                />
              </div>
              {(Array.isArray(projet.categorie_projet)
                ? projet.categorie_projet
                : projet.categorie_projet
                ? [projet.categorie_projet]
                : []
              ).map((cat) => (
                <p className="post-category" key={cat.id}>
                  {cat.nom_categorie}
                </p>
              ))}
              <h2 className="title">
                <Link href={`projet/${projet.id}`}>{projet.titre_projet}</Link>
              </h2>

              {(Array.isArray(projet.proprietaire)
                ? projet.proprietaire
                : projet.proprietaire
                ? [projet.proprietaire]
                : []
              ).map((owner) => (
                <div className="d-flex align-items-center" key={owner.id}>
                  <Image
                    width={5000}
                    height={5000}
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${owner.photo_profil}`}
                    alt=""
                    className="img-fluid post-author-img flex-shrink-0"
                  />

                  <div className="post-meta">
                    <p className="post-author">{owner.nom}</p>
                    <p className="post-date">
                      <time dateTime="2022-01-01">{projet.date_debut}</time>
                    </p>
                  </div>
                </div>
              ))}
            </article>
          </div>
        ))}
    </>
  );
}

const ListCategorie = ({ isVisible, setIsVisible, setId }: Props) => {
  interface Category {
    id: number;
    nom_categorie: string;
    nombre_projets: number;
  }

  const { data, error, loading } = useFetch("projet/categorie/list");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  const changeVisible = (e: boolean, pk: number) => {
    setIsVisible(e);
    setId(pk);
  };

  return (
    <>
      <div className="categories-widget widget-item">
        <h3 className="widget-title">Categories</h3>
        {categories.slice(0, 3).map((cat) => (
          <ul className="mt-3" key={cat.id}>
            <li>
              <span
                className="surlignable"
                onClick={() => changeVisible(isVisible, cat.id)}
              >
                {cat.nom_categorie}{" "}
                <span>
                  <strong>({cat.nombre_projets})</strong>
                </span>
              </span>
            </li>
          </ul>
        ))}
        <ul className="mt-3">
          <li>
            <span
              className="surlignable"
              onClick={() => changeVisible(!isVisible, 0)}
            >
              Tout
              <span>
                <strong></strong>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
const ListTravaux = () => {
  interface Categorie {
    id: number;
    nom_categorie: string;
  }

  interface Proprietaire {
    id: number;
    nom: string;
    photo_profil: string;
  }

  interface Travaux {
    id: number;
    titre_projet: string;
    categorie_projet: Categorie[];
    date_debut: string;
    image_projet: string;
    proprietaire: Proprietaire[];
  }

  const { data, error, loading } = useFetch("projet/list/")
  const [projets, setProjets] = useState<Travaux[]>([]);

  useEffect(() => {
    if (data){
      setProjets(data)
    }
  }, [data]);

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  return (
    <>
      {projets
        .sort(
          (a, b) =>
            new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()
        )
        .map((projet) => (
          <div className="col-lg-6" key={projet.id}>
            <article>
              <div className="post-img">
                <Image
                  width={5000}
                  height={5000}
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${projet.image_projet}`}
                  alt=""
                  className="img-fluid"
                  priority
                />
              </div>
              {(Array.isArray(projet.categorie_projet)
                ? projet.categorie_projet
                : projet.categorie_projet
                ? [projet.categorie_projet]
                : []
              ).map((cat) => (
                <p className="post-category" key={cat.id}>
                  {cat.nom_categorie}
                </p>
              ))}
              <h2 className="title">
                <Link href={`projet/${projet.id}`}>{projet.titre_projet}</Link>
              </h2>

              {(Array.isArray(projet.proprietaire)
                ? projet.proprietaire
                : projet.proprietaire
                ? [projet.proprietaire]
                : []
              ).map((owner) => (
                <div className="d-flex align-items-center" key={owner.id}>
                  <Image
                    width={5000}
                    height={5000}
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${owner.photo_profil}`}
                    alt=""
                    className="img-fluid post-author-img flex-shrink-0"
                  />

                  <div className="post-meta">
                    <p className="post-author">{owner.nom}</p>
                    <p className="post-date">
                      <time dateTime="2022-01-01">{projet.date_debut}</time>
                    </p>
                  </div>
                </div>
              ))}
            </article>
          </div>
        ))}
    </>
  );
}
export default function Projets({}) {
  const [isVisible, setIsVisible] = useState(true);
  const [id, setId] = useState(0);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title position-relative">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="bi bi-house" /> Acceuil
                </Link>
              </li>
              <li className="breadcrumb-item active current">Travaux</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>Catalogue des travaux réalisés</h1>
          <p>
            Parcourez mes travaux pour voir comment j’applique mes compétences
            et transforme les idées en résultats tangibles.
          </p>
        </div>
      </div>
      {/* End Page Title */}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Category Postst Section */}
            <section id="category-postst" className="category-postst section">
              <div
                className="container"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="row gy-4">
                  {/* End post list item */}

                  {isVisible ? (
                    <ListTravaux></ListTravaux>
                  ) : (
                    <TriCategorie
                      id={id}
                      setId={setId}
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                    ></TriCategorie>
                    // <p>Bonjour</p>
                  )}
                  {/* End post list item */}
                </div>
              </div>
            </section>
            {/* /Category Postst Section */}
          </div>
          <div className="col-lg-4 sidebar">
            <div
              className="widgets-container"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Search Widget */}
              {/* <div className="search-widget widget-item">
                <h3 className="widget-title">Recherchez</h3>
                <form action="">
                  <input type="text" />
                  <button type="submit" title="Search">
                    <i className="bi bi-search" />
                  </button>
                </form>
              </div> */}
              {/*/Search Widget */}
              {/* Categories Widget */}
              <ListCategorie
                isVisible={false}
                setIsVisible={setIsVisible}
                id={id}
                setId={setId}
              ></ListCategorie>
              {/*/Categories Widget */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
