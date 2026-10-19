"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LAUNCH_PROMISE, SOLUTIONS } from "@/lib/solutions";
import { SystemMap } from "../solutions/SystemMap";
import { Arrow, MagneticButton, SectionLabel } from "../ui";

const ease = [0.16, 1, 0.3, 1] as const;

export function Packages() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25%" });
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const s = SOLUTIONS[i];

  // Rotate through industries until the visitor picks one.
  useEffect(() => {
    if (!inView || touched) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SOLUTIONS.length), 4200);
    return () => clearTimeout(t);
  }, [i, inView, touched]);

  return (
    <section id="systems" ref={ref} className="relative scroll-mt-20 overflow-hidden border-y border-line bg-ink-2">
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full blur-[160px]"
        animate={{ backgroundColor: s.accent, opacity: 0.18 }}
        transition={{ duration: 1 }}
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index="03">Systems & packages</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
              Not just a website. <span className="serif font-normal text-volt">The whole system.</span>
            </h2>
          </div>
          <p className="text-lg text-paper/65 md:col-span-4">
            Website, CMS, CRM, bookings, POS and automations — built as one for your industry, managed by us. {LAUNCH_PROMISE}.
          </p>
        </div>

        <div className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0" role="tablist">
          {SOLUTIONS.map((x, n) => (
            <button
              key={x.slug}
              role="tab"
              aria-selected={n === i}
              onClick={() => {
                setI(n);
                setTouched(true);
              }}
              className={`relative shrink-0 overflow-hidden rounded-full border px-5 py-3 text-left transition-colors active:scale-95 ${
                n === i ? "border-transparent text-ink" : "border-line text-paper/75 hover:text-paper"
              }`}
            >
              {n === i && <motion.span layoutId="pkg-pill" className="absolute inset-0 rounded-full" style={{ background: x.accent }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative block text-sm font-semibold">{x.product}</span>
              <span className="relative block text-[0.7rem] opacity-70">{x.industry.split(",")[0]}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}>
                <p className="text-fog">{s.industry}</p>
                <h3 className="display mt-3 text-[clamp(2.2rem,4.4vw,4rem)]">{s.product}</h3>
                <p className="mt-4 text-xl font-medium leading-snug">
                  {s.headline} <span className="serif font-normal" style={{ color: s.accent }}>{s.headlineAccent}</span>
                </p>
                <ul className="mt-6 space-y-2">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-3 text-paper/80">
                      <span className="size-1.5 rotate-45" style={{ background: s.accent }} />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href={`/solutions/${s.slug}`}>Explore {s.product}</MagneticButton>
                  <Link
                    href={`/solutions/${s.slug}#quote`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-paper/40"
                  >
                    Get a quote <Arrow />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <SystemMap modules={[...s.core, ...s.addons]} active={s.core} center={s.product} accent={s.accent} />
          </div>
        </div>
      </div>
    </section>
  );
}
