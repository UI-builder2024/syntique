"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Mark } from "./Logo";

// Draws the mark and counts to 100 once per browser session. Skipped for reduced motion.
export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("syn-loaded") === "1";
      sessionStorage.setItem("syn-loaded", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    (window as unknown as { __synPre?: boolean }).__synPre = true;
    const start = performance.now();
    const total = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="syn-preloader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <Mark size={88} animate duration={1.1} />
          <div className="mono mt-8 flex items-center gap-3 text-xs text-fog">
            <span>compiling experience</span>
            <span className="w-10 text-right tabular-nums text-paper">{String(n).padStart(3, "0")}</span>
          </div>
          <div className="mt-3 h-px w-48 overflow-hidden bg-white/10">
            <div className="h-full bg-volt" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
