import type { Metadata } from "next";
import BlogHeroSection from "./blogHeroSection";
import SwiperSlider from "@/components/SwiperSlider";
import QuelqueProjets from "./quelque_projet";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  title: "Diomande Droh Martial — Développeur Full-Stack & Ingénieur Logiciel",
  description:
    "Bienvenue sur le portfolio de Diomande Droh Martial, ingénieur logiciel et développeur Full-Stack spécialisé en React, Next.js, Python et intégration IA. Découvrez mes projets web et mobile.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: "Diomande Droh Martial — Développeur Full-Stack & Ingénieur Logiciel",
    description:
      "Portfolio de Diomande Droh Martial, développeur Full-Stack et ingénieur logiciel. Projets web, mobile et IA.",
  },
};

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
