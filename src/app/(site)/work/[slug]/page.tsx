import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollShot } from "@/components/work/ScrollShot";
import { Parallax, ScaleIn } from "@/components/work/Parallax";
import { Arrow, BrowserFrame, FadeIn, MagneticButton, RevealText } from "@/components/ui";
import { BrandLogo } from "@/components/BrandLogo";
import { SITE } from "@/lib/site";
import { PROJECTS, getProject } from "@/lib/work";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} — ${p.category}`;
  return {
    title,
    description: `${p.headline} ${p.summary}`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${title} · Case study by ${SITE.short}`, description: p.summary, images: [p.images.hero] },
  };
}

export default function CaseStudy(props: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CaseStudyBody params={props.params} />
    </Suspense>
  );
}

async function CaseStudyBody({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const host = new URL(p.url).host;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.name} — case study`,
    headline: p.headline,
    description: p.summary,
    url: `${SITE.url}/work/${p.slug}`,
    image: `${SITE.url}${p.images.hero}`,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    about: { "@type": "Organization", name: p.client, url: p.url },
  };

  return (
    <article style={{ ["--accent" as string]: p.accent }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="pointer-events-none absolute -top-40 right-0 size-[40rem] rounded-full opacity-25 blur-[140px]" style={{ background: p.accent }} />
        <div className="relative mx-auto max-w-[1400px]">
          <Link href="/work" className="label inline-flex items-center gap-2 text-fog transition-colors hover:text-paper">
            <Arrow className="size-3.5 rotate-180" /> All work
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-fog">
            <span className="size-2 rounded-full" style={{ background: p.accent }} />
            {p.category}
            {p.status === "in-progress" ? (
              <span className="rounded-full border border-volt/50 px-2.5 py-0.5 text-sm text-volt">In progress</span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 text-sm text-paper">
                <span className="live-dot size-1.5 rounded-full bg-volt" /> Live
              </span>
            )}
          </div>
          <RevealText as="h1" text={p.name} className="display mt-4 block text-[clamp(3.2rem,10vw,9.5rem)]" />
          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-3xl text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-paper/85">{p.headline}</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
              {[
                ["Client", p.client],
                ["Region", p.region + (p.year ? ` · ${p.year}` : "")],
                ["Services", p.services.join(", ")],
                ["Live", host],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-fog">{k}</dt>
                  <dd className="mt-2 text-paper/90">
                    {k === "Live" ? (
                      <a href={p.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                        {v} <Arrow className="size-3 -rotate-45" />
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </header>

      <ScaleIn className="mx-auto max-w-[1500px] px-3 md:px-6">
        <BrowserFrame src={p.images.hero} alt={`${p.name} homepage`} url={host} priority sizes="100vw" />
      </ScaleIn>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-4">
          <p className="label text-fog">The challenge</p>
        </div>
        <div className="md:col-span-8">
          <FadeIn>
            <p className="text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.03em]">{p.challenge}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg text-paper/65">{p.summary}</p>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-line">
        <div className={`mx-auto grid max-w-[1400px] grid-cols-2 ${p.stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {p.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="border-line p-6 md:border-r md:p-10 md:last:border-r-0">
              <p
                className={`display ${p.stats.length === 4 ? "text-[clamp(2.4rem,5vw,4.6rem)]" : "text-[clamp(2.8rem,7vw,6.5rem)]"}`}
                style={{ color: p.accent }}
              >
                {s.value}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-paper/65 md:text-base">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {p.integrations && (
        <section className="mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-40">
          <p className="label text-fog">Integrations</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.8rem)]">
            Everything connected. <span className="serif font-normal" style={{ color: p.accent }}>One place to run it.</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.integrations.map((it, i) => (
              <FadeIn key={it.name} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-white/[0.06]">
                    <BrandLogo name={it.name} size={26} />
                  </span>
                  <p className="mt-4 text-xl font-semibold">{it.name}</p>
                  <p className="mt-2 text-paper/60">{it.what}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <p className="label text-fog">What we did</p>
        <div className="mt-12 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {p.approach.map((a, i) => (
            <FadeIn key={a.title} delay={(i % 2) * 0.1}>
              <div className="border-t border-line pt-6">
                <span className="mono text-sm" style={{ color: p.accent }}>
                  0{i + 1}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{a.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-paper/65">{a.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: p.accent }} />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-8">
            {p.images.full ? (
              <ScrollShot src={p.images.full} alt={`${p.name} full page`} url={host} />
            ) : (
              <BrowserFrame src={p.images.extra?.[0] ?? p.images.hero} alt={`${p.name} experience`} url={host} />
            )}
          </div>
          <div className="flex justify-center md:col-span-4">
            <Parallax amount={60}>
              <div className="relative aspect-[390/844] w-[min(70vw,300px)] overflow-hidden rounded-[2.4rem] border-[7px] border-ink-3 shadow-2xl">
                <Image src={p.images.mobile} alt={`${p.name} on mobile`} fill sizes="300px" className="object-cover object-top" />
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {p.images.extra && (
        <section className="mx-auto grid max-w-[1400px] gap-4 px-5 py-20 md:grid-cols-2 md:px-10">
          {p.images.extra.map((src, i) => (
            <FadeIn key={src} delay={(i % 2) * 0.1}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                <Image src={src} alt={`${p.name} — detail ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.5s] hover:scale-105" />
              </div>
            </FadeIn>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <p className="label text-fog">Built with</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-4 py-2 text-paper/80">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap items-center gap-4 rounded-2xl border border-line p-6 md:justify-between md:p-10">
          <p className="max-w-xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Want results like {p.name}? <span className="serif font-normal text-volt">Let&apos;s talk.</span>
          </p>
          <MagneticButton href="/contact">Start a project</MagneticButton>
        </div>
      </section>

      <Link href={`/work/${next.slug}`} data-cursor="Next case" className="group relative block overflow-hidden border-t border-line">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30">
          <Image src={next.images.hero} alt="" fill sizes="100vw" className="object-cover object-top" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <p className="label text-fog">Next case study</p>
          <p className="display mt-4 flex items-center gap-6 text-[clamp(3rem,9vw,8rem)]">
            {next.name}
            <Arrow className="size-[0.5em] transition-transform duration-700 group-hover:translate-x-4" />
          </p>
        </div>
      </Link>
    </article>
  );
}
