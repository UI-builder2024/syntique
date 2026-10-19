"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "../ui";

const STEPS = [
  {
    key: "discover",
    title: "Discover",
    line: "We read before we write.",
    body: "Your legacy code, your data, your customers. Every business rule gets traced to its source before anything is replaced.",
  },
  {
    key: "architect",
    title: "Architect",
    line: "Map the machine.",
    body: "Domain model, integrations and a decision log — so every choice is written down and nothing is a surprise later.",
  },
  {
    key: "design",
    title: "Design",
    line: "Make it felt.",
    body: "Identity, interface and motion designed together, around the one action each page exists for.",
  },
  {
    key: "engineer",
    title: "Engineer",
    line: "Ship real software.",
    body: "Typed, tested, documented. Weekly demos of working product — never a slideshow of promises.",
  },
  {
    key: "launch",
    title: "Launch",
    line: "Go live calmly.",
    body: "Runbooks, QA audits and staged cutovers. Launch day should be the most boring day of the project.",
  },
  {
    key: "grow",
    title: "Grow",
    line: "Then make it compound.",
    body: "SEO, analytics, conversion tweaks and an automated content engine that keeps people coming back.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function StageDiscover() {
  const notes = [
    { t: "common.cs → IncrmentID()", x: "6%", y: "10%", r: -4 },
    { t: "37 DynamoDB tables", x: "52%", y: "8%", r: 3 },
    { t: "GST = SGST  // bug", x: "12%", y: "46%", r: 2 },
    { t: "login: phone, no OTP ⚠", x: "48%", y: "38%", r: -2, hot: true },
    { t: "cart total trusted from client ⚠", x: "20%", y: "74%", r: -3, hot: true },
    { t: "SlotReservationService ✓ keep", x: "54%", y: "68%", r: 2, good: true },
  ];
  return (
    <div className="blueprint absolute inset-0">
      {notes.map((n, i) => (
        <motion.div
          key={n.t}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: n.r }}
          transition={{ delay: i * 0.08, duration: 0.6, ease }}
          className={`mono absolute rounded-md border px-3 py-2 text-[clamp(0.6rem,1.1vw,0.8rem)] shadow-xl ${
            n.hot
              ? "border-[#ff6b4a]/50 bg-[#ff6b4a]/15 text-[#ffb3a3]"
              : n.good
                ? "border-volt/50 bg-volt/10 text-volt"
                : "border-white/10 bg-ink-3 text-paper/80"
          }`}
          style={{ left: n.x, top: n.y }}
        >
          {n.t}
        </motion.div>
      ))}
    </div>
  );
}

