import { MagneticButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="blueprint flex min-h-[90vh] flex-col items-center justify-center px-5 text-center">
      <p className="mono text-sm text-fog">404 · route not found</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">
        Off the <span className="serif font-normal text-volt">map.</span>
      </h1>
      <p className="mt-6 max-w-md text-paper/65">This page doesn&apos;t exist — but the thing you&apos;re building might. Let&apos;s talk about it.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <MagneticButton href="/">Back home</MagneticButton>
        <MagneticButton href="/contact" variant="ghost">
          Start a project
        </MagneticButton>
      </div>
    </div>
  );
}
