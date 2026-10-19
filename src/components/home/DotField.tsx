"use client";

import { useEffect, useRef } from "react";

// A grid of dots that light up and part around the pointer, with occasional "signal" pulses
// travelling across the grid — the visual metaphor for a site that responds to its visitor.
export function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const gap = 26;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf = 0;
    let visible = true;
    const pulses: { x: number; y: number; r: number; born: number }[] = [];
    let lastPulse = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      pulses.push({ x, y, r: 0, born: performance.now() });
      if (e.pointerType !== "mouse") {
        pointer.tx = x;
        pointer.ty = y;
        clearTimeout(touchTimer);
        touchTimer = window.setTimeout(onLeave, 900);
      }
    };
    let touchTimer = 0;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    function draw(t: number) {
      if (!visible) return;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      if (pointer.tx < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      if (!reduce && t - lastPulse > 1400) {
        lastPulse = t;
        pulses.push({ x: Math.random() * w, y: Math.random() * h, r: 0, born: t });
      }
      ctx.clearRect(0, 0, w, h);
      const R = 170;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const near = Math.max(0, 1 - d / R);
          let glow = 0;
          for (const p of pulses) {
            const age = (t - p.born) / 2600;
            const pr = age * 520;
            const pd = Math.abs(Math.hypot(x - p.x, y - p.y) - pr);
            if (pd < 18) glow = Math.max(glow, (1 - pd / 18) * (1 - age));
          }
          const push = near * near * 12;
          const px = x + (d > 0 ? (dx / d) * push : 0);
          const py = y + (d > 0 ? (dy / d) * push : 0);
          const a = 0.13 + near * 0.85 + glow * 0.5;
          const s = 1 + near * 1.6 + glow * 0.8;
          if (near > 0.02) ctx.fillStyle = `rgba(215,255,58,${a})`;
          else if (glow > 0.02) ctx.fillStyle = `rgba(155,153,255,${a})`;
          else ctx.fillStyle = `rgba(243,240,232,${a})`;
          ctx.fillRect(px - s / 2, py - s / 2, s, s);
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) if (t - pulses[i].born > 2600) pulses.splice(i, 1);
      if (!reduce || pointer.tx > -9000) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      clearTimeout(touchTimer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
