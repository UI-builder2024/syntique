"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "./useLoop";

const SESSIONS = [
  { name: "Football · Beginners", time: "Sat 7:00 am", cap: 16, start: 11 },
  { name: "Run Club · 5K", time: "Sun 6:00 am", cap: 40, start: 31 },
  { name: "Padel · Doubles", time: "Fri 7:30 pm", cap: 8, start: 5 },
  { name: "Yoga · Flow", time: "Wed 8:00 am", cap: 20, start: 14 },
];

// Each step, one booking arrives from a channel and lands in the same schedule.
const EVENTS = [
  { s: 2, ch: "WhatsApp", who: "Ananya" },
  { s: 0, ch: "Website", who: "Ritika" },
  { s: 2, ch: "Front desk", who: "Meher" },
  { s: 2, ch: "Website", who: "Zoya" },
  { s: 1, ch: "WhatsApp", who: "Tara" },
  { s: 2, ch: "Website", who: "Isha" },
];

export function BookingDemo() {
  const { ref, step } = useLoop(EVENTS.length + 3, 1100, 3000);
  const count = (i: number) => SESSIONS[i].start + EVENTS.slice(0, Math.min(step, EVENTS.length)).filter((e) => e.s === i).length;
  const ev = step > 0 && step <= EVENTS.length ? EVENTS[step - 1] : null;
  const renew = step >= EVENTS.length + 1;

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-white/10 bg-ink-2 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-fog">This week, live capacity</p>
          <span className="hidden text-xs text-fog sm:inline">Web, WhatsApp and desk in one schedule</span>
        </div>
        <ul className="space-y-2.5">
          {SESSIONS.map((s, i) => {
            const c = Math.min(count(i), s.cap);
            const full = c >= s.cap;
            const waitlist = Math.max(0, count(i) - s.cap);
            return (
              <li key={s.name} className="rounded-xl border border-white/5 bg-ink p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-fog">{s.time}</p>
                  </div>
                  <motion.span
                    key={full ? "full" : c}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className={`mono rounded-full px-2.5 py-1 text-xs ${full ? "bg-volt text-ink" : "bg-white/5 text-paper/80"}`}
                  >
                    {full ? `Full${waitlist ? ` · ${waitlist} waitlist` : ""}` : `${c}/${s.cap}`}
                  </motion.span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div className="h-full rounded-full" animate={{ width: `${(c / s.cap) * 100}%`, backgroundColor: full ? "#d7ff3a" : "#F2602B" }} transition={{ duration: 0.6 }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative min-h-[120px] rounded-2xl border border-white/10 bg-ink-2 p-4">
          <p className="label text-fog">Incoming booking</p>
          <AnimatePresence mode="wait">
            {ev ? (
              <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-3">
                <p className="text-lg font-bold">{ev.who}</p>
                <p className="text-sm text-fog">
                  via <span className="text-paper">{ev.ch}</span> → {SESSIONS[ev.s].name}
                </p>
                <p className="mono mt-2 text-[0.7rem] text-volt">✓ paid via UPI · confirmation sent</p>
              </motion.div>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-fog">
                Waiting for the next booking…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {renew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl rounded-br-sm bg-[#1f3d2b] p-4 text-sm text-[#c9f7d6]"
            >
              <span className="label mb-1 block !text-[0.55rem] opacity-70">WhatsApp · automated</span>
              Hey Kavya! Your monthly pass renews in 3 days. Tap to renew and keep your Saturday spot 🙌
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-2xl border border-white/10 bg-paper p-4 text-ink">
          <p className="label text-ink/50">CRM · this week</p>
          <p className="mt-1 text-sm text-ink/70">
            <span className="text-2xl font-bold text-ink">{Math.min(step, EVENTS.length) + 61}</span> bookings ·{" "}
            <span className="font-semibold text-ink">{renew ? 12 : 9}</span> renewals due
          </p>
        </div>
      </div>
    </div>
  );
}
