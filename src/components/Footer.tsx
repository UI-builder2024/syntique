"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/work";
import { SOLUTIONS } from "@/lib/solutions";
import { Mark } from "./Logo";
import { Arrow } from "./ui";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const [year, setYear] = useState(2026);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    setYear(new Date().getFullYear());
    setDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-paper text-ink">
      {/* The parallax lift only on desktop — on tall phone footers it pushed the headline out of view. */}
      <motion.div style={desktop ? { y } : undefined} className="mx-auto max-w-[1400px] px-5 pb-28 pt-20 md:px-10 md:pb-10 md:pt-36">
        <p className="text-lg text-ink/55">Got something worth building?</p>
        <Link href="/contact" className="group mt-6 block" data-cursor="Let's talk">
          <motion.span style={desktop ? { scale } : undefined} className="display block origin-left text-[clamp(3.5rem,15vw,12.5rem)]">
            Let&apos;s build
            <br />
            <span className="inline-flex items-center gap-[0.15em]">
              <span className="serif font-normal tracking-normal">it right.</span>
              <span className="grid size-[0.75em] place-items-center rounded-full bg-signal text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg] group-hover:bg-ink">
                <Arrow className="size-[45%]" />
              </span>
            </span>
          </motion.span>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-line-ink pt-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <Mark size={36} color="var(--ink)" node="var(--signal)" />
              <span className="text-2xl font-bold tracking-[-0.04em]">syntique</span>
            </div>
            <p className="mt-4 max-w-xs text-ink/60">{SITE.description}</p>
            <a href={`mailto:${SITE.email}`} className="mt-6 inline-block text-lg font-semibold underline decoration-signal decoration-2 underline-offset-4">
              {SITE.email}
            </a>
          </div>
          <FooterCol title="Work" links={PROJECTS.map((p) => ({ href: `/work/${p.slug}`, label: p.name }))} />
          <FooterCol title="Systems" links={SOLUTIONS.map((s) => ({ href: `/solutions/${s.slug}`, label: s.product }))} />
          <FooterCol
            title="Studio"
            links={[
              { href: "/contact", label: "Start a project" },
              { href: "/services", label: "Services" },
              { href: "/work", label: "All work" },
              { href: "/#process", label: "How we work" },
              { href: "/showreel", label: "Showreel" },
            ]}
          />
        </div>
        <div className="label mt-16 flex flex-wrap justify-between gap-4 text-ink/40">
          <span>© {year} {SITE.name}</span>
          <span>India · United States · Australia</span>
        </div>
      </motion.div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="md:col-span-2">
      <p className="label mb-4 text-ink/40">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink/80 transition-colors hover:text-signal">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
