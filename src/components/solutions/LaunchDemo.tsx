"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "./useLoop";

// Day 1 → Day 14: the site assembles itself from sticky notes to a live URL.
export function LaunchDemo() {
  const { ref, step } = useLoop(15, 450, 2800);
  const day = Math.max(1, step);
  const phase = day <= 2 ? 0 : day <= 6 ? 1 : day <= 12 ? 2 : 3;
  const labels = ["Strategy", "Design", "Build", "Live"];

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="display text-3xl tabular-nums text-volt">{String(day).padStart(2, "0")}</span>
          <span className="text-sm text-fog">
            day of 14 · <span className="text-paper">{labels[phase]}</span>
          </span>
        </div>
        {phase === 3 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 rounded-full bg-volt px-3 py-1 text-xs font-semibold text-ink">
            <span className="live-dot size-1.5 rounded-full bg-ink" /> Live
          </motion.span>
        )}
      </div>
      <div className="h-1 bg-white/5">
        <motion.div className="h-full bg-volt" animate={{ width: `${(day / 14) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>
      <div className="relative aspect-[16/10]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={phase}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            {phase === 0 && (
              <div className="blueprint flex h-full flex-wrap content-center justify-center gap-3 p-6">
                {["Who is this for?", "One action per page", "Offer: free trial", "Proof: 3 case studies", "Tone: warm, bold"].map((t, i) => (
                  <span key={t} className="rounded-md bg-[#fff4b3] px-3 py-2 text-xs font-medium text-ink shadow" style={{ rotate: `${(i % 2 ? 1 : -1) * (2 + i)}deg` }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {phase === 1 && (
              <div className="h-full bg-paper p-[6%] text-ink">
                <div className="h-3 w-24 rounded bg-ink" />
                <p className="mt-[6%] max-w-[70%] text-[clamp(1rem,3vw,2rem)] font-bold leading-none tracking-tight">
                  Four states. <span className="serif font-normal text-signal">One table.</span>
                </p>
                <div className="mt-[5%] h-2 w-1/2 rounded bg-ink/15" />
                <div className="mt-2 h-2 w-1/3 rounded bg-ink/15" />
                <div className="mt-[5%] inline-block rounded-full bg-[#E3B866] px-4 py-2 text-xs font-semibold">Book a table</div>
              </div>
            )}
            {phase === 2 && (
              <div className="relative h-full">
                <Image src="/work/four-states/hero.webp" alt="" fill sizes="50vw" className="object-cover object-top opacity-50" />
                <div className="mono absolute inset-x-[6%] bottom-[8%] rounded-lg bg-ink/90 p-3 text-[0.65rem] leading-relaxed text-paper/80">
                  <span className="text-volt">✓</span> CMS connected · <span className="text-volt">✓</span> booking → WhatsApp ·{" "}
                  <span className="text-volt">✓</span> SEO + schema · <span className="text-fog">building preview…</span>
                </div>
              </div>
            )}
            {phase === 3 && <Image src="/work/four-states/hero.webp" alt="Four States site, live" fill sizes="50vw" className="object-cover object-top" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
