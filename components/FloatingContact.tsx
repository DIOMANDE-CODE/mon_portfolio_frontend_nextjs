"use client";

import { useEffect, useRef } from "react";

export default function FloatingContact() {
  const waRef    = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  /* Effet magnétique : le bouton suit légèrement la souris */
  useEffect(() => {
    const buttons = [waRef.current, emailRef.current].filter(Boolean) as HTMLAnchorElement[];

    const cleanups: (() => void)[] = [];

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width  / 2) * 0.28;
        const y = (e.clientY - rect.top  - rect.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      };
      const onLeave = () => {
        btn.style.transform = "";
      };
      /* Ripple au clic */
      const onClick = () => {
        btn.classList.remove("btn-clicked");
        void btn.offsetWidth; // force reflow
        btn.classList.add("btn-clicked");
      };

      btn.addEventListener("mousemove",  onMove);
      btn.addEventListener("mouseleave", onLeave);
      btn.addEventListener("click",      onClick);
      cleanups.push(() => {
        btn.removeEventListener("mousemove",  onMove);
        btn.removeEventListener("mouseleave", onLeave);
        btn.removeEventListener("click",      onClick);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="floating-contact">

      {/* WhatsApp */}
      <div className="floating-btn-wrapper">
        <span className="floating-ring" aria-hidden="true" />
        <a
          ref={waRef}
          href="https://wa.me/2250595031694"
          target="_blank"
          rel="noreferrer"
          className="floating-btn floating-whatsapp"
          aria-label="Contacter sur WhatsApp"
          title="WhatsApp"
        >
          <i className="bi bi-whatsapp" aria-hidden="true" />
        </a>
      </div>

      {/* Email */}
      <div className="floating-btn-wrapper">
        <span className="floating-ring ring-email" aria-hidden="true" />
        <a
          ref={emailRef}
          href="mailto:chezpyth@gmail.com"
          className="floating-btn floating-email"
          aria-label="Envoyer un email"
          title="Email"
        >
          <i className="bi bi-envelope-fill" aria-hidden="true" />
        </a>
      </div>

    </div>
  );
}
