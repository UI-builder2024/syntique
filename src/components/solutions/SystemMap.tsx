"use client";

import { motion } from "motion/react";
import { MODULES, type ModuleId } from "@/lib/solutions";

// Hub-and-spoke view of one integrated system: every module talks to the same core.
// Active modules are lit and carry travelling "data" pulses; inactive ones wait as dashed add-ons.
export function SystemMap({
  modules,
  active,
  center,
  accent = "var(--volt)",
  onToggle,
  locked = [],
}: {
  modules: ModuleId[];
  active: ModuleId[];
  center: string;
  accent?: string;
  onToggle?: (id: ModuleId) => void;
  locked?: ModuleId[];
}) {
  const n = modules.length;
  const R = 39;
  const pos = modules.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
  });

  return (
    <div className="relative -mx-2 aspect-square w-[calc(100%+1rem)] max-w-[560px] select-none sm:mx-auto sm:w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="0.2" strokeDasharray="0.6 1.2" />
        {modules.map((id, i) => {
          const on = active.includes(id);
          return (
            <g key={id}>
              <motion.line
                x1="50"
                y1="50"
                x2={pos[i].x}
                y2={pos[i].y}
                stroke={on ? accent : "rgba(243,240,232,.18)"}
                strokeWidth={on ? 0.35 : 0.2}
                strokeDasharray={on ? "0" : "0.8 0.8"}
                initial={false}
                animate={{ opacity: on ? 0.9 : 0.5 }}
              />
              {on && (
                <motion.circle
                  r="0.8"
                  fill={accent}
                  initial={{ cx: 50, cy: 50, opacity: 0 }}
                  animate={{ cx: [50, pos[i].x, 50], cy: [50, pos[i].y, 50], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: (i * 0.37) % 2.8, ease: "easeInOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-2 text-center shadow-[0_0_80px_-10px_rgba(61,59,255,.6)]">
        <div className="px-2">
          <span className="label block !text-[0.55rem] text-fog md:!text-[0.6rem]">One system</span>
          <span className="mt-1 block text-[clamp(0.8rem,2.4vw,1.25rem)] font-bold leading-tight tracking-tight">{center}</span>
        </div>
        <motion.span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: accent }}
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      {modules.map((id, i) => {
        const m = MODULES[id];
        const on = active.includes(id);
        const isLocked = locked.includes(id);
        const Tag = onToggle && !isLocked ? "button" : "div";
        return (
          <Tag
            key={id}
            {...(Tag === "button" ? { type: "button" as const, onClick: () => onToggle?.(id), "aria-pressed": on } : {})}
            className={`absolute flex w-[21%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center ${
              Tag === "button" ? "cursor-pointer active:scale-95" : ""
            }`}
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          >
            <motion.span
              initial={false}
              animate={{
                backgroundColor: on ? accent : "rgba(19,19,25,1)",
                color: on ? "#0b0b0f" : "rgba(243,240,232,.6)",
                scale: on ? 1 : 0.88,
              }}
              className="grid size-[clamp(2rem,7.5vw,2.75rem)] place-items-center rounded-full border border-white/15 text-[clamp(0.8rem,2vw,1.05rem)] shadow-lg"
            >
              {m.glyph}
            </motion.span>
            <span className={`text-[clamp(0.6rem,2.3vw,0.72rem)] font-medium leading-[1.1] ${on ? "text-paper" : "text-fog"}`}>
              {m.name}
              {Tag === "button" && !on && <span className="block text-[0.9em] text-volt/80">+ add</span>}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}
