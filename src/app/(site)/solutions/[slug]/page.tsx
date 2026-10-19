import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Automation } from "@/components/home/Automation";
import { DemoFor } from "@/components/solutions/DemoFor";
import { Configurator, PainPicker, SolutionBrief, SolutionProvider } from "@/components/solutions/SolutionState";
import { Arrow, FadeIn, MagneticButton, RevealText, SectionLabel } from "@/components/ui";
import { BrandLogo } from "@/components/BrandLogo";
import { SITE } from "@/lib/site";
import { DEMO_COPY, LAUNCH_PLAN, LAUNCH_PROMISE, SOLUTIONS, getSolution } from "@/lib/solutions";
import { getProject } from "@/lib/work";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.product} — ${s.industry}`,
    description: `${s.headline} ${s.headlineAccent} ${s.short} ${LAUNCH_PROMISE}.`,
    keywords: s.keywords,
    alternates: { canonical: `/solutions/${s.slug}` },
  };
}

export default function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SolutionBody params={props.params} />
    </Suspense>
  );
}

async function SolutionBody({ params }: { params: PageProps<"/solutions/[slug]">["params"] }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const proof = s.proof.map(getProject).filter((p) => !!p);
  const copy = DEMO_COPY[s.demo];
  const others = SOLUTIONS.filter((x) => x.slug !== s.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${s.product} by ${SITE.short}`,
      serviceType: s.industry,
      description: s.sub,
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: ["IN", "US", "AU"],
      url: `${SITE.url}/solutions/${s.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <SolutionProvider s={s}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
        <div className="blueprint absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 size-[38rem] rounded-full opacity-30 blur-[140px]" style={{ background: s.accent }} />
        <div className="relative mx-auto max-w-[1400px]">
          <Link href="/solutions" className="label inline-flex items-center gap-2 text-fog transition-colors hover:text-paper">
            <Arrow className="size-3.5 rotate-180" /> All systems
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="label rounded-full px-3 py-1.5 text-ink" style={{ background: s.accent }}>
              {s.product}
            </span>
            <span className="text-fog">{s.industry}</span>
          </div>
          <h1 className="display mt-6 text-[clamp(2.9rem,9vw,8.5rem)]">
            <RevealText text={s.headline} className="block" />
            <RevealText text={s.headlineAccent} delay={0.25} className="serif block font-normal" />
          </h1>
          <FadeIn delay={0.4}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/75 md:text-xl">{s.sub}</p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton href="#quote">Get a quote</MagneticButton>
              {s.demo !== "content" && (
                <MagneticButton href="#demo" variant="ghost">
                  See it work
                </MagneticButton>
              )}
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {[`⚡ ${LAUNCH_PROMISE}`, "▦ Modules & add-ons", "✎ Customised to you", "✚ Managed for you"].map((c) => (
                <span key={c} className="rounded-full border border-line px-4 py-2 text-sm text-paper/80">
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </header>

      {s.demo === "content" ? (
        <div id="demo">
          <Automation />
        </div>
      ) : (
        <section id="demo" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
          <SectionLabel index="01">See it work</SectionLabel>
          <h2 className="display mt-6 max-w-4xl text-[clamp(2rem,4.6vw,4rem)]">
            {copy.title} <span className="serif font-normal" style={{ color: s.accent }}>{copy.accent}</span>
          </h2>
          {copy.note && <p className="mt-5 max-w-2xl text-lg text-paper/65">{copy.note}</p>}
          <div className="mt-12">
            <DemoFor demo={s.demo} />
          </div>
          <p className="mt-4 text-sm text-fog">Illustrative demo with sample data.</p>
        </section>
      )}

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <SectionLabel index="02">Sound familiar?</SectionLabel>
          <h2 className="display mb-12 mt-6 text-[clamp(2rem,4.6vw,4rem)]">
            Tap what hurts. <span className="serif font-normal text-volt">We&apos;ll show you the fix.</span>
          </h2>
          <PainPicker />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionLabel index="03">Build your system</SectionLabel>
        <h2 className="display mb-6 mt-6 text-[clamp(2rem,4.6vw,4rem)]">
          One system. <span className="serif font-normal" style={{ color: s.accent }}>Every part talks to every other.</span>
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-paper/65">
          Everything below shares one database, one login and one admin — customised to how you run. Start with the core, add modules any time.
        </p>
        <Configurator />
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <SectionLabel index="04">Two weeks to live</SectionLabel>
          <h2 className="display mb-12 mt-6 text-[clamp(2rem,4.6vw,4rem)]">
            Ideation to launch <span className="serif font-normal text-volt">in 14 days.</span>
          </h2>
          <ol className="relative grid gap-4 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-volt via-volt/40 to-volt md:block" />
            {LAUNCH_PLAN.map((p, i) => (
              <FadeIn key={p.day} delay={i * 0.1}>
                <li className="relative">
                  <span className="relative grid size-9 place-items-center rounded-full bg-volt font-bold text-ink">{i + 1}</span>
                  <p className="mono mt-5 text-sm text-volt">{p.day}</p>
                  <p className="mt-1 text-xl font-semibold">{p.title}</p>
                  <p className="mt-2 text-paper/60">{p.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm text-fog">
            Two weeks is for a focused launch. Larger systems go live module by module — the first one in two weeks, the rest in planned phases, so you&apos;re never waiting months to see results.
          </p>
        </div>
      </section>

      {(proof.length > 0 || s.forWho.length > 0) && (
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <SectionLabel index="05">Built for</SectionLabel>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.forWho.map((w) => (
              <span key={w} className="rounded-full bg-white/5 px-4 py-2 text-paper/85">
                {w}
              </span>
            ))}
          </div>
          {proof.length > 0 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {proof.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="View case" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                    <Image src={p.images.hero} alt={p.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-5 text-sm text-fog">{p.category}</p>
                  <p className="mt-1 text-2xl font-bold">{p.name}</p>
                  <p className="text-paper/60">{p.headline}</p>
                  {p.status !== "in-progress" && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {p.stats.slice(0, 2).map((st) => (
                        <p key={st.label} className="text-sm text-paper/60">
                          <span className="mr-1.5 text-xl font-bold" style={{ color: p.accent }}>
                            {st.value}
                          </span>
                          {st.label}
                        </p>
                      ))}
                    </div>
                  )}
                  {p.integrations && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.integrations.map((it) => (
                        <span key={it.name} className="flex items-center gap-1.5 rounded-full border border-line py-1 pl-1.5 pr-3 text-xs text-paper/75">
                          <BrandLogo name={it.name} size={14} />
                          {it.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <SectionLabel index="06">Questions</SectionLabel>
        </div>
        <div className="divide-y divide-line border-y border-line md:col-span-8">
          {s.faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium md:text-xl">
                {f.q}
                <span className="text-2xl text-fog transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-paper/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <SectionLabel index="07">Get a quote</SectionLabel>
          <h2 className="display mb-4 mt-6 text-[clamp(2.2rem,5vw,4.5rem)]">
            Your {s.product}, <span className="serif font-normal text-volt">quoted.</span>
          </h2>
          <p className="mb-12 max-w-xl text-paper/65">
            Everything you picked above is already in the brief. Add your details and we&apos;ll come back {SITE.replyPromise} with a scope, timeline and price.
          </p>
          <SolutionBrief />
        </div>
      </section>

      <nav className="mx-auto max-w-[1400px] px-5 py-20 md:px-10" aria-label="Other systems">
        <p className="label text-fog">Other systems</p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/solutions/${o.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-paper/30">
              <span className="block size-2 rounded-full" style={{ background: o.accent }} />
              <span className="mt-4 block text-xl font-semibold">{o.product}</span>
              <span className="text-sm text-fog">{o.industry}</span>
            </Link>
          ))}
        </div>
      </nav>
    </SolutionProvider>
  );
}
