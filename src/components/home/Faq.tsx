"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/lib/services";
import { SectionLabel } from "../ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
      <div className="md:col-span-4">
        <SectionLabel index="08">Questions</SectionLabel>
        <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4rem)]">
          Good <span className="serif font-normal">questions.</span>
        </h2>
      </div>
      <ul className="border-t border-line md:col-span-8">
        {FAQS.map((f, i) => (
          <li key={f.q} className="border-b border-line">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-2xl"
            >
              {f.q}
              <span className="relative grid size-8 shrink-0 place-items-center">
                <span className="absolute h-px w-4 bg-current" />
                <motion.span animate={{ rotate: open === i ? 0 : 90 }} className="absolute h-px w-4 bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-paper/65 md:text-lg">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
}
