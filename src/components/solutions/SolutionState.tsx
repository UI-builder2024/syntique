"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { BriefBuilder } from "../BriefBuilder";
import { Arrow } from "../ui";
import { SystemMap } from "./SystemMap";
import { LAUNCH_PROMISE, MODULES, type ModuleId, type Solution } from "@/lib/solutions";

type Ctx = {
  s: Solution;
  pains: string[];
  togglePain: (p: string) => void;
  addons: ModuleId[];
  toggleAddon: (id: ModuleId) => void;
};
const SolutionCtx = createContext<Ctx | null>(null);
const useSolution = () => useContext(SolutionCtx)!;

// Holds what the visitor has told us on a package page (pains ticked, add-ons chosen)
// so the brief at the bottom already describes their system.
export function SolutionProvider({ s, children }: { s: Solution; children: ReactNode }) {
  const [pains, setPains] = useState<string[]>([]);
  const [addons, setAddons] = useState<ModuleId[]>([]);
  return (
    <SolutionCtx.Provider
      value={{
        s,
        pains,
        togglePain: (p) => setPains((x) => (x.includes(p) ? x.filter((y) => y !== p) : [...x, p])),
        addons,
        toggleAddon: (id) => setAddons((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id])),
      }}
    >
      {children}
    </SolutionCtx.Provider>
  );
}

export function PainPicker() {
  const { s, pains, togglePain } = useSolution();
  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2">
        {s.pains.map((p, i) => {
          const on = pains.includes(p.pain);
          return (
            <li key={p.pain}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => togglePain(p.pain)}
                className={`group flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-all duration-500 active:scale-[0.98] ${
                  on ? "border-transparent bg-paper text-ink" : "border-line hover:border-paper/30"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-xs transition-colors ${
                      on ? "border-ink bg-ink text-volt" : "border-white/25 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className={`text-lg font-semibold leading-snug ${on ? "line-through decoration-signal decoration-2" : ""}`}>
                    <span className="mono mr-2 text-xs opacity-50">0{i + 1}</span>
                    {p.pain}
                  </span>
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="block overflow-hidden pl-9"
                    >
                      <span className="mt-3 block text-ink/75">
                        <span className="font-semibold text-signal">Fixed: </span>
                        {p.fix}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {pains.length > 0 && (
          <motion.a
            href="#quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-volt p-5 font-semibold text-ink"
          >
            <span>
              {pains.length} problem{pains.length > 1 ? "s" : ""} {s.product} solves for you. Get a quote for the fix
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper">
              <Arrow />
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Configurator() {
  const { s, addons, toggleAddon } = useSolution();
  const all = [...s.core, ...s.addons];
  const active = [...s.core, ...addons];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <SystemMap modules={all} active={active} center={s.product} accent={s.accent} onToggle={toggleAddon} locked={s.core} />
      </div>
      <div className="lg:col-span-5">
        <p className="label text-fog">Included in {s.product}</p>
        <ul className="mt-4 space-y-2">
          {s.core.map((id) => (
            <li key={id} className="flex gap-3">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full text-[0.65rem] text-ink" style={{ background: s.accent }}>
                ✓
              </span>
              <span>
                <span className="font-semibold">{MODULES[id].name}</span>
                <span className="block text-sm text-paper/55">{MODULES[id].desc}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="label mt-8 text-fog">Add-ons · tap to add</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {s.addons.map((id) => {
            const on = addons.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleAddon(id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all active:scale-95 ${
                  on ? "border-volt bg-volt font-semibold text-ink" : "border-line text-paper/80 hover:border-paper/40"
                }`}
              >
                {on ? "✓ " : "+ "}
                {MODULES[id].name}
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line p-5">
          <div className="flex-1">
            <p className="text-2xl font-bold">
              {active.length} modules <span className="serif font-normal text-paper/60">· one login</span>
            </p>
            <p className="text-sm text-fog">{LAUNCH_PROMISE}. More modules roll out in phases after launch.</p>
          </div>
          <a href="#quote" className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-3 font-semibold text-ink active:scale-95">
            Quote this system <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SolutionBrief() {
  const { s, addons, pains } = useSolution();
  return <BriefBuilder preset={{ pkg: s.product, modules: [...s.core, ...addons].map((id) => MODULES[id].name), pains }} />;
}
