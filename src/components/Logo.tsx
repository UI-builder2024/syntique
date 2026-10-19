"use client";

import { motion } from "motion/react";

// The Syntique mark: an S drawn as one continuous circuit trace between two nodes.
// Syntax + technique — a signal path that turns into a letter.
export const MARK_PATH = "M35 10 H19 a7 7 0 0 0 -7 7 v0 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 v0 a7 7 0 0 1 -7 7 H13";

export function Mark({
  size = 32,
  animate = false,
  color = "currentColor",
  node = "var(--volt)",
  duration = 1.2,
  delay = 0,
}: {
  size?: number;
  animate?: boolean;
  color?: string;
  node?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <motion.path
        d={MARK_PATH}
        stroke={color}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx={36}
        cy={10}
        r={4.2}
        fill={node}
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.05, type: "spring", stiffness: 400, damping: 18 }}
      />
      <motion.circle
        cx={12}
        cy={38}
        r={4.2}
        fill={node}
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ delay: delay + duration, type: "spring", stiffness: 400, damping: 18 }}
      />
    </svg>
  );
}

export function Logo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark size={size} />
      <span className="text-[1.15rem] font-bold tracking-[-0.04em]">syntique</span>
    </span>
  );
}
