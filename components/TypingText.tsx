"use client";
import { useState, useEffect } from "react";

interface Props {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function TypingText({ texts, speed = 80, deleteSpeed = 40, pauseTime = 2200 }: Props) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = texts[idx];

    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, pauseTime);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) setPaused(true);
      } else {
        const next = current.slice(0, display.length - 1);
        setDisplay(next);
        if (next === "") {
          setDeleting(false);
          setIdx((p) => (p + 1) % texts.length);
        }
      }
    }, deleting ? deleteSpeed : speed);

    return () => clearTimeout(t);
  }, [display, deleting, paused, idx, texts, speed, deleteSpeed, pauseTime]);

  return (
    <>
      {display}
      <span className="typing-cursor" />
    </>
  );
}
