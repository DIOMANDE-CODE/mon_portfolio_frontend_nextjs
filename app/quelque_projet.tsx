"use client";

import Image from "next/image";
import useFetch from "@/hook/useFetch";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function QuelqueProjets() {
  interface Categorie {
    id: number;
    nom_categorie: string;
  }

  interface quelque_projet {
    id: number;
    titre_projet: string;
    categorie_projet: Categorie[];
    date_debut: string;
    image_projet: string;
  }

  const [projets, setProjets] = useState<quelque_projet[]>([]);

  const { data, loading, error } = useFetch("projet/list/");

  useEffect(() => {
    if (data) {
      setProjets(data);
    }
  }, [data]);

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  return (
    <>
      {/* Category Section Section */}
      <section id="category-section" className="category-section section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>travaux</h2>
          <div>
            {" "}
            <span className="description-title">Quelques travaux réalisés</span>
          </div>
        </div>
        {/* End Section Title */}
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          {/* List Posts */}
          <div className="row">
            {projets
              .sort(
                (a, b) =>
                  new Date(b.date_debut).getTime() -
                  new Date(a.date_debut).getTime()
              )
              .slice(0, 6)
              .map((post) => (
                <div className="col-xl-4 col-lg-6" key={post.id}>
                  <article className="list-post">
                    <div className="post-img">
                      <Image
                        width={5000}
                        height={5000}
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${post.image_projet}`}
                        alt=""
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <div className="post-content">
                      <div className="category-meta">
                        {(Array.isArray(post.categorie_projet)
                          ? post.categorie_projet
                          : post.categorie_projet
                          ? [post.categorie_projet]
                          : []
                        ).map((cat) => (
                          <span className="post-category" key={cat.id}>
                            {cat.nom_categorie}
                          </span>
                        ))}
                      </div>
                      <h3 className="title">
                        <Link href={`projet/${post.id}`}>
                          {post.titre_projet}
                        </Link>
                      </h3>
                      <div className="post-meta">
                        <span className="post-date">{post.date_debut}</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
