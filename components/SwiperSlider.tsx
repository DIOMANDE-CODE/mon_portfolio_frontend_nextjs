"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/utils/axios";

import "swiper/css";
import "swiper/css/navigation";

interface Categorie {
  id: number;
  nom_categorie: string;
  image_categorie: string;
  description_categorie: string;
}

/* Icône Bootstrap selon le nom de la catégorie */
function categoryIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("web") || n.includes("site"))   return "bi-globe2";
  if (n.includes("mobile") || n.includes("app")) return "bi-phone";
  if (n.includes("ia") || n.includes("ai") || n.includes("intelligence")) return "bi-cpu";
  if (n.includes("design") || n.includes("ui") || n.includes("ux")) return "bi-palette";
  if (n.includes("api") || n.includes("back"))   return "bi-server";
  if (n.includes("cloud") || n.includes("devops")) return "bi-cloud-upload";
  if (n.includes("video") || n.includes("audio") || n.includes("visuel")) return "bi-play-circle";
  return "bi-code-slash";
}

export default function SwiperSlider() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    api
      .get("projet/categorie/list/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
      loop={true}
      speed={700}
      breakpoints={{
        0:    { slidesPerView: 1, spaceBetween: 15 },
        640:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
      }}
    >
      {categories.map((cat) => (
        <SwiperSlide key={cat.id}>
          <div className="service-slide-card">
            {/* Image */}
            <div className="service-slide-img">
              <Image
                width={600}
                height={340}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${cat.image_categorie}`}
                alt={cat.nom_categorie}
              />
              {/* Overlay au hover */}
              <div className="service-slide-img-overlay" />
            </div>

            {/* Contenu */}
            <div className="service-slide-body">
              {/* Icône animée */}
              <div className="service-slide-icon">
                <i className={`bi ${categoryIcon(cat.nom_categorie)}`} />
              </div>
              <p className="service-slide-title">{cat.nom_categorie}</p>
              <p className="service-slide-desc">{cat.description_categorie}</p>
            </div>

            {/* Ligne de lueur animée */}
            <div className="service-slide-glow-line" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
