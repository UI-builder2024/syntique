"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Steps through 0..steps-1 on a fixed beat while the element is on screen, then loops after a pause.
export function useLoop(steps: number, beat = 1100, rest = 2600) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps), step === steps - 1 ? rest : beat);
    return () => clearTimeout(t);
  }, [inView, step, steps, beat, rest]);
  return { ref, step };
}
