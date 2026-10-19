import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, FadeIn, RevealText, SectionLabel } from "@/components/ui";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — websites, platforms, modernisation & content automation",
  description:
    "Conversion websites, product and platform engineering, legacy modernisation, brand and experience design, CMS and admin systems, and AI content automation — from one studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <SectionLabel index="—">Services</SectionLabel>
      <RevealText as="h1" text="Every layer, one studio." className="display mt-6 block text-[clamp(3.2rem,9vw,8.5rem)]" />
      <p className="mt-6 max-w-xl text-lg text-paper/65">
        Strategy, design, engineering and growth — so nothing gets lost in the hand-offs between agencies, freelancers and dev shops.
      </p>
      <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.slug} delay={(i % 3) * 0.08}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-line p-7 transition-colors duration-500 hover:border-volt/60 hover:bg-white/[0.03] md:p-9"
            >
              <div>
                <span className="mono text-sm text-volt">0{i + 1}</span>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">{s.name}</h2>
                <p className="mt-4 text-paper/65">{s.pitch}</p>
              </div>
              <span className="label mt-10 inline-flex items-center gap-2 text-fog transition-colors group-hover:text-paper">
                Explore <Arrow />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