function StageArchitect() {
  const nodes = [
    { id: "Customer", x: 12, y: 18 },
    { id: "Booking engine", x: 50, y: 18 },
    { id: "Payments", x: 82, y: 18 },
    { id: "PostgreSQL", x: 50, y: 52 },
    { id: "CMS / Admin", x: 16, y: 82 },
    { id: "WhatsApp", x: 50, y: 82 },
    { id: "CRM", x: 84, y: 82 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [2, 3],
  ];
  return (
    <div className="blueprint absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="var(--signal-soft)"
            strokeWidth={0.35}
            strokeDasharray="1 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
          className={`mono absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-3 py-2 text-[clamp(0.6rem,1.1vw,0.8rem)] ${
            i === 1 || i === 3 ? "border-signal bg-signal text-paper" : "border-white/15 bg-ink-3 text-paper/85"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.id}
        </motion.div>
      ))}
    </div>
  );
}

function StageDesign() {
  return (
    <div className="absolute inset-0 bg-paper p-[5%] text-ink">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="h-3 w-20 rounded bg-ink" />
        <div className="flex gap-2">
          <div className="h-3 w-10 rounded bg-ink/20" />
          <div className="h-3 w-10 rounded bg-ink/20" />
          <motion.div
            className="h-3 w-14 rounded"
            initial={{ backgroundColor: "rgba(11,11,15,.2)" }}
            animate={{ backgroundColor: "#3d3bff" }}
            transition={{ delay: 0.9 }}
          />
        </div>
      </motion.div>
      <div className="mt-[6%] grid grid-cols-5 gap-[4%]">
        <div className="col-span-3">
          <motion.p
            className="text-[clamp(1.1rem,3.2vw,2.6rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
          >
            Find your game. <span className="serif font-normal text-signal">Book in a tap.</span>
          </motion.p>
          <div className="mt-[8%] space-y-2">
            <div className="h-2 w-4/5 rounded bg-ink/15" />
            <div className="h-2 w-3/5 rounded bg-ink/15" />
          </div>
          <motion.div
            className="mt-[8%] inline-flex h-[clamp(1.6rem,3vw,2.4rem)] items-center rounded-full px-[6%] text-[clamp(0.55rem,1vw,0.8rem)] font-semibold"
            initial={{ backgroundColor: "rgba(11,11,15,.1)", color: "rgba(11,11,15,0)" }}
            animate={{ backgroundColor: "#d7ff3a", color: "#0b0b0f" }}
            transition={{ delay: 1.1 }}
          >
            Book now →
          </motion.div>
        </div>
        <motion.div
          className="col-span-2 aspect-[4/5] rounded-xl"
          initial={{ background: "repeating-linear-gradient(45deg, rgba(11,11,15,.08) 0 6px, transparent 6px 12px)" }}
          animate={{ background: "linear-gradient(160deg, #3d3bff, #9b99ff 60%, #d7ff3a)" }}
          transition={{ delay: 0.7, duration: 0.9 }}
        />
      </div>
      <div className="label absolute bottom-[5%] left-[5%] flex gap-2 text-ink/50">
        {["#0B0B0F", "#F3F0E8", "#3D3BFF", "#D7FF3A"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.08 }}
            className="size-5 rounded-full border border-ink/10"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}

const CODE: [string, string][][] = [
  [["k", "export async function "], ["f", "reserveSlot"], ["p", "(session, seats) {"]],
  [["c", "  // atomic + idempotent: a session can never oversell"]],
  [["k", "  return "], ["p", "db.transaction(async (tx) => {"]],
  [["k", "    const "], ["p", "left = await capacity(tx, session);"]],
  [["k", "    if "], ["p", "(left < seats) "], ["k", "throw new "], ["f", "SoldOut"], ["p", "();"]],
  [["k", "    return "], ["p", "tx.insert(bookings).values({ session, seats });"]],
  [["p", "  });"]],
  [["p", "}"]],
];

const TONE: Record<string, string> = { k: "text-signal-soft", f: "text-volt", c: "text-fog", p: "text-paper/85" };

function StageEngineer() {
  return (
    <div className="absolute inset-0 grid grid-rows-[1fr_auto] bg-[#0d0d13]">
      <div className="mono overflow-hidden whitespace-pre p-[5%] text-[clamp(0.55rem,1.1vw,0.9rem)] leading-[1.9]">
        {CODE.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.09 }}>
            <span className="mr-4 inline-block w-4 text-right text-white/20">{i + 1}</span>
            {line.map(([k, t], j) => (
              <span key={j} className={TONE[k]}>
                {t}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease }}
        className="mono border-t border-white/10 bg-ink px-[5%] py-3 text-[clamp(0.6rem,1vw,0.8rem)]"
      >
        <span className="text-fog">$ npm test && npm run build</span>
        <br />
        <span className="text-volt">✓ tests passed · ✓ build compiled · ✓ preview deployed</span>
      </motion.div>
    </div>
  );
}

function StageLaunch() {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="absolute inset-0"
      >
        <Image src="/work/sisters-in-sweat/desktop.webp" alt="Sisters In Sweat live site" fill sizes="50vw" className="object-cover object-top" />
      </motion.div>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 22 }}
        className="absolute right-[4%] top-[5%] flex items-center gap-3 rounded-xl border border-white/10 bg-ink/90 px-4 py-3 shadow-2xl backdrop-blur"
      >
        <span className="live-dot size-2 rounded-full bg-volt" />
        <span className="text-[clamp(0.65rem,1.1vw,0.85rem)]">
          <span className="block font-semibold">Deployed to production</span>
          <span className="mono block text-fog">sistersinsweat.com</span>
        </span>
      </motion.div>
    </div>
  );
}

function StageGrow() {
  return (
    <div className="blueprint absolute inset-0 p-[5%]">
      <div className="text-sm font-medium text-fog">Organic sessions (illustrative)</div>
      <svg viewBox="0 0 300 120" className="mt-4 h-[52%] w-full overflow-visible">
        <motion.path
          d="M0 110 C40 105 60 100 90 92 S140 70 170 62 S230 30 300 8"
          fill="none"
          stroke="var(--volt)"
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease }}
        />
        <motion.path
          d="M0 110 C40 105 60 100 90 92 S140 70 170 62 S230 30 300 8 V120 H0Z"
          fill="url(#g)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d7ff3a" stopOpacity="0.3" />
            <stop offset="1" stopColor="#d7ff3a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-[6%] left-[5%] right-[5%] flex gap-3">
        {["SEO", "Reels", "Leads"].map((t, i) => (
          <motion.div
            key={t}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease }}
            className="flex-1 rounded-lg border border-white/10 bg-ink-3 px-3 py-2"
          >
            <span className="label text-fog">{t}</span>
            <span className="mt-1 block text-[clamp(0.9rem,2vw,1.5rem)] font-bold text-volt">↑</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const STAGES = [StageDiscover, StageArchitect, StageDesign, StageEngineer, StageLaunch, StageGrow];
const URLS = ["notes://legacy-audit", "diagram://architecture", "figma://design-system", "localhost:3000", "https://sistersinsweat.com", "analytics://growth"];

function ProcessPinned() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length))));
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const Stage = STAGES[active];

  return (
    <section id="process" ref={ref} className="relative bg-ink-2" style={{ height: `${STEPS.length * 75 + 25}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-5 md:grid-cols-12 md:gap-12 md:px-10">
          <div className="md:col-span-5">
            <SectionLabel index="04">How we work</SectionLabel>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.6vw,4.2rem)]">
              From <span className="serif font-normal">signal</span> to system.
            </h2>
            <div className="relative mt-8 md:mt-12">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line">
                <motion.div style={{ height: fill }} className="w-px bg-volt" />
              </div>
              <ol className="space-y-1 md:space-y-2">
                {STEPS.map((s, i) => (
                  <li key={s.key} className="relative pl-8">
                    <span
                      className={`absolute left-0 top-[0.55em] size-[11px] rounded-full border transition-colors duration-500 ${
                        i <= active ? "border-volt bg-volt" : "border-white/25 bg-ink-2"
                      }`}
                    />
                    <div className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-35"}`}>
                      <div className="flex items-baseline gap-3">
                        <span className="mono text-xs text-fog">0{i + 1}</span>
                        <span className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</span>
                        <span className="serif hidden text-lg text-paper/60 lg:inline">{s.line}</span>
                      </div>
                      <AnimatePresence initial={false}>
                        {i === active && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease }}
                            className="max-w-md overflow-hidden text-sm leading-relaxed text-paper/65 md:text-base"
                          >
                            <span className="block pb-2 pt-1">{s.body}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="md:col-span-7 md:self-center">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_60px_160px_-40px_rgba(61,59,255,.45)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-white/5 bg-ink-3 px-3">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="mono mx-auto rounded bg-white/5 px-3 py-0.5 text-[0.65rem] text-fog">{URLS[active]}</span>
                <span className="label text-volt">{String(active + 1).padStart(2, "0")}/06</span>
              </div>
              <div className="relative aspect-[16/11] md:aspect-[16/10]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <Stage />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Desktop pins one browser window and swaps stages as you scroll; phones get one card per step,
// each playing its stage animation as it scrolls into view.
export function Process() {
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop ? <ProcessPinned /> : <ProcessSteps />;
}

function StepCard({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const s = STEPS[i];
  const Stage = STAGES[i];
  return (
    <div ref={ref} className="relative pl-10">
      <span
        className={`absolute left-0 top-1 grid size-7 place-items-center rounded-full border text-xs font-bold transition-colors duration-500 ${
          inView ? "border-volt bg-volt text-ink" : "border-white/20 bg-ink-2 text-fog"
        }`}
      >
        {i + 1}
      </span>
      <p className="text-2xl font-semibold tracking-tight">
        {s.title} <span className="serif text-lg font-normal text-paper/55">{s.line}</span>
      </p>
      <p className="mt-2 text-paper/65">{s.body}</p>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_30px_80px_-30px_rgba(61,59,255,.5)]">
        <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-ink-3 px-3">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="mono ml-auto text-[0.6rem] text-fog">{URLS[i]}</span>
        </div>
        <div className="relative aspect-[16/11]">{inView ? <Stage /> : <div className="blueprint absolute inset-0" />}</div>
      </div>
    </div>
  );
}

function ProcessSteps() {
  return (
    <section id="process" className="relative bg-ink-2 px-4 py-20">
      <SectionLabel index="04">How we work</SectionLabel>
      <h2 className="display mt-5 text-[2.6rem]">
        From <span className="serif font-normal">signal</span> to system.
      </h2>
      <div className="relative mt-10 space-y-12">
        <span className="absolute bottom-0 left-[13px] top-2 w-px bg-gradient-to-b from-volt via-volt/30 to-transparent" />
        {STEPS.map((_, i) => (
          <StepCard key={i} i={i} />
        ))}
      </div>
    </section>
  );
}
