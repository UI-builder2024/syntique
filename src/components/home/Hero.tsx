"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DotField } from "./DotField";
import { ClientLogoRow } from "../ClientLogos";
import { Marquee, MagneticButton } from "../ui";

const ROTATE = [
  "restaurant systems",
  "sports club platforms",
  "gig marketplaces",
  "booking engines",
  "donation portals",
  "content engines",
];

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATE.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Delay the intro until the preloader has cleared on a first visit.
  const [ready, setReady] = useState<number | null>(null);
  useEffect(() => {
    const pre = (window as unknown as { __synPre?: boolean }).__synPre && performance.now() < 4000;
    setReady(pre ? 1.6 : 0);
  }, []);
  const base = ready ?? 0;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black_30%,transparent_80%)]">
        <DotField />
      </div>
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[46rem] rounded-full bg-signal/25 blur-[140px]" />

      <motion.div
        key={ready === null ? "wait" : "go"}
        style={{ y, opacity: fade, visibility: ready === null ? "hidden" : "visible" }}
        className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14"
      >
        <h1 className="display text-[clamp(3.4rem,11.5vw,11rem)]">
          <Line delay={base + 0.1}>Software,</Line>
          <Line delay={base + 0.2}>
            crafted with <span className="serif font-normal text-signal-soft">technique.</span>
          </Line>
          <span className="sr-only"> Syntique Technologies builds websites, platforms and automation that convert.</span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.6, duration: 1, ease }}
            className="max-w-xl text-lg leading-relaxed text-paper/75 md:col-span-6 md:text-xl"
          >
            We design and engineer{" "}
            <span className="relative flex h-[1.4em] overflow-hidden align-bottom text-paper md:inline-flex md:min-w-[13ch]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ROTATE[i]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease }}
                  className="block whitespace-nowrap font-semibold underline decoration-volt decoration-2 underline-offset-[6px]"
                >
                  {ROTATE[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br className="hidden md:block" />
            that turn visitors into customers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.75, duration: 1, ease }}
            className="md:col-span-6"
          >
            <div className="grid gap-3 sm:flex sm:flex-wrap md:justify-end">
              <MagneticButton href="/contact" full className="sm:w-auto">
                Start a project
              </MagneticButton>
              <MagneticButton href="/solutions" variant="ghost" full className="sm:w-auto">
                Explore systems
              </MagneticButton>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-fog md:justify-end">
              <span className="live-dot size-1.5 rounded-full bg-volt" />
              Ideation to live in as little as 2 weeks
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1, duration: 1 }}
        className="relative border-y border-line py-5"
      >
        <div className="flex items-center">
          <span className="label hidden shrink-0 border-r border-line pl-10 pr-8 text-fog md:block">Systems we run for</span>
          <Marquee speed={40} className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ClientLogoRow />
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
