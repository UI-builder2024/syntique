"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Parallax({ children, amount = 80, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function ScaleIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={{ scale, rotateX }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}
