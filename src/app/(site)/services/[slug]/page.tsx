import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefBuilder } from "@/components/BriefBuilder";
import { Automation } from "@/components/home/Automation";
import { Arrow, FadeIn, RevealText, SectionLabel } from "@/components/ui";
import { SERVICES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";
import { getProject } from "@/lib/work";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.pitch} ${s.body}`.slice(0, 300),
    keywords: s.keywords,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ServicePageBody params={props.params} />
    </Suspense>
  );
}

async function ServicePageBody({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proof = s.proof.map(getProject).filter((p) => !!p);
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.body,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: ["IN", "US", "AU"],
    url: `${SITE.url}/services/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pt-44">
        <Link href="/services" className="label inline-flex items-center gap-2 text-fog transition-colors hover:text-paper">
          <Arrow className="size-3.5 rotate-180" /> All services
        </Link>
        <div className="mt-10">
          <SectionLabel index={String(SERVICES.indexOf(s) + 1).padStart(2, "0")}>{s.short}</SectionLabel>
        </div>
        <RevealText as="h1" text={s.name} className="display mt-6 block max-w-5xl text-[clamp(3rem,8.5vw,8rem)]" />
        <FadeIn delay={0.3}>
          <p className="mt-8 max-w-3xl text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-paper/85">{s.pitch}</p>
        </FadeIn>
      </header>

      {slug === "content-automation" ? (
        <Automation />
      ) : (
        <div className="mx-auto max-w-[1500px] px-3 md:px-6">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-white/10">
            <Image src={s.image} alt={s.name} fill priority sizes="100vw" className="object-cover object-top" />
          </div>
        </div>
      )}

      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-6">
          <p className="label text-fog">How it works</p>
          <p className="mt-6 text-xl leading-relaxed text-paper/80 md:text-2xl">{s.body}</p>
          <p className="label mt-14 text-fog">What changes</p>
          <ul className="mt-5 space-y-3">
            {s.outcomes.map((o) => (
              <li key={o} className="flex items-center gap-3 text-xl font-semibold">
                <span className="size-2 rotate-45 bg-volt" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="label text-fog">What you get</p>
          <ol className="mt-6 border-t border-line">
            {s.deliverables.map((d, i) => (
              <li key={d} className="flex gap-5 border-b border-line py-4 text-lg">
                <span className="mono pt-1 text-sm text-volt">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {proof.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10">
          <p className="label text-fog">Proof</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {proof.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="View case" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                  <Image src={p.images.hero} alt={p.name} fill sizes="33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-xl font-semibold">{p.name}</p>
                <p className="text-sm text-fog">{p.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10">
          <h2 className="display mb-14 text-[clamp(2.4rem,5vw,4.5rem)]">
            Let&apos;s scope your <span className="serif font-normal text-volt">{s.short.toLowerCase()}.</span>
          </h2>
          <BriefBuilder />
        </div>
      </section>

      <nav className="mx-auto max-w-[1400px] px-5 py-20 md:px-10" aria-label="Other services">
        <p className="label text-fog">Other services</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="inline-flex rounded-full border border-line px-5 py-2.5 transition-colors hover:border-volt hover:text-volt">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
