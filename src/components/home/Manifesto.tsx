"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "../ui";

const TEXT =
  "Most websites are brochures. Ours are *machines* — built around one question: what should this visitor do next? We read your legacy, map your business, design the experience and ship the code. Then we make it *grow.*";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = word.startsWith("*");
  const clean = word.replace(/\*/g, "");
  return (
    <motion.span style={{ opacity }} className={accent ? "serif font-normal text-volt" : ""}>
      {clean}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const words = TEXT.split(" ");
  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-44">
      <SectionLabel index="01">What we believe</SectionLabel>
      <p className="mt-10 text-[clamp(2rem,4.6vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
