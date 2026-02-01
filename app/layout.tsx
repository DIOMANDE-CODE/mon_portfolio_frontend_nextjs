import type { Metadata } from "next";


// import stylesheet files
import "@/public/assets/css/main.css";
import "@/public/assets/vendor/aos/aos.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";

// import google font file
import { Roboto, Nunito, Poppins } from "next/font/google";

import Script from "next/script";
import Header from "@/components/header";
import Footer from "@/components/footer";

import AOSProvider from "@/components/AOSProvider";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "<DIOMANDE DROH MARTIAL/>",
  description: "Portofolio de Diomande Droh Martial",
  keywords: ["portfolio", "développeur", "designer", "formateur"],
  icons: {
    icon: "/mon-nouveau-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${roboto.variable} ${nunito.variable} ${poppins.variable}`}
      >
        <AOSProvider>
          <Header />
          {children}
        </AOSProvider>
        <Footer />
        <SpeedInsights />
        <Analytics />

        {/* Scripts externes */}
        <Script
          src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/vendor/php-email-form/validate.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/vendor/aos/aos.js" strategy="lazyOnload" />
        <Script
          src="/assets/vendor/swiper/swiper-bundle.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/vendor/purecounter/purecounter_vanilla.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
