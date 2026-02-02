import Link from "next/link";

import SwiperSlider from "@/components/SwiperSlider";
import BlogHeroSection from "./blogHeroSection";

// impoter le données
import QuelqueProjets  from "./quelque_projet";

export default function Home() {
  return (
    <>
      <main className="main">
        <BlogHeroSection></BlogHeroSection>
        <section id="featured-posts" className="featured-posts section">
          {/* Section Title */}
          <div className="container section-title">
            <h2>Mes services</h2>
            <div>
              <span>domaines d'interventions</span>{" "}
              <span className="description-title"></span>
            </div>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="blog-posts-slider swiper init-swiper">
              <div>
                <SwiperSlider></SwiperSlider>
              </div>
            </div>
          </div>
        </section>
        {/* /Featured Posts Section */}
        <QuelqueProjets></QuelqueProjets>
      </main>
      {/* Preloader */}
      {/* Scroll Top */}
      <Link
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </Link>
    </>
  );
}
