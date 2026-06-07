import type { Metadata } from "next";

import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/aos/aos.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/css/main.css";
import "./globals.css";

import { Roboto, Poppins, Caveat } from "next/font/google";

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

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Diomande Droh Martial — Développeur Full-Stack & Ingénieur Logiciel",
    template: "%s | Diomande Droh Martial",
  },

  description:
    "Portfolio de Diomande Droh Martial, ingénieur logiciel et développeur Full-Stack spécialisé en développement web & mobile (React, Next.js, Python, Django) et intégration IA. Disponible en freelance.",

  keywords: [
    "Diomande Droh Martial",
    "diomande",
    "droh",
    "martial",
    "diomandedroh",
    "diomandedroh martial",
    "portfolio développeur",
    "portfolio IT",
    "portfolio ingénieur",
    "portfolio développeur web",
    "développeur web",
    "développeur mobile",
    "développeur full-stack",
    "fullstack developer",
    "ingénieur logiciel",
    "software engineer",
    "web developer",
    "développeur React",
    "développeur Next.js",
    "développeur Python",
    "développeur Django",
    "développeur TypeScript",
    "intégration IA",
    "intelligence artificielle",
    "développeur freelance",
    "infographe",
    "monteur vidéo",
    "DDM",
  ],

  authors: [{ name: "Diomande Droh Martial", url: SITE_URL }],
  creator: "Diomande Droh Martial",
  publisher: "Diomande Droh Martial",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Portfolio — Diomande Droh Martial",
    title: "Diomande Droh Martial — Développeur Full-Stack & Ingénieur Logiciel",
    description:
      "Portfolio de Diomande Droh Martial, ingénieur logiciel, développeur Full-Stack et intégrateur IA. Projets web, mobile et intelligence artificielle.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diomande Droh Martial — Portfolio Développeur Full-Stack",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Diomande Droh Martial — Développeur Full-Stack & Ingénieur Logiciel",
    description:
      "Portfolio de Diomande Droh Martial : développeur Full-Stack, ingénieur logiciel et intégrateur IA.",
    images: ["/og-image.png"],
    creator: "@diomandedroh",
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/profil.ico",
    apple: "/assets/img/apple-touch-icon.png",
    shortcut: "/profil.ico",
  },

  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      "name": "Diomande Droh Martial",
      "givenName": "Droh Martial",
      "familyName": "Diomande",
      "alternateName": ["Diomande Droh", "DDM", "diomandedroh", "diomandedroh martial"],
      "jobTitle": "Développeur Full-Stack & Ingénieur Logiciel",
      "description":
        "Ingénieur logiciel et développeur Full-Stack spécialisé en développement web et mobile (React, Next.js, Python, Django) ainsi qu'en intégration de solutions d'intelligence artificielle.",
      "url": SITE_URL,
      "email": "diomandedroh79@gmail.com",
      "image": `${SITE_URL}/assets/img/person/profil.jpg`,
      "sameAs": [
        "https://github.com/DIOMANDE-CODE",
      ],
      "knowsAbout": [
        "React.js", "Next.js", "Python", "Django", "JavaScript", "TypeScript",
        "Développement web", "Développement mobile", "Intelligence artificielle",
        "Infographie", "Montage vidéo", "Full-Stack Development",
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Développeur Full-Stack",
        "description": "Conception et développement d'applications web et mobiles",
        "skills": "React, Next.js, Python, Django, TypeScript, IA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Portfolio — Diomande Droh Martial",
      "description":
        "Portfolio professionnel de Diomande Droh Martial, ingénieur logiciel et développeur Full-Stack.",
      "author": { "@id": `${SITE_URL}/#person` },
      "inLanguage": "fr-FR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/projet?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        {/* Structured data — Person + WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <meta name="google-site-verification" content="cce5Dp2OPhQvIbA3gnS4CcQKgBtgfqNI7z4dw4pW4Z0" />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} ${caveat.variable}`}>
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
