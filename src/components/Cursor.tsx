"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A volt dot that trails the pointer. Elements with data-cursor="Label" grow it into a labelled disc.
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(!!t?.closest("a,button,[role=button],input,textarea,select,label"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 88 : hover ? 36 : 12;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full text-ink mix-blend-normal"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", borderStyle: "solid", borderColor: "var(--volt)" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: hover && !label ? "rgba(215,255,58,0)" : "rgba(215,255,58,1)",
        borderWidth: hover && !label ? 1.5 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span
        className="label whitespace-nowrap !text-[0.65rem] font-semibold"
        style={{ opacity: label ? 1 : 0, transition: "opacity .2s" }}
      >
        {label}
      </span>
    </motion.div>
  );
}
