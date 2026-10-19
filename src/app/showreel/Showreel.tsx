"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/work";

const ease = [0.16, 1, 0.3, 1] as const;
const wipe = [0.76, 0, 0.24, 1] as const;

type Scene = { id: string; ms: number };
const SCENES: Scene[] = [
  { id: "logo", ms: 3200 },
  { id: "kinetic", ms: 3800 },
  ...PROJECTS.map((p) => ({ id: `p:${p.slug}`, ms: 2600 })),
  { id: "process", ms: 3600 },
  { id: "automation", ms: 3200 },
  { id: "cta", ms: 4200 },
];
export const SHOWREEL_MS = SCENES.reduce((a, s) => a + s.ms, 0);

function LogoScene() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div style={{ width: "22cqmin", height: "22cqmin" }}>
        <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
          <motion.path
            d="M35 10 H19 a7 7 0 0 0 -7 7 v0 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 v0 a7 7 0 0 1 -7 7 H13"
            stroke="var(--paper)"
            strokeWidth={5.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.circle cx={36} cy={10} r={4.2} fill="var(--volt)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }} />
          <motion.circle cx={12} cy={38} r={4.2} fill="var(--volt)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 14 }} />
        </svg>
      </div>
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease }}
          className="font-bold tracking-[-0.05em]"
          style={{ fontSize: "13cqmin", lineHeight: 1.1 }}
        >
          syntique
        </motion.p>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="serif text-signal-soft"
        style={{ fontSize: "5cqmin" }}
      >
        Software, crafted with technique.
      </motion.p>
    </div>
  );
}

function KineticScene() {
  const words = ["Websites.", "Platforms.", "Automation."];
  return (
    <div className="flex h-full flex-col justify-center px-[8cqw]">
      {words.map((w, i) => (
        <div key={w} className="overflow-hidden">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.45, duration: 0.7, ease }}
            className="display"
            style={{ fontSize: "15cqmin", color: i === 2 ? "var(--volt)" : undefined }}
          >
            {w}
          </motion.p>
        </div>
      ))}
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease }}
        className="serif mt-[2cqmin]"
        style={{ fontSize: "8cqmin" }}
      >
        that actually convert.
      </motion.p>
    </div>
  );
}

function ProjectScene({ slug, vertical }: { slug: string; vertical: boolean }) {
  const p = PROJECTS.find((x) => x.slug === slug)!;
  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.6, ease: wipe }}
        className="absolute inset-0"
        style={{ background: p.accent }}
      />
      <div className={`relative flex h-full ${vertical ? "flex-col justify-center gap-[5cqh] px-[7cqw]" : "items-center gap-[5cqw] px-[6cqw]"}`}>
        <motion.div
          initial={{ y: 60, opacity: 0, rotate: vertical ? -3 : 0 }}
          animate={{ y: 0, opacity: 1, rotate: vertical ? -3 : 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease }}
          className={vertical ? "mx-auto w-[58cqw]" : "w-[58cqw]"}
        >
          <div className={`overflow-hidden border-black/30 shadow-2xl ${vertical ? "rounded-[5cqw] border-[1.6cqw]" : "rounded-[1cqw] border-[0.4cqw]"}`}>
            <div className={`relative ${vertical ? "aspect-[390/844]" : "aspect-[16/10]"}`}>
              <Image src={vertical ? p.images.mobile : p.images.hero} alt="" fill sizes="60vw" priority className="object-cover object-top" />
            </div>
          </div>
        </motion.div>
        <div style={{ color: p.accentInk }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.5 }}
            className="label"
            style={{ fontSize: "2.2cqmin" }}
          >
            {p.category}
          </motion.p>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease }}
              className="display"
              style={{ fontSize: vertical ? "11cqmin" : "8cqmin", lineHeight: 1 }}
            >
              {p.name}
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-[1.5cqmin] max-w-[40ch] font-medium"
            style={{ fontSize: "3cqmin" }}
          >
            {p.stats[0].value} {p.stats[0].label}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function ProcessScene() {
  const steps = ["Discover", "Architect", "Design", "Engineer", "Launch", "Grow"];
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => Math.min(steps.length - 1, x + 1)), 480);
    return () => clearInterval(id);
  }, [steps.length]);
  return (
    <div className="blueprint flex h-full flex-col justify-center px-[8cqw]">
      <p className="label text-fog" style={{ fontSize: "2.2cqmin" }}>
        How we work
      </p>
      {steps.map((s, i) => (
        <motion.p
          key={s}
          animate={{ opacity: i <= n ? 1 : 0.15, x: i === n ? "2cqmin" : 0, color: i === n ? "#d7ff3a" : "#f3f0e8" }}
          transition={{ duration: 0.35 }}
          className="display"
          style={{ fontSize: "9cqmin", lineHeight: 1.02 }}
        >
          {s}
        </motion.p>
      ))}
    </div>
  );
}

