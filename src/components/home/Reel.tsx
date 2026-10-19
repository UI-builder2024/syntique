"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/work";

// A browser window that grows to full width as you scroll, flipping through live client sites.
export function Reel() {
  const ref = useRef<HTMLElement>(null);
  const [[i, prev], setPair] = useState<[number, number]>([0, -1]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 14]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);

  useEffect(() => {
    const id = setInterval(() => setPair(([n]) => [(n + 1) % PROJECTS.length, n]), 2600);
    return () => clearInterval(id);
  }, []);
  const p = PROJECTS[i];

  return (
    <section ref={ref} className="relative px-3 py-16 md:px-6 md:py-24" style={{ perspective: 1400 }}>
      <div className="md:hidden">
        <p className="mb-6 px-2 text-center text-sm text-fog">Tap to explore the work</p>
        <Link href={`/work/${p.slug}`} className="relative mx-auto block w-[68vw] max-w-[300px]">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[390/844] overflow-hidden rounded-[2.4rem] border-[7px] border-ink-3 bg-black shadow-[0_40px_100px_-30px_rgba(61,59,255,.7)]"
          >
            {PROJECTS.map((x, n) => (
              <motion.div
                key={x.slug}
                initial={false}
                animate={{ clipPath: n === i || n === prev ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                transition={{ duration: n === i ? 0.8 : 0, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
                style={{ zIndex: n === i ? 2 : n === prev ? 1 : 0 }}
              >
                <Image src={x.images.mobile} alt={`${x.name} on mobile`} fill sizes="70vw" priority={n < 2} className="object-cover object-top" />
              </motion.div>
            ))}
            <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          </motion.div>
        </Link>
        <AnimatePresence mode="wait">
          <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6 text-center">
            <p className="text-2xl font-bold tracking-tight">{p.name}</p>
            <p className="mt-1 text-sm text-fog">{p.category}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex justify-center gap-1.5">
          {PROJECTS.map((x, n) => (
            <span key={x.slug} className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-volt" : "w-1.5 bg-white/25"}`} />
          ))}
        </div>
      </div>

      <motion.div
        style={{ scale, borderRadius: radius, rotateX }}
        className="relative mx-auto hidden max-w-[1400px] origin-top overflow-hidden border border-white/10 bg-ink-2 md:block"
      >
        <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-ink-3 px-4">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <div className="mono mx-auto flex h-6 w-full max-w-md items-center justify-center gap-2 rounded-md bg-white/5 text-[0.7rem] text-fog">
            <AnimatePresence mode="wait">
              <motion.span key={p.slug} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                {new URL(p.url).host}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <Link href={`/work/${p.slug}`} data-cursor="View case" className="relative block aspect-[16/10] md:aspect-[16/9]">
          {PROJECTS.map((x, n) => {
            const isActive = n === i;
            const isPrev = n === prev;
            return (
              <motion.div
                key={x.slug}
                initial={false}
                animate={{ clipPath: isActive || isPrev ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
                transition={{ duration: isActive ? 0.9 : 0, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
                style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
              >
                <Image src={x.images.hero} alt={`${x.name} website by Syntique`} fill sizes="100vw" priority={n < 2} className="object-cover object-top" />
              </motion.div>
            );
          })}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-5 pt-24 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm text-paper/70">{p.category}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight md:text-4xl">{p.name}</p>
              </motion.div>
            </AnimatePresence>
            <div className="hidden gap-1.5 md:flex">
              {PROJECTS.map((x, n) => (
                <span key={x.slug} className="h-1 w-8 overflow-hidden rounded-full bg-white/20">
                  {n === i && (
                    <motion.span
                      className="block h-full bg-volt"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.6, ease: "linear" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
