"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import api from "@/utils/axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

export default function SwiperSlider() {
  interface Categorie {
    id: number;
    nom_categorie: string;
    image_categorie: string;
    description_categorie: string;
  }

  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    api
      .get("projet/categorie/list/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  },[]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      //   pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
      speed={1000}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {categories.map((categorie) => (
        <SwiperSlide key={categorie.id}>
          <div className="swiper-slide">
            <div className="blog-post-item">
              <Image
                width={5000}
                height={5000}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${categorie.image_categorie}`}
                alt="Blog Image"
              />
              <div className="blog-post-content">
                <h2>
                  <span style={{ 'textTransform':'uppercase'}}>{categorie.nom_categorie}</span>
                </h2>
                <p>
                  {categorie.description_categorie}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
