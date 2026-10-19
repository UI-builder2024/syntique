import { BriefBuilder } from "@/components/BriefBuilder";
import { Automation } from "@/components/home/Automation";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { Packages } from "@/components/home/Packages";
import { Reel } from "@/components/home/Reel";
import { Services } from "@/components/home/Services";
import { WorkRail } from "@/components/home/WorkRail";
import { SectionLabel } from "@/components/ui";
import { FAQS } from "@/lib/services";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <Reel />
      <Manifesto />
      <WorkRail />
      <Proof />
      <Packages />
      <Process />
      <Services />
      <Automation />
      <section id="brief" className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-36">
          <SectionLabel index="07">Start a project</SectionLabel>
          <h2 className="display mb-14 mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
            Two minutes. <span className="serif font-normal text-volt">One brief.</span>
          </h2>
          <BriefBuilder />
        </div>
      </section>
      <Faq />
    </>
  );
}
