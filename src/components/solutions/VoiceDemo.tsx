"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "./useLoop";

type Line = { who: "host" | "guest"; text: string };
// step -> what is on screen. Steps 0..10.
const LINES: (Line & { at: number })[] = [
  { at: 1, who: "host", text: "Good evening, Saffron & Co. How can I help?" },
  { at: 2, who: "guest", text: "Hi! Table for four tomorrow, around 8:30?" },
  { at: 3, who: "host", text: "Let me check the floor…" },
  { at: 5, who: "host", text: "I have a window table for four at 8:30. Shall I book it under Priya?" },
  { at: 6, who: "guest", text: "Perfect. One of us is vegan." },
  { at: 8, who: "host", text: "Noted for the kitchen. You'll get a WhatsApp confirmation now. See you tomorrow!" },
];

// Floor plan: seats, occupied tonight?
const TABLES = [
  { id: "T1", seats: 2, busy: true },
  { id: "T2", seats: 2, busy: false },
  { id: "T3", seats: 4, busy: true },
  { id: "T4", seats: 4, busy: true },
  { id: "T5", seats: 6, busy: false },
  { id: "T6", seats: 2, busy: true },
  { id: "T7", seats: 4, busy: false },
  { id: "T8", seats: 4, busy: true },
  { id: "T9", seats: 8, busy: true },
];

export function VoiceDemo() {
  const { ref, step } = useLoop(11, 1250, 3200);
  const scanning = step >= 3 && step < 5;
  const booked = step >= 7;
  const shown = LINES.filter((l) => l.at <= step).slice(-3);

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-[1.1fr_1fr]">
      {/* Call */}
      <div className="flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative grid size-9 place-items-center rounded-full bg-volt text-ink">
              ✆
              {step >= 1 && step < 10 && <span className="live-dot absolute inset-0 rounded-full" />}
            </span>
            <div>
              <p className="text-sm font-semibold">{step === 0 ? "Incoming call…" : step >= 10 ? "Call ended · booked" : "AI host on the line"}</p>
              <p className="mono text-[0.65rem] text-fog">+91 98••• ••210 · 9:42 pm · 24/7</p>
            </div>
          </div>
          <div className="flex h-6 items-end gap-[3px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-volt"
                animate={{ height: step >= 1 && step < 10 ? ["20%", `${30 + ((i * 37) % 70)}%`, "20%"] : "15%" }}
                transition={{ duration: 0.6 + (i % 4) * 0.12, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 p-4">
          <AnimatePresence initial={false}>
            {shown.map((l) => (
              <motion.div
                key={l.text}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                  l.who === "host" ? "self-start rounded-bl-sm bg-white/[0.07]" : "self-end rounded-br-sm bg-signal text-paper"
                }`}
              >
                <span className="label mb-0.5 block !text-[0.55rem] opacity-60">{l.who === "host" ? "AI host" : "Guest"}</span>
                {l.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {step >= 9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="self-end rounded-2xl rounded-br-sm bg-[#1f3d2b] px-3.5 py-2.5 text-sm text-[#c9f7d6]"
              >
                <span className="label mb-0.5 block !text-[0.55rem] opacity-70">WhatsApp</span>
                ✓ Confirmed: table for 4 · Sat 8:30 pm · window. Reply C to change.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* POS + CRM */}
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-white/10 bg-ink-2 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-fog">POS floor, Sat 8:30 pm</p>
            <AnimatePresence>
              {scanning && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mono text-[0.65rem] text-volt">
                  checking availability…
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TABLES.map((t) => {
              const candidate = scanning && !t.busy && t.seats >= 4;
              const mine = booked && t.id === "T7";
              return (
                <motion.div
                  key={t.id}
                  animate={{
                    backgroundColor: mine ? "#d7ff3a" : t.busy ? "rgba(243,240,232,.12)" : "rgba(0,0,0,0)",
                    borderColor: candidate || mine ? "#d7ff3a" : "rgba(243,240,232,.15)",
                    scale: mine ? [1, 1.08, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`flex aspect-[4/3] flex-col items-center justify-center rounded-lg border text-xs ${mine ? "text-ink" : "text-paper/80"}`}
                >
                  <span className="font-semibold">{t.id}</span>
                  <span className="opacity-60">{mine ? "Priya · 4" : t.busy ? "seated" : `${t.seats} seats`}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-2xl border border-white/10 bg-paper p-4 text-ink"
            >
              <div className="flex items-center justify-between">
                <p className="label text-ink/50">CRM · guest profile</p>
                <span className="rounded-full bg-signal px-2 py-0.5 text-[0.65rem] font-semibold text-paper">Regular</span>
              </div>
              <p className="mt-2 text-lg font-bold">Priya S.</p>
              <p className="text-sm text-ink/60">3rd visit · prefers window · 1 vegan in party</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
