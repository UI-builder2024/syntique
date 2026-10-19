"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { Mark } from "./Logo";
import { Arrow } from "./ui";

const TYPES = [
  "Website that converts",
  "Web app / platform",
  "Booking & payments",
  "Redesign / rebrand",
  "Legacy migration",
  "Content automation",
  "Not sure yet",
];
const STAGES = ["Just an idea", "Have designs / a spec", "Live product, needs work"];
// CONFIRM: budget bands should match how the studio actually prices work.
const BUDGETS = {
  INR: ["Under ₹2.5L", "₹2.5L – ₹8L", "₹8L – ₹20L", "₹20L+", "Not sure yet"],
  USD: ["Under $3k", "$3k – $10k", "$10k – $25k", "$25k+", "Not sure yet"],
};
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

type Brief = {
  types: string[];
  stage: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  website: string; // honeypot
};

const EMPTY: Brief = { types: [], stage: "", budget: "", timeline: "", name: "", email: "", company: "", phone: "", message: "", website: "" };
const ease = [0.16, 1, 0.3, 1] as const;

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 md:px-5 md:text-base ${
        on ? "border-volt bg-volt text-ink" : "border-line text-paper/80 hover:border-paper/40 hover:text-paper"
      }`}
    >
      {on && <span className="mr-1.5">✓</span>}
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full border-b border-line bg-transparent pb-2 pt-6 text-lg outline-none transition-colors placeholder-transparent focus:border-volt";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} className={`${cls} resize-none`} />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={cls}
        />
      )}
      <span className="pointer-events-none absolute left-0 top-0 text-xs text-fog transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-xs peer-focus:text-volt">
        {label}
        {required && " *"}
      </span>
    </label>
  );
}

export type BriefPreset = { pkg?: string; modules?: string[]; pains?: string[] };

export function BriefBuilder({ compact = false, preset }: { compact?: boolean; preset?: BriefPreset }) {
  const [b, setB] = useState<Brief>(EMPTY);
  const [step, setStep] = useState(0);
  const [cur, setCur] = useState<"INR" | "USD">("INR");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<Record<string, string>>({});
  // A package configured elsewhere on the page (props) or linked in (?package=&modules=).
  const [urlPreset, setUrlPreset] = useState<BriefPreset>({});
  const pkg = preset?.pkg ?? urlPreset.pkg;
  const modules = preset?.modules ?? urlPreset.modules ?? [];
  const pains = preset?.pains ?? [];

  useEffect(() => {
    try {
      if (!Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith("Asia/Calcutta") && !Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith("Asia/Kolkata"))
        setCur("USD");
    } catch {}
    const q = new URLSearchParams(window.location.search);
    const m: Record<string, string> = { page: window.location.pathname, referrer: document.referrer };
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = q.get(k);
      if (v) m[k] = v;
    }
    setMeta(m);
    const qp = q.get("package");
    if (qp) setUrlPreset({ pkg: qp, modules: (q.get("modules") ?? "").split(",").filter(Boolean) });
  }, []);

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setB((x) => ({ ...x, [k]: v }));
  const toggleType = (t: string) =>
    set("types", b.types.includes(t) ? b.types.filter((x) => x !== t) : [...b.types, t]);

  const steps = useMemo(
    () => [
      {
        q: pkg ? "Anything else to add?" : "What are we building?",
        hint: pkg ? `Your ${pkg} system is in the brief. Add anything else, or continue.` : "Pick as many as you like.",
        ok: b.types.length > 0 || !!pkg,
      },
      { q: "Where are you today?", hint: "No wrong answers.", ok: !!b.stage },
      { q: "Budget & timeline", hint: "Ballparks are fine — it helps us plan the right team.", ok: !!b.budget && !!b.timeline },
      { q: "Where should we reply?", hint: `We reply ${SITE.replyPromise}.`, ok: b.name.trim().length > 1 && /\S+@\S+\.\S+/.test(b.email) },
    ],
    [b, pkg],
  );
  const s = steps[step];
  const last = step === steps.length - 1;

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...b,
          types: [...(pkg ? [`Package: ${pkg}`] : []), ...modules.map((m) => `+ ${m}`), ...b.types],
          message: [pains.length ? `Pain points: ${pains.join("; ")}` : "", b.message].filter(Boolean).join("\n\n"),
          currency: cur,
          meta,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  const rows = [
    ...(pkg ? [["System", `${pkg}${modules.length ? ` · ${modules.length} modules` : ""}`]] : []),
    ["Building", b.types.join(", ")],
    ["Stage", b.stage],
    ["Budget", b.budget],
    ["Timeline", b.timeline],
    ["From", [b.name, b.company].filter(Boolean).join(" · ")],
  ];

  return (
    <div className={`grid gap-10 lg:grid-cols-12 ${compact ? "" : "lg:gap-16"}`}>
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <p className="label text-volt">Brief received</p>
              <h3 className="display mt-4 text-[clamp(2.4rem,5vw,4.5rem)]">
                Thank you, {b.name.split(" ")[0]}. <span className="serif font-normal">Talk soon.</span>
              </h3>
              <ol className="mt-10 space-y-5">
                {[
                  `We read your brief and reply ${SITE.replyPromise}.`,
                  "A short call to understand the business behind the brief.",
                  "A scoped proposal with timeline, phases and price.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="mono grid size-7 shrink-0 place-items-center rounded-full bg-volt text-xs text-ink">{i + 1}</span>
                    <span className="pt-0.5 text-lg text-paper/80">{t}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <div className="flex items-center gap-4">
                <span className="mono text-sm text-fog">
                  {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-line">
                  <motion.div className="h-px bg-volt" animate={{ width: `${((step + (s.ok ? 1 : 0.4)) / steps.length) * 100}%` }} transition={{ duration: 0.6, ease }} />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease }}
                  className="mt-8 min-h-[320px]"
                >
                  <h3 className="text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-[-0.035em]">{s.q}</h3>
                  <p className="mt-2 text-fog">{s.hint}</p>
                  <div className="mt-8">
                    {step === 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {TYPES.map((t) => (
                          <Chip key={t} on={b.types.includes(t)} onClick={() => toggleType(t)}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {step === 1 && (
                      <div className="flex flex-wrap gap-2.5">
                        {STAGES.map((t) => (
                          <Chip
                            key={t}
                            on={b.stage === t}
                            onClick={() => {
                              set("stage", t);
                              setTimeout(() => setStep(2), 280);
                            }}
                          >
                            {t}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <div className="mb-3 flex items-center justify-between">
                            <span className="label text-fog">Budget</span>
                            <span className="flex rounded-full border border-line p-0.5 text-xs">
                              {(["INR", "USD"] as const).map((c) => (
                                <button
                                  type="button"
                                  key={c}
                                  onClick={() => {
                                    setCur(c);
                                    set("budget", "");
                                  }}
                                  className={`rounded-full px-3 py-1 ${cur === c ? "bg-paper text-ink" : "text-fog"}`}
                                >
                                  {c}
                                </button>
                              ))}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            {BUDGETS[cur].map((t) => (
                              <Chip key={t} on={b.budget === t} onClick={() => set("budget", t)}>
                                {t}
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="label mb-3 block text-fog">Timeline</span>
                          <div className="flex flex-wrap gap-2.5">
                            {TIMELINES.map((t) => (
                              <Chip key={t} on={b.timeline === t} onClick={() => set("timeline", t)}>
                                {t}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Your name" value={b.name} onChange={(v) => set("name", v)} required autoComplete="name" />
                        <Field label="Work email" type="email" value={b.email} onChange={(v) => set("email", v)} required autoComplete="email" />
                        <Field label="Company" value={b.company} onChange={(v) => set("company", v)} autoComplete="organization" />
                        <Field label="Phone / WhatsApp" type="tel" value={b.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
                        <div className="sm:col-span-2">
                          <Field label="Anything else? Links, goals, the problem in one line" value={b.message} onChange={(v) => set("message", v)} textarea />
                        </div>
                        <input
                          tabIndex={-1}
                          aria-hidden
                          autoComplete="off"
                          className="absolute -left-[9999px]"
                          value={b.website}
                          onChange={(e) => set("website", e.target.value)}
                          name="website"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep((x) => Math.max(0, x - 1))}
                  className={`label text-fog transition-opacity hover:text-paper ${step === 0 ? "pointer-events-none opacity-0" : ""}`}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!s.ok || status === "sending"}
                  onClick={() => (last ? submit() : setStep((x) => x + 1))}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-volt pl-7 pr-2 font-semibold text-ink transition-all disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-fog"
                >
                  {last ? (status === "sending" ? "Sending…" : "Send brief") : "Continue"}
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform group-enabled:group-hover:rotate-[-45deg]">
                    <Arrow />
                  </span>
                </button>
              </div>
              {status === "error" && (
                <p className="mt-4 text-sm text-[#ff8a73]" role="alert">
                  {error} You can also email{" "}
                  <a className="underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                  .
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-5">
        <motion.div
          layout
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-paper p-6 text-ink shadow-[0_40px_120px_-40px_rgba(215,255,58,.35)] md:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Mark size={26} color="var(--ink)" node="var(--signal)" />
              <span className="font-bold tracking-[-0.04em]">Project brief</span>
            </span>
            <span className="mono text-xs text-ink/40">#NEW-BRIEF</span>
          </div>
          <div className="mt-6 border-t border-dashed border-ink/20">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-dashed border-ink/20 py-3.5">
                <span className="label text-ink/45">{k}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={v || "empty"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`text-right text-sm font-medium ${v ? "" : "text-ink/25"}`}
                  >
                    {v || "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink/55">
            Reply {SITE.replyPromise}. No sales scripts, no generic decks — just a conversation about your project.
          </p>
          <AnimatePresence>
            {status === "done" && (
              <motion.div
                initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="absolute right-6 top-1/2 rounded-lg border-[3px] border-signal px-4 py-2 font-bold uppercase tracking-widest text-signal"
              >
                Received ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
