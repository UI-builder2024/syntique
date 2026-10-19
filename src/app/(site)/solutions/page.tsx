import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, FadeIn, MagneticButton, RevealText, SectionLabel } from "@/components/ui";
import { LAUNCH_PROMISE, MODULES, SOLUTIONS } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Systems & packages — restaurants, sports, careers, content, websites",
  description:
    "Managed, integrated systems from Syntique: Hospitality OS for restaurants (website, menu app, POS, CRM, AI voice host), Club OS for sports, Talent OS for career and gig platforms, Content Engine and Launchpad websites. Live in as little as 2 weeks.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <SectionLabel index="—">Systems & packages</SectionLabel>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9.5rem)]">
        <RevealText text="Systems," className="block" />
        <RevealText text="not just sites." delay={0.2} className="serif block font-normal text-volt" />
      </h1>
      <p className="mt-8 max-w-2xl text-lg text-paper/70 md:text-xl">
        Pick your industry. Each system is a website plus the tools that run the business behind it — CMS, CRM, bookings, POS, automations — built as one, customised to you, and managed by us. {LAUNCH_PROMISE}.
      </p>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => (
          <FadeIn key={s.slug} delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
            <Link
              href={`/solutions/${s.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line p-7 transition-colors duration-500 hover:border-transparent md:p-10"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" style={{ background: s.accent }} />
              <span className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-25 blur-3xl" style={{ background: s.accent }} />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-fog transition-colors group-hover:text-ink/60">{s.industry}</span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <Arrow />
                  </span>
                </div>
                <h2 className={`display mt-8 transition-colors group-hover:text-ink ${i === 0 ? "text-[clamp(2.6rem,6vw,5.5rem)]" : "text-[clamp(2.2rem,4vw,3.6rem)]"}`}>{s.product}</h2>
                <p className="mt-3 max-w-xl text-lg text-paper/70 transition-colors group-hover:text-ink/75">{s.short}</p>
              </div>
              <div className="relative mt-10 flex flex-wrap gap-1.5">
                {s.core.map((id) => (
                  <span key={id} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-paper/80 transition-colors group-hover:bg-ink/10 group-hover:text-ink">
                    {MODULES[id].glyph} {MODULES[id].name}
                  </span>
                ))}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <section className="mt-32">
        <SectionLabel index="+">À la carte</SectionLabel>
        <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
          Every module, <span className="serif font-normal text-volt">on its own too.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-paper/65">
          Already have a website but need a CRM? A POS that talks to your bookings? An AI voice agent on your existing number? Each module works alone and plugs into the rest later.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(MODULES).map((m) => (
            <div key={m.id} className="bg-ink p-6">
              <span className="grid size-10 place-items-center rounded-full bg-white/5 text-lg text-volt">{m.glyph}</span>
              <p className="mt-4 text-lg font-semibold">{m.name}</p>
              <p className="mt-1 text-sm text-paper/60">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-paper p-8 text-ink md:p-12">
          <p className="display max-w-2xl text-[clamp(1.8rem,3.6vw,3rem)]">
            Not sure what you need? <span className="serif font-normal text-signal">Tell us the problem.</span>
          </p>
          <MagneticButton href="/contact" variant="signal">
            Start a brief
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
