"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [visible,  setVisible]  = useState(true);
  const [exiting,  setExiting]  = useState(false);

  useEffect(() => {
    /* Déclenche l'animation de sortie après 2.4 s */
    const exitTimer = setTimeout(() => setExiting(true), 2400);
    /* Retire le DOM après la fin de l'animation (0.7 s) */
    const hideTimer = setTimeout(() => setVisible(false), 3100);
    return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      {visible && <Preloader exiting={exiting} />}
      {children}
    </>
  );
}
