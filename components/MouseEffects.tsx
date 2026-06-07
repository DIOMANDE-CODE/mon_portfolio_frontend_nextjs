"use client";

import { useEffect } from "react";

export default function MouseEffects() {
  useEffect(() => {
    /* ── 1. Lueur douce qui suit la souris (RAF optimisé) ── */
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let targetX = 0, targetY = 0;
    let curX    = 0, curY    = 0;
    let rafId: number;
    let needsUpdate = false; // ne tourne que quand nécessaire

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      needsUpdate = true;
    };

    const tick = () => {
      if (needsUpdate) {
        curX = lerp(curX, targetX, 0.07);
        curY = lerp(curY, targetY, 0.07);
        glow.style.left = `${curX}px`;
        glow.style.top  = `${curY}px`;

        /* Arrête les mises à jour quand la lueur a rejoint le curseur */
        if (Math.abs(curX - targetX) < 0.3 && Math.abs(curY - targetY) < 0.3) {
          needsUpdate = false;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* ── 2. Anneau d'étincelle au clic ── */
    const onClick = (e: MouseEvent) => {
      const spark = document.createElement("span");
      spark.className = "click-spark";
      spark.style.left = `${e.clientX}px`;
      spark.style.top  = `${e.clientY}px`;
      document.body.appendChild(spark);
      spark.addEventListener("animationend", () => spark.remove(), { once: true });
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("click",     onClick,     { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click",     onClick);
      cancelAnimationFrame(rafId);
      glow.remove();
    };
  }, []);

  return null;
}
