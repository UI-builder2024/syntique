import type { Metadata } from "next";
import { BriefBuilder } from "@/components/BriefBuilder";
import { RevealText, SectionLabel } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description: `Tell us what you're building. ${SITE.name} replies ${SITE.replyPromise} with questions or a call slot — then a scoped proposal.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-20 size-[40rem] rounded-full bg-signal/20 blur-[160px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-28 pt-36 md:px-10 md:pt-44">
        <SectionLabel index="—">Start a project</SectionLabel>
        <RevealText as="h1" text="Tell us what you're building." className="display mt-6 block max-w-5xl text-[clamp(3rem,8vw,7.5rem)]" />
        <p className="mb-16 mt-6 max-w-xl text-lg text-paper/65">
          Two minutes, four questions. Prefer email? Write to{" "}
          <a href={`mailto:${SITE.email}`} className="text-paper underline decoration-volt underline-offset-4">
            {SITE.email}
          </a>
          {SITE.whatsapp && (
            <>
              {" "}or{" "}
              <a href={`https://wa.me/${SITE.whatsapp}`} className="text-paper underline decoration-volt underline-offset-4">
                message us on WhatsApp
              </a>
            </>
          )}
          .
        </p>
        <BriefBuilder />
      </div>
    </div>
  );
}
