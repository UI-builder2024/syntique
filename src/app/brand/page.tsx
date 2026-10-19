import type { Metadata } from "next";

export const metadata: Metadata = { title: "Brand kit", robots: { index: false, follow: false } };

const PATH = "M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13";

function MarkSvg({ stroke, node, size }: { stroke: string; node: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d={PATH} stroke={stroke} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={36} cy={10} r={4.2} fill={node} />
      <circle cx={12} cy={38} r={4.2} fill={node} />
    </svg>
  );
}

function Lockup({ ink, node, id }: { ink: string; node: string; id: string }) {
  return (
    <div id={id} className="inline-flex items-center gap-[0.18em] p-[0.3em] text-[160px]" style={{ color: ink }}>
      <MarkSvg stroke={ink} node={node} size={190} />
      <span className="font-bold tracking-[-0.045em]">syntique</span>
    </div>
  );
}

const COLORS = [
  { name: "Ink", hex: "#0B0B0F", use: "Primary background" },
  { name: "Paper", hex: "#F3F0E8", use: "Text on ink, light sections" },
  { name: "Signal", hex: "#3D3BFF", use: "Brand accent, buttons on paper" },
  { name: "Signal soft", hex: "#9B99FF", use: "Accent text on ink" },
  { name: "Volt", hex: "#D7FF3A", use: "Highlights, nodes, primary CTA — use sparingly" },
  { name: "Fog", hex: "#9A9AA6", use: "Secondary text" },
];

// Internal brand sheet. scripts/export-brand.mjs screenshots the #logo-* and #mark-* elements to PNG.
export default function Brand() {
  return (
    <div className="brand-bg min-h-screen bg-ink px-6 py-16 md:px-16">
      <p className="label text-fog">Syntique Technologies · Brand kit</p>
      <h1 className="display mt-4 text-7xl">
        Brand <span className="serif font-normal text-volt">kit.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-paper/65">
        The mark is an S drawn as one continuous circuit trace between two nodes: syntax and technique, a signal path that becomes a
        letter. Draw it on (stroke animation) for intros; never stretch, outline or recolour the nodes outside the palette.
      </p>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="brand-bg w-max rounded-2xl border border-line p-6 lg:col-span-2">
          <Lockup id="logo-dark-bg" ink="#F3F0E8" node="#D7FF3A" />
        </div>
        <div className="brand-bg w-max rounded-2xl bg-paper p-6 lg:col-span-2">
          <Lockup id="logo-light-bg" ink="#0B0B0F" node="#3D3BFF" />
        </div>
        <div className="flex gap-6 rounded-2xl border border-line p-6">
          <div id="mark-dark-bg" className="p-4">
            <MarkSvg stroke="#F3F0E8" node="#D7FF3A" size={256} />
          </div>
          <div id="mark-light-bg" className="rounded-xl bg-paper p-4">
            <MarkSvg stroke="#0B0B0F" node="#3D3BFF" size={256} />
          </div>
        </div>
        <div id="avatar" className="grid aspect-square w-[400px] place-items-center rounded-none bg-signal">
          <MarkSvg stroke="#F3F0E8" node="#D7FF3A" size={260} />
        </div>
      </section>

      <section className="mt-20">
        <p className="label text-fog">Colour</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-2xl border border-line">
              <div className="h-32" style={{ background: c.hex }} />
              <div className="p-5">
                <p className="text-xl font-semibold">{c.name}</p>
                <p className="mono text-sm text-fog">{c.hex}</p>
                <p className="mt-2 text-sm text-paper/60">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-3">
        <div>
          <p className="label text-fog">Display · Bricolage Grotesque</p>
          <p className="display mt-4 text-6xl">Software, crafted</p>
        </div>
        <div>
          <p className="label text-fog">Accent · Instrument Serif Italic</p>
          <p className="serif mt-4 text-6xl text-signal-soft">with technique.</p>
        </div>
        <div>
          <p className="label text-fog">Labels · JetBrains Mono</p>
          <p className="label mt-6 text-lg text-paper">01 — How we work</p>
        </div>
      </section>
    </div>
  );
}