function AutomationScene() {
  const frames = ["Research", "Script", "Voice", "Edit", "Publish"];
  return (
    <div className="flex h-full flex-col items-center justify-center bg-signal text-center">
      <p className="label text-paper/70" style={{ fontSize: "2.2cqmin" }}>
        New service
      </p>
      <p className="display mt-[2cqmin]" style={{ fontSize: "10cqmin" }}>
        Content automation
      </p>
      <div className="mt-[4cqmin] flex flex-wrap justify-center gap-[1.5cqmin]">
        {frames.map((f, i) => (
          <motion.span
            key={f}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.22, type: "spring", stiffness: 300, damping: 16 }}
            className="rounded-full bg-volt font-semibold text-ink"
            style={{ fontSize: "3cqmin", padding: "1cqmin 3cqmin" }}
          >
            {f}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function CtaScene() {
  const host = new URL(SITE.url).host;
  return (
    <div className="flex h-full flex-col items-center justify-center bg-paper text-center text-ink">
      <div style={{ width: "12cqmin", height: "12cqmin" }}>
        <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
          <path d="M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13" stroke="#0b0b0f" strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={36} cy={10} r={4.2} fill="#3d3bff" />
          <circle cx={12} cy={38} r={4.2} fill="#3d3bff" />
        </svg>
      </div>
      <div className="overflow-hidden">
        <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }} className="display mt-[3cqmin]" style={{ fontSize: "12cqmin" }}>
          Let&apos;s build
        </motion.p>
      </div>
      <div className="overflow-hidden">
        <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.12, duration: 0.9, ease }} className="serif text-signal" style={{ fontSize: "12cqmin", lineHeight: 1.1 }}>
          it right.
        </motion.p>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-[4cqmin] rounded-full bg-ink font-semibold text-paper"
        style={{ fontSize: "3.6cqmin", padding: "1.6cqmin 4.5cqmin" }}
      >
        {host} <span className="text-volt">→</span>
      </motion.p>
    </div>
  );
}

export function Showreel({ vertical, loop }: { vertical: boolean; loop: boolean }) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Give fonts and images a beat to load so a recording starts on a clean frame.
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      if (i === SCENES.length - 1) {
        (window as unknown as { __showreelDone?: boolean }).__showreelDone = true;
        if (loop) setI(0);
      } else setI(i + 1);
    }, SCENES[i].ms);
    return () => clearTimeout(t);
  }, [i, started, loop]);

  const s = SCENES[i];
  return (
    <div className="grid h-[100dvh] w-screen place-items-center bg-black">
      <div
        className="relative overflow-hidden bg-ink"
        style={{
          containerType: "size",
          width: vertical ? "min(100vw, 100dvh * 9 / 16)" : "min(100vw, 100dvh * 16 / 9)",
          aspectRatio: vertical ? "9 / 16" : "16 / 9",
        }}
      >
        {started && (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={s.id + i}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              {s.id === "logo" && <LogoScene />}
              {s.id === "kinetic" && <KineticScene />}
              {s.id.startsWith("p:") && <ProjectScene slug={s.id.slice(2)} vertical={vertical} />}
              {s.id === "process" && <ProcessScene />}
              {s.id === "automation" && <AutomationScene />}
              {s.id === "cta" && <CtaScene />}
            </motion.div>
          </AnimatePresence>
        )}
        <div className="grain pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
