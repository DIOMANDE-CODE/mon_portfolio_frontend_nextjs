import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diomandedroh.vercel.app";

export const metadata: Metadata = {
  title: "Contact — Travailler avec Diomande Droh Martial",
  description:
    "Contactez Diomande Droh Martial pour vos projets web, mobile ou IA. Développeur Full-Stack freelance disponible pour des missions de développement, intégration IA et conseil technique.",
  keywords: [
    "contact développeur", "développeur freelance disponible",
    "embaucher développeur full-stack", "mission freelance développeur web",
    "contacter Diomande Droh Martial",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: "Contact — Diomande Droh Martial, Développeur Freelance",
    description:
      "Vous avez un projet ? Contactez Diomande Droh Martial, développeur Full-Stack disponible pour des missions web, mobile et IA.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
