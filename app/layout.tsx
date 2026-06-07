import type { Metadata } from "next";

import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/aos/aos.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/css/main.css";
import "./globals.css";

import { Roboto, Poppins } from "next/font/google";

import Script from "next/script";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AOSProvider from "@/components/AOSProvider";
import FloatingContact from "@/components/FloatingContact";
import MouseEffects from "@/components/MouseEffects";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "<DIOMANDE DROH MARTIAL/>",
  description: "Portfolio — Développeur Full-Stack · Ingénieur Logiciel · Expert IA",
  keywords: ["portfolio", "développeur", "designer", "freelance", "web", "mobile", "IA", "fullstack", "developer"],
  icons: { icon: "/profil.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        {/* Préconnexions aux domaines critiques — réduit la latence DNS + TLS */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://monportofoliobackend.up.railway.app" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://monportofoliobackend.up.railway.app" />
      </head>
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <PreloaderWrapper>
          <AOSProvider>
            <Header />
            {children}
          </AOSProvider>
          <Footer />
        </PreloaderWrapper>

        {/* ── Boutons flottants animés ── */}
        <FloatingContact />
        {/* ── Effets souris globaux ── */}
        <MouseEffects />

        <SpeedInsights />
        <Analytics />

        <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/vendor/aos/aos.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
