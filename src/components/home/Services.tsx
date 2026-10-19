"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { Arrow, SectionLabel } from "../ui";

export function Services() {
  const [hoverRaw, setHover] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const inView = useInView(list, { margin: "-10% 0px -10% 0px" });
  const hover = inView ? hoverRaw : null;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 24 });
  const y = useSpring(my, { stiffness: 200, damping: 24 });

  return (
    <section
      className="relative bg-paper text-ink"
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="05" dark={false}>
              Services
            </SectionLabel>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
              One studio. <span className="serif font-normal text-signal">Every layer.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink/65 md:col-span-5">
            Strategy, design, engineering and growth under one roof — so nothing gets lost between an agency, a freelancer and a dev shop.
          </p>
        </div>

        <ul ref={list} className="mt-16 border-t border-line-ink md:mt-24" onPointerLeave={() => setHover(null)}>
          {SERVICES.map((s, i) => (
            <li key={s.slug} onPointerEnter={() => setHover(i)}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-line-ink py-6 md:grid-cols-12 md:gap-6 md:py-9"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                <span className="mono relative text-sm text-ink/40 transition-colors group-hover:pl-4 group-hover:text-volt md:col-span-1">
                  0{i + 1}
                </span>
                <span className="relative text-[clamp(1.5rem,3.6vw,3.2rem)] font-semibold tracking-[-0.035em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-paper md:col-span-6">
                  {s.name}
                </span>
                <span className="relative hidden text-ink/55 transition-colors group-hover:text-paper/60 md:col-span-4 md:block">
                  {s.short}
                </span>
                <span className="relative grid size-11 place-items-center justify-self-end rounded-full border border-line-ink transition-all duration-500 group-hover:mr-4 group-hover:rotate-[-45deg] group-hover:border-volt group-hover:bg-volt md:col-span-1">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/3] w-[22rem] overflow-hidden rounded-xl md:block"
      >
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key={hover}
              initial={{ clipPath: "inset(50% 50% 50% 50%)", scale: 1.2 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image src={SERVICES[hover].image} alt="" fill sizes="22rem" className="object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-4 pt-12 text-sm text-paper">
                {SERVICES[hover].pitch}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
