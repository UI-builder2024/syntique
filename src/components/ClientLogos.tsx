import Image from "next/image";
import Link from "next/link";

// White, transparent client marks (public/logos/clients), sized to a shared optical height.
export const CLIENT_LOGOS = [
  { slug: "sisters-in-sweat", name: "Sisters In Sweat", src: "/logos/clients/sis.png", w: 260, h: 160, scale: 1.45 },
  { slug: "timbuckdo", name: "TimBuckDo", src: "/logos/clients/timbuckdo.png", w: 481, h: 160, scale: 1 },
  { slug: "chitrapur-heritage-foundation", name: "Chitrapur Heritage Foundation", src: "/logos/clients/chf.png", w: 160, h: 160, scale: 1.1, label: "CHF USA" },
  { slug: "careerview", name: "CareerView", src: "/logos/clients/careerview.png", w: 1099, h: 160, scale: 0.85 },
  { slug: "four-states", name: "Four States", src: "/logos/clients/fourstates.svg", w: 330, h: 64, scale: 0.75 },
];

export function ClientLogoRow({ height = 38 }: { height?: number }) {
  return (
    <>
      {CLIENT_LOGOS.map((c) => (
        <Link
          key={c.slug}
          href={`/work/${c.slug}`}
          aria-label={c.name}
          className="flex shrink-0 items-center gap-2.5 px-7 opacity-75 transition-opacity duration-300 hover:opacity-100 md:px-10"
        >
          <Image
            src={c.src}
            alt={c.name}
            width={c.w}
            height={c.h}
            style={{ height: height * c.scale, width: "auto" }}
            className="select-none"
            draggable={false}
          />
          {c.label && <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-paper">{c.label}</span>}
        </Link>
      ))}
    </>
  );
}
