"use client";

import Image from "next/image";
import Link from "next/link";
// import "@/public/assets/css/visuel.css"
import { useState, useEffect } from "react";
import useFetch from "@/hook/useFetch";

import '@/public/assets/css/modal.css'
export default function Visuel() {
  interface Crea {
    id: number;
    titre_visuel: string;
    image_visuel: string;
    date_creation: string;
  }

  const { data, error, loading } = useFetch("projet/visuel/list/")
  const [visuels, setVisuels] = useState<Crea[]>([]);
  const [selectedImage, setSelectedImage] = useState<Crea | null>(null);

  useEffect(() => {
    if (data){
      setVisuels(data)
    }
  }, [data]);

  if (loading) return <div id="preloader"></div>;
  if (error) return <p className="text-red-500">Erreur : {String(error)}</p>;

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title">
          <div className="breadcrumbs">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="bi bi-house" /> Acceuil
                  </Link>
                </li>
                <li className="breadcrumb-item active current">Mes visuels</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* End Page Title */}
        <section id="blog-hero" className="blog-hero section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="blog-grid">
              {visuels
                .sort(
                  (a, b) =>
                    new Date(b.date_creation).getTime() -
                    new Date(a.date_creation).getTime()
                )
                .map((crea) => (
                  <article
                    key={crea.id}
                    className="blog-item"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    onClick={() => setSelectedImage(crea)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${crea.image_visuel}`}
                      alt={crea.titre_visuel}
                      priority
                      className="img-fluid"
                      style={{
                        width: "500px",
                        height: "400px",
                      }}
                    />
                    <div className="blog-content">
                      <div className="post-meta">
                        <span
                          className="category"
                          style={{ textTransform: "uppercase" }}
                        >
                          {crea.titre_visuel}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <div>
          {/* MODAL */}
          {selectedImage && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedImage(null)} // Ferme le modal au clic sur fond
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${selectedImage.image_visuel}`}
                  alt={selectedImage.titre_visuel}
                  width={1000}
                  height={1000}
                  style={{ width: "auto", height: "auto" }}
                />
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  {selectedImage.titre_visuel}
                </p>
                <button
                  className="modal-close"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
