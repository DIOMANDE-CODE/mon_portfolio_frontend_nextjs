"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReactNode } from "react";

export default function AOSProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      mirror: false,
    });
  }, []);

  return <>{children}</>;
}
