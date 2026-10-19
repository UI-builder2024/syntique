"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton, SectionLabel } from "../ui";
import { ReelPhone } from "./ReelPhone";

const PIPE = [
  { k: "Research", d: "Studies your niche and the creators winning it." },
  { k: "Design language", d: "A look built for your brand, approved once." },
  { k: "Script", d: "Hooks and beats you sign off before anything renders." },
  { k: "Voice", d: "Your cloned voice, timed word by word." },
  { k: "Avatar", d: "Face-to-camera clips where they matter." },
  { k: "Edit", d: "Motion graphics every 2–4 seconds, mixed to platform loudness." },
  { k: "Publish", d: "9:16 reels and carousels, AI-labelled and ready." },
];

export function Automation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const a = setInterval(() => setStep((s) => (s + 1) % PIPE.length), 1500);
    return () => {
      clearInterval(a);
    };
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-[160px]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <SectionLabel index="06">Content automation</SectionLabel>
          <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
            A content engine that <span className="serif font-normal text-volt">never runs dry.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-paper/70">
            The same studio that builds your site can keep it fed. Our in-house pipeline researches, scripts, voices and edits on-brand reels and carousels — with your approval at every gate. Every reel on this phone was made by it.
          </p>
          <ol className="mt-10 space-y-1">
            {PIPE.map((p, i) => (
              <li key={p.k} className="relative flex items-start gap-4 rounded-lg px-3 py-2.5">
                {i === step && (
                  <motion.span layoutId="pipe-hl" className="absolute inset-0 rounded-lg bg-white/[0.06]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <span
                  className={`mono relative mt-1 grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] transition-colors duration-300 ${
                    i <= step ? "bg-volt text-ink" : "border border-white/20 text-fog"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="relative">
                  <span className="block font-semibold">{p.k}</span>
                  <span className={`block text-sm text-paper/55 transition-opacity ${i === step ? "opacity-100" : "opacity-60"}`}>{p.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <MagneticButton href="/solutions/content-engine">See the Content Engine</MagneticButton>
          </div>
        </div>

        <div className="flex items-center justify-center md:col-span-6">
          <ReelPhone />
        </div>
      </div>
    </section>
  );
}
