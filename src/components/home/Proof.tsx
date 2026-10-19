"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PROJECTS, TESTIMONIALS, type Project } from "@/lib/work";
import { Arrow, SectionLabel } from "../ui";
import { BrandLogo, SHIPPED_INTEGRATIONS } from "../BrandLogo";

// The client systems we can show running in production, drawn as what they are:
// a front end, one custom core the team operates from, and the integrations it drives.
const SYSTEMS: { slug: string; front: string; who: string }[] = [
  { slug: "sisters-in-sweat", front: "Website & booking app", who: "13,164 members" },
  { slug: "chitrapur-heritage-foundation", front: "Donation website", who: "US donors" },
];

function Pulse({ vertical, delay, color }: { vertical?: boolean; delay: number; color: string }) {
  return (
    <motion.span
      className="absolute size-1.5 rounded-full"
      style={{ background: color, boxShadow: `0 0 10px ${color}`, ...(vertical ? { left: "calc(50% - 3px)" } : { top: "calc(50% - 3px)" }) }}
      initial={vertical ? { top: "0%", opacity: 0 } : { left: "0%", opacity: 0 }}
      animate={vertical ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function Link_({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <>
      <span className="relative mx-auto block h-8 w-px bg-white/15 lg:hidden">
        <Pulse vertical delay={delay} color={color} />
      </span>
      <span className="relative hidden h-px w-10 shrink-0 self-center bg-white/15 lg:block xl:w-14">
        <Pulse delay={delay} color={color} />
      </span>
    </>
  );
}

function SystemCard({ p, front, who }: { p: Project; front: string; who: string }) {
  const [core, ...rest] = p.integrations ?? [];
  return (
    <div className="rounded-3xl border border-line bg-ink p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label flex items-center gap-2 text-fog">
            <span className="live-dot size-1.5 rounded-full bg-volt" /> Live in production
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{p.name}</p>
        </div>
        <Link href={`/work/${p.slug}`} className="label inline-flex items-center gap-2 text-fog transition-colors hover:text-paper">
          Case study <Arrow />
        </Link>
      </div>

      {/* the system */}
      <div className="mt-8 flex flex-col items-stretch lg:flex-row lg:items-center">
        <div className="rounded-2xl border border-white/10 bg-ink-2 p-4 text-center lg:w-44 lg:shrink-0">
          <p className="label text-fog">{who}</p>
          <p className="mt-1 font-semibold">{front}</p>
        </div>
        <Link_ color={p.accent} />
        <div className="rounded-2xl p-5 text-center text-ink lg:w-56 lg:shrink-0" style={{ background: p.accent }}>
          <span className="mx-auto mb-2 grid size-10 place-items-center rounded-xl bg-ink">
            {core && <BrandLogo name={core.name} size={22} />}
          </span>
          <p className="label opacity-60">Custom core</p>
          <p className="mt-1 text-lg font-bold leading-tight">{core?.name}</p>
          <p className="mt-1 text-xs leading-snug opacity-75">One dashboard the team runs everything from</p>
        </div>
        <Link_ color={p.accent} delay={0.5} />
        <div className={`grid flex-1 gap-2 ${rest.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {rest.map((it, i) => (
            <div key={it.name} className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-ink-2 px-4 py-3">
              <motion.span
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.06]"
                animate={{ boxShadow: [`0 0 0 0 ${p.accent}00`, `0 0 0 3px ${p.accent}66`, `0 0 0 0 ${p.accent}00`] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.9 + i * 0.25 }}
              >
                <BrandLogo name={it.name} size={18} />
              </motion.span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{it.name}</p>
                <p className="text-xs leading-snug text-paper/55">{it.what}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* what it has done */}
      <div className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ${p.stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        {p.stats.map((s) => (
          <div key={s.label} className="bg-ink-2 p-4 md:p-5">
            <p className="display text-[clamp(1.8rem,3.2vw,2.8rem)]" style={{ color: p.accent }}>
              {s.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-paper/60 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Proof() {
  const quotes = TESTIMONIALS.filter((t) => !t.draft || process.env.NODE_ENV === "development");
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="—">Systems in production</SectionLabel>
      <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(2.4rem,5.4vw,5rem)] md:col-span-8">
          Not websites. <span className="serif font-normal text-volt">Systems that run the business.</span>
        </h2>
        <p className="text-lg text-paper/65 md:col-span-4">
          Every build is shaped around how the client actually operates — one custom core their team works from, wired into the payments, messaging, CRM and accounting tools the business depends on.
        </p>
      </div>
      <div className="mt-12 grid gap-5">
        {SYSTEMS.map(({ slug, front, who }) => {
          const p = PROJECTS.find((x) => x.slug === slug)!;
          return <SystemCard key={slug} p={p} front={front} who={who} />;
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-line px-5 py-6 md:px-8">
        <p className="text-center text-fog">Integrations we&apos;ve shipped to production</p>
        <ul className="mt-5 flex flex-wrap items-start justify-center gap-x-8 gap-y-5">
          {SHIPPED_INTEGRATIONS.map((n) => (
            <li key={n} className="flex w-16 flex-col items-center gap-2 text-center">
              <BrandLogo name={n} size={26} />
              <span className="text-[0.68rem] leading-tight text-fog">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {quotes.length > 0 && (
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.role} className="relative rounded-2xl border border-line p-8">
              {q.draft && <span className="label absolute right-4 top-4 rounded bg-[#ff6b4a] px-2 py-0.5 text-ink">Draft · dev only</span>}
              <span className="serif block text-6xl leading-none text-volt">&ldquo;</span>
              <blockquote className="mt-2 text-lg leading-relaxed text-paper/85">{q.quote}</blockquote>
              <figcaption className="mt-6">
                <span className="block font-semibold">{q.name}</span>
                <span className="text-sm text-fog">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
