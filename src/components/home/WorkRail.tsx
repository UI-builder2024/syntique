"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/work";
import { Arrow, BrowserFrame, SectionLabel } from "../ui";
import { BrandLogo } from "../BrandLogo";

function Card({ p, index }: { p: Project; index: number }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      data-cursor="View case"
      className="group relative block w-[86vw] shrink-0 md:w-[min(72vw,1040px,calc((100svh_-_300px)*1.6))]"
    >
      <div className="relative">
        <div
          className="absolute -inset-px rounded-2xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: p.accent }}
        />
        <div className="relative transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
          <BrowserFrame src={p.images.hero} alt={`${p.name} — ${p.category}`} url={new URL(p.url).host} sizes="(min-width: 768px) 72vw, 86vw" />
        </div>
        <div className="absolute -bottom-8 right-4 hidden w-[17%] overflow-hidden rounded-[1.4rem] border-[5px] border-ink-3 shadow-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-6 group-hover:rotate-[-3deg] md:block">
          <div className="relative aspect-[390/844]">
            <Image src={p.images.mobile} alt={`${p.name} on mobile`} fill sizes="200px" className="object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6 md:mt-8 md:pr-[22%]">
        <div>
          <div className="flex items-baseline gap-3 text-sm text-fog">
            <span className="mono text-xs text-volt">{String(index + 1).padStart(2, "0")}</span>
            <span>{p.category}</span>
          </div>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-5xl">{p.name}</h3>
          <p className="mt-3 max-w-xl text-paper/65">{p.headline}</p>
          {p.integrations && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.integrations.map((it) => (
                <span key={it.name} className="flex items-center gap-1.5 rounded-full border border-line py-1 pl-1.5 pr-3 text-xs text-paper/75">
                  <BrandLogo name={it.name} size={14} />
                  {it.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="mt-2 grid size-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
          <Arrow className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function WorkRail() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // The track only exists in desktop mode, so measure it once that mode has rendered.
  useEffect(() => {
    if (!desktop) return;
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!desktop) return <MobileDeck />;

  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ height: desktop ? `calc(100vh + ${dist}px)` : undefined }}
    >
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-12" : "py-24"}>
        <motion.div
          ref={track}
          style={{ x: desktop ? x : 0 }}
          className={`flex items-stretch gap-8 px-5 md:items-center md:gap-16 md:px-10 ${desktop ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none]"}`}
        >
          <div className="flex w-[86vw] shrink-0 flex-col justify-center md:w-[30vw] md:max-w-[440px]">
            <SectionLabel index="02">Selected work</SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.8rem)]">
              Live products, <span className="serif font-normal">real users.</span>
            </h2>
            <p className="mt-6 max-w-sm text-paper/60">
              Platforms, marketplaces, non-profits and restaurants — each one shipped, live and used by real people today.
            </p>
            <Link href="/work" className="label mt-8 flex items-center gap-2 text-fog transition-colors hover:text-paper">
              All case studies <Arrow />
            </Link>
          </div>
          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="snap-start">
              <Card p={p} index={i} />
            </div>
          ))}
          <div className="flex w-[70vw] shrink-0 items-center md:w-[34vw]">
            <Link href="/contact" className="group block" data-cursor="Let's talk">
              <p className="label text-fog">Next up</p>
              <p className="display mt-4 text-[clamp(2.5rem,5vw,5rem)]">
                Your
                <br />
                <span className="serif font-normal text-volt">product</span>
                <br />
                here.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-volt pb-1 font-semibold">
                Start a project <Arrow />
              </span>
            </Link>
          </div>
        </motion.div>
        {desktop && (
          <div className="mx-auto mt-12 w-full max-w-[1400px] px-10">
            <div className="h-px bg-line">
              <motion.div style={{ width: bar }} className="h-px bg-volt" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Phones get a stacked deck: each case study pins under the nav and the next one slides over it.
function MobileDeck() {
  return (
    <section id="work" className="relative px-4 pb-16 pt-20">
      <SectionLabel index="02">Selected work</SectionLabel>
      <h2 className="display mb-10 mt-5 text-[2.7rem]">
        Live products, <span className="serif font-normal">real users.</span>
      </h2>
      {PROJECTS.map((p, i) => (
        <div key={p.slug} className="sticky pb-6" style={{ top: 76 + i * 10 }}>
          <Link
            href={`/work/${p.slug}`}
            className="block overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_-20px_60px_-20px_rgba(0,0,0,.9)] active:scale-[0.98] transition-transform"
            style={{ background: `linear-gradient(160deg, ${p.accent}33, #131319 55%)` }}
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image src={p.images.hero} alt={`${p.name} — ${p.category}`} fill sizes="92vw" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131319] via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 w-[26%] overflow-hidden rounded-xl border-[3px] border-ink-3 shadow-2xl">
                <div className="relative aspect-[390/844]">
                  <Image src={p.images.mobile} alt="" fill sizes="25vw" className="object-cover object-top" />
                </div>
              </div>
            </div>
            <div className="p-5 pt-3">
              <div className="flex items-baseline gap-2 text-sm text-fog">
                <span className="mono text-xs" style={{ color: p.accent }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate">{p.category}</span>
              </div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="text-[1.9rem] font-bold leading-none tracking-[-0.03em]">{p.name}</h3>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-ink">
                  <Arrow />
                </span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-snug text-paper/65">{p.headline}</p>
              {p.integrations && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.integrations.map((it) => (
                    <span key={it.name} className="flex items-center gap-1.5 rounded-full bg-white/5 py-1 pl-1.5 pr-2.5 text-[0.7rem] text-paper/75">
                      <BrandLogo name={it.name} size={13} />
                      {it.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
      <Link href="/work" className="mt-4 flex items-center justify-between rounded-2xl border border-line p-5 font-semibold">
        All case studies <Arrow />
      </Link>
    </section>
  );
}
