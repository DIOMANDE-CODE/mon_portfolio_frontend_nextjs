import BlogHeroSection from "./blogHeroSection";
import SwiperSlider from "@/components/SwiperSlider";
import QuelqueProjets from "./quelque_projet";

export default function Home() {
  return (
    <main className="main" style={{ paddingTop: 0 }}>
      <BlogHeroSection />

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <p>Expertises</p>
            <h2>domaines d'intervention</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <SwiperSlider />
          </div>
        </div>
      </section>

      <QuelqueProjets />
    </main>
  );
}
