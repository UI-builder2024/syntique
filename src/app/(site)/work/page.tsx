import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, FadeIn, RevealText, SectionLabel } from "@/components/ui";
import { PROJECTS } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — case studies",
  description:
    "Case studies from Syntique Technologies: platform rebuilds, booking engines, marketplaces, non-profit donation sites and brand experiences for clients in India, the US and Australia.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <SectionLabel index="—">Case studies</SectionLabel>
      <RevealText as="h1" text="Work that works." className="display mt-6 block text-[clamp(3.4rem,11vw,10rem)]" />
      <p className="mt-6 max-w-xl text-lg text-paper/65">
        Every project here is live and used by real people. Pick one and see how it was built — and why.
      </p>

      <div className="mt-20 grid gap-x-8 gap-y-20 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.slug} delay={(i % 2) * 0.12} className={i % 2 ? "md:mt-32" : ""}>
            <Link href={`/work/${p.slug}`} data-cursor="View case" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={p.images.hero}
                  alt={`${p.name} — ${p.category}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: p.accent, color: p.accentInk }}>
                  {p.region}
                </span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm text-fog">{p.category}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-4xl">{p.name}</h2>
                  <p className="mt-2 max-w-md text-paper/60">{p.headline}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                  <Arrow className="size-4" />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
