"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// A full-page capture inside a browser window that scrolls itself while on screen — the site "playing".
export function ScrollShot({ src, alt, url }: { src: string; alt: string; url: string }) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const inView = useInView(box, { margin: "-15%" });
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (img.current && box.current) setDist(Math.max(0, img.current.offsetHeight - box.current.offsetHeight));
    };
    const el = img.current;
    if (el?.complete) measure();
    el?.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const seconds = Math.max(8, dist / 140);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_60px_160px_-50px_rgba(0,0,0,.9)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/5 bg-ink-3 px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mono mx-auto rounded bg-white/5 px-3 py-0.5 text-[0.7rem] text-fog">{url}</span>
      </div>
      <div ref={box} className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-x-0 top-0 w-full"
          style={{
            transform: inView ? `translateY(-${dist}px)` : "translateY(0)",
            transition: `transform ${inView ? seconds : 1.2}s cubic-bezier(.45,0,.55,1)`,
          }}
        />
      </div>
    </div>
  );
}
