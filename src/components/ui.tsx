"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "volt" | "signal" | "ghost" | "paper";
  className?: string;
  onClick?: () => void;
  full?: boolean;
};

const VARIANTS = {
  volt: "bg-volt text-ink",
  signal: "bg-signal text-paper",
  paper: "bg-paper text-ink",
  ghost: "border border-line text-paper hover:border-paper/40",
};

// A pill button that leans toward the pointer and rolls its label on hover.
export function MagneticButton({ href, children, variant = "volt", className = "", onClick, full = false }: BtnProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18 });
  const y = useSpring(my, { stiffness: 250, damping: 18 });
  return (
    <motion.span style={{ x, y }} className={full ? "block" : "inline-block"}>
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left - r.width / 2) * 0.25);
          my.set((e.clientY - r.top - r.height / 2) * 0.35);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className={`group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 text-[0.95rem] font-semibold transition-[colors,transform] active:scale-[0.97] ${full ? "h-14 w-full justify-between" : ""} ${VARIANTS[variant]} ${className}`}
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
            {children}
          </span>
          <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
            {children}
          </span>
        </span>
        <span
          className={`grid size-8 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-45deg] ${
            variant === "ghost" ? "bg-paper text-ink" : "bg-ink text-paper"
          }`}
        >
          <Arrow />
        </span>
      </Link>
    </motion.span>
  );
}

export function Arrow({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Splits text into words that rise out of a mask when scrolled into view.
export function RevealText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({
  children,
  speed = 40,
  className = "",
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className="marquee-track flex shrink-0"
        style={{ ["--marquee-speed" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SectionLabel({ index, children, dark = true }: { index: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`label flex items-center gap-3 ${dark ? "text-fog" : "text-ink/60"}`}>
      <span className={dark ? "text-volt" : "text-signal"}>{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-line" : "bg-line-ink"}`} />
      <span>{children}</span>
    </div>
  );
}

// A browser chrome around a screenshot. Used for every project shot so the work reads as live product.
export function BrowserFrame({
  src,
  alt,
  url,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/5 bg-ink-3 px-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="mono mx-auto flex h-5 min-w-0 max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/5 px-3 text-[0.65rem] text-fog">
          <svg viewBox="0 0 12 12" className="size-2.5 shrink-0" aria-hidden>
            <path d="M3 5V4a3 3 0 0 1 6 0v1M2.5 5h7v5h-7z" stroke="currentColor" fill="none" strokeWidth="1.2" />
          </svg>
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
