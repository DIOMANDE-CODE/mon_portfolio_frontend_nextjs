"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import useFetch from "@/hook/useFetch";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Crea {
  id: number;
  titre_visuel: string;
  image_visuel: string;
  date_creation: string;
}

const CLOUDINARY = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL ?? "";

/* ── Image avec skeleton shimmer ── */
function LazyImg({
  src, alt, width, height, sizes,
}: {
  src: string; alt: string; width: number; height: number; sizes?: string;
}) {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <div className="visuel-img-skeleton" aria-hidden="true" />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        sizes={sizes}
        onLoad={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.45s ease" }}
      />
    </>
  );
}

export default function Visuel() {
  const { data, error, loading } = useFetch("projet/visuel/list/");
  const [visuels,    setVisuels]    = useState<Crea[]>([]);
  const [selected,   setSelected]   = useState<Crea | null>(null);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [modalReady, setModalReady] = useState(false);

  useEffect(() => {
    if (data) setVisuels(data as Crea[]);
  }, [data]);

  /* Réinitialise le loader à chaque changement d'image dans la modale */
  useEffect(() => {
    if (selected) setModalReady(false);
  }, [selected?.id]);

  const closeModal = useCallback(() => setSelected(null), []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [closeModal]);

  if (loading)
    return (
      <main className="main">
        <div className="loading-box" style={{ minHeight: "60vh" }}>
          <div className="loading-spinner" />
          Chargement des créations…
        </div>
      </main>
    );

  if (error)
    return (
      <main className="main">
        <div className="error-box">
          <i className="bi bi-exclamation-triangle" /> {String(error)}
        </div>
      </main>
    );

  const sorted = [...visuels].sort(
    (a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime()
  );

  return (
    <>
      <main className="main visuel-page">

        {/* ── PAGE HEADER ── */}
        <div className="visuel-hero">
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/"><i className="bi bi-house" /> Accueil</Link>
                </li>
                <li className="breadcrumb-item active">Mes visuels</li>
              </ol>
            </nav>

            <div style={{ textAlign: "center", padding: "2.5rem 0 1rem" }}>
              <span className="visuel-hero-label">Créations visuelles</span>
              <h1 className="visuel-hero-title">
                Mon <span className="gradient-text">Portfolio</span> Créatif
              </h1>
              <p className="visuel-hero-subtitle">Infographie · Communication visuelle</p>
              <div className="visuel-hero-count">
                <i className="bi bi-images" />
                {sorted.length} création{sorted.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* ── COVERFLOW 3D ── */}
        {sorted.length > 0 && (
          <section className="visuel-coverflow-section">
            <div className="visuel-active-title" data-aos="fade-up">
              {sorted[activeIdx]?.titre_visuel}
            </div>

            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop={sorted.length > 3}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
              coverflowEffect={{ rotate: 38, stretch: -30, depth: 220, modifier: 1.1, slideShadows: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation
              onSlideChange={(sw: SwiperType) => setActiveIdx(sw.realIndex)}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Keyboard]}
              className="visuel-swiper"
            >
              {sorted.map((crea) => (
                <SwiperSlide key={crea.id} className="visuel-slide">
                  <div className="visuel-card" onClick={() => setSelected(crea)}>
                    <div className="visuel-card-img">
                      <LazyImg
                        src={`${CLOUDINARY}${crea.image_visuel}`}
                        alt={crea.titre_visuel}
                        width={700}
                        height={480}
                        sizes="(max-width: 768px) 90vw, 560px"
                      />
                      <div className="visuel-card-shine" />
                    </div>

                    <div className="visuel-card-overlay">
                      <div className="visuel-card-overlay-inner">
                        <div className="visuel-zoom-icon">
                          <i className="bi bi-zoom-in" />
                        </div>
                        <p className="visuel-card-overlay-title">{crea.titre_visuel}</p>
                        <span className="visuel-card-overlay-date">
                          {new Date(crea.date_creation).toLocaleDateString("fr-FR", {
                            month: "short", year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="visuel-card-footer">
                      <i className="bi bi-image" />
                      <span>{crea.titre_visuel}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* ── GRILLE ── */}
        <section className="visuel-grid-section">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <p>Galerie complète</p>
              <h2>Toutes les créations</h2>
            </div>

            <div className="visuel-masonry" data-aos="fade-up" data-aos-delay="80">
              {sorted.map((crea, i) => (
                <div
                  key={crea.id}
                  className="visuel-grid-card"
                  onClick={() => setSelected(crea)}
                  data-aos="zoom-in"
                  data-aos-delay={Math.min(i * 50, 350)}
                >
                  <div className="visuel-grid-img">
                    <LazyImg
                      src={`${CLOUDINARY}${crea.image_visuel}`}
                      alt={crea.titre_visuel}
                      width={500}
                      height={380}
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="visuel-grid-overlay">
                    <i className="bi bi-zoom-in visuel-grid-zoom" />
                    <p className="visuel-grid-label">{crea.titre_visuel}</p>
                  </div>
                  <div className="visuel-grid-glow" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── MODAL LIGHTBOX ── */}
      {selected && (
        <div className="visuel-modal-bg" onClick={closeModal}>
          <div className="visuel-modal-box" onClick={(e) => e.stopPropagation()}>

            <button className="visuel-modal-close" onClick={closeModal} aria-label="Fermer">
              <i className="bi bi-x-lg" />
            </button>

            <button
              className="visuel-modal-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                const idx = sorted.findIndex((v) => v.id === selected.id);
                setSelected(sorted[(idx - 1 + sorted.length) % sorted.length]);
              }}
            >
              <i className="bi bi-chevron-left" />
            </button>

            <div className="visuel-modal-img-wrap">
              {/* Spinner affiché pendant le chargement de la grande image */}
              {!modalReady && (
                <div className="visuel-modal-loader" aria-label="Chargement de l'image">
                  <div className="visuel-modal-spinner">
                    <div className="vspin-ring" />
                    <i className="bi bi-image vspin-icon" aria-hidden="true" />
                  </div>
                  <span className="vspin-label">Chargement…</span>
                </div>
              )}
              <Image
                key={selected.id}
                src={`${CLOUDINARY}${selected.image_visuel}`}
                alt={selected.titre_visuel}
                width={1600}
                height={1100}
                onLoad={() => setModalReady(true)}
                priority
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  opacity: modalReady ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>

            <button
              className="visuel-modal-nav next"
              onClick={(e) => {
                e.stopPropagation();
                const idx = sorted.findIndex((v) => v.id === selected.id);
                setSelected(sorted[(idx + 1) % sorted.length]);
              }}
            >
              <i className="bi bi-chevron-right" />
            </button>

            <div className="visuel-modal-info">
              <span className="visuel-modal-title-text">
                <i className="bi bi-image" style={{ color: "var(--accent-cyan)", marginRight: "0.4rem" }} />
                {selected.titre_visuel}
              </span>
              <span className="visuel-modal-counter">
                {sorted.findIndex((v) => v.id === selected.id) + 1} / {sorted.length}
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
