"use client";

import { motion } from "motion/react";
import { useLoop } from "./useLoop";

const PEOPLE = [
  { name: "Aarav", tag: "Design · 2nd yr" },
  { name: "Meera", tag: "Marketing · final yr" },
  { name: "Kabir", tag: "Dev · bootcamp" },
  { name: "Sana", tag: "Content · 1st yr" },
];
const OPPS = [
  { name: "Café launch promo", tag: "Gig · weekend" },
  { name: "Brand intern", tag: "Internship · 3 mo" },
  { name: "App beta tester", tag: "Gig · remote" },
  { name: "Mentor: UX lead", tag: "1:1 mentoring" },
];
const MATCHES: [number, number, number][] = [
  [0, 3, 94],
  [1, 1, 91],
  [2, 2, 88],
  [3, 0, 86],
];
const y = (i: number) => 14 + i * 24;

export function MatchDemo() {
  const { ref, step } = useLoop(MATCHES.length + 2, 1100, 2800);
  const done = Math.min(step, MATCHES.length);
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-ink-2 p-4 md:p-6">
      <div className="mb-4 flex justify-between">
        <p className="label text-fog">Students & talent</p>
        <p className="label text-fog">Gigs, roles & mentors</p>
      </div>
      <div className="relative h-[300px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {MATCHES.slice(0, done).map(([a, b]) => (
            <motion.path
              key={`${a}-${b}`}
              d={`M 36 ${y(a) + 6} C 50 ${y(a) + 6}, 50 ${y(b) + 6}, 64 ${y(b) + 6}`}
              fill="none"
              stroke="#7B3FF2"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
              style={{ strokeWidth: 2 }}
            />
          ))}
        </svg>
        {PEOPLE.map((p, i) => {
          const on = MATCHES.slice(0, done).some(([a]) => a === i);
          return (
            <div key={p.name} className="absolute left-0 w-[36%]" style={{ top: `${y(i)}%` }}>
              <div className={`rounded-xl border px-3 py-2 transition-colors duration-500 ${on ? "border-[#7B3FF2] bg-[#7B3FF2]/15" : "border-white/10 bg-ink"}`}>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="truncate text-[0.7rem] text-fog">{p.tag}</p>
              </div>
            </div>
          );
        })}
        {OPPS.map((o, i) => {
          const m = MATCHES.slice(0, done).find(([, b]) => b === i);
          return (
            <div key={o.name} className="absolute right-0 w-[36%]" style={{ top: `${y(i)}%` }}>
              <div className={`relative rounded-xl border px-3 py-2 transition-colors duration-500 ${m ? "border-volt bg-volt/10" : "border-white/10 bg-ink"}`}>
                <p className="truncate text-sm font-semibold">{o.name}</p>
                <p className="truncate text-[0.7rem] text-fog">{o.tag}</p>
                {m && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mono absolute -left-3 -top-2 rounded-full bg-volt px-1.5 py-0.5 text-[0.6rem] font-bold text-ink"
                  >
                    {m[2]}%
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["Applied", 128 + done * 9],
          ["Shortlisted", 34 + done * 3],
          ["Placed", 12 + done],
        ].map(([k, v]) => (
          <div key={k as string} className="rounded-xl bg-ink p-3">
            <motion.p key={v as number} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold">
              {v}
            </motion.p>
            <p className="label !text-[0.55rem] text-fog">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
