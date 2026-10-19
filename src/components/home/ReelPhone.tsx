"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Real output from the content pipeline (web encodes of marketing/videos/*), played like a feed.
const REELS = [
  { src: "/reels/automation.mp4", poster: "/reels/automation.jpg", kind: "Service explainer", spec: "Voiceover · captions · music", caption: "A content engine that never runs dry. Research → script → voice → edit → publish." },
  { src: "/reels/case-sis.mp4", poster: "/reels/case-sis.jpg", kind: "Case-study reel", spec: "Kinetic text · sound-off friendly", caption: "Rebuilt India's all-women sport community — from legacy code to a booking platform." },
  { src: "/reels/promo.mp4", poster: "/reels/promo.jpg", kind: "Brand promo", spec: "Voiceover · kinetic captions · SFX", caption: "Your website is your best salesperson. We make sure it closes." },
  { src: "/reels/case-timbuckdo.mp4", poster: "/reels/case-timbuckdo.jpg", kind: "Case-study reel", spec: "Kinetic text · music", caption: "One site, two audiences — students finding gigs and the businesses hiring them." },
];

export function ReelPhone() {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const r = REELS[i];

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, i]);

  return (
    <div ref={wrap} className="flex flex-col items-center">
      <div className="relative">
        <div className="relative aspect-[9/16] w-[min(74vw,340px)] overflow-hidden rounded-[2.2rem] border-[6px] border-ink-3 bg-black shadow-[0_60px_140px_-30px_rgba(61,59,255,.6)]">
          <video
            ref={video}
            key={r.src}
            src={r.src}
            poster={r.poster}
            muted={muted}
            playsInline
            preload="metadata"
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
            onEnded={() => {
              setProgress(0);
              setI((n) => (n + 1) % REELS.length);
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* story progress */}
          <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
            {REELS.map((x, n) => (
              <span key={x.src} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
                <span className="block h-full bg-white" style={{ width: n < i ? "100%" : n === i ? `${progress * 100}%` : "0%" }} />
              </span>
            ))}
          </div>
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-7 text-xs font-semibold text-white">
            <span>Reels</span>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="rounded-full bg-black/50 px-2.5 py-1 backdrop-blur active:scale-95"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇 Tap for sound" : "🔊 Sound on"}
            </button>
          </div>
          {/* feed chrome — no invented engagement numbers */}
          <div className="absolute bottom-24 right-3 z-10 flex flex-col items-center gap-5 text-xl text-white drop-shadow">
            <span>♡</span>
            <span>◌</span>
            <span>➤</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-16 text-white">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-ink">
                <svg viewBox="0 0 48 48" className="size-5" fill="none">
                  <path d="M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13" stroke="#f3f0e8" strokeWidth="5.5" strokeLinecap="round" />
                  <circle cx="36" cy="10" r="4.2" fill="#d7ff3a" />
                  <circle cx="12" cy="38" r="4.2" fill="#d7ff3a" />
                </svg>
              </span>
              <span className="text-sm font-semibold">syntique</span>
              <span className="rounded border border-white/40 px-1.5 text-[0.6rem]">Follow</span>
            </div>
            <p className="mt-2 line-clamp-2 text-[0.78rem] leading-snug text-white/90">{r.caption}</p>
            <p className="mt-1.5 text-[0.65rem] text-white/70">♪ Original audio · AI info</p>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-36 top-24 hidden rounded-xl border border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:block"
        >
          <span className="label text-fog">Mastered to</span>
          <span className="mono block text-volt">−14 LUFS ✓</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 top-1/2 hidden rounded-xl border border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:block"
        >
          <span className="label text-fog">Format</span>
          <span className="mono block text-paper">1080 × 1920 · safe zones</span>
        </motion.div>
      </div>

      <p className="mt-6 text-center text-sm text-fog">
        Made by our pipeline: <span className="text-paper">{r.kind}</span>
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {REELS.map((x, n) => (
          <button
            key={x.src}
            type="button"
            onClick={() => {
              setProgress(0);
              setI(n);
            }}
            className={`overflow-hidden rounded-lg border-2 transition-all active:scale-95 ${n === i ? "border-volt" : "border-transparent opacity-60 hover:opacity-100"}`}
            aria-label={`Play ${x.kind}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.poster} alt="" className="h-20 w-[45px] object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
