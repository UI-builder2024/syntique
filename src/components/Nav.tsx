"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { LAUNCH_PROMISE, SOLUTIONS } from "@/lib/solutions";
import { PROJECTS } from "@/lib/work";
import { Logo } from "./Logo";
import { BrandLogo } from "./BrandLogo";
import { Arrow, MagneticButton } from "./ui";

type MenuId = "systems" | "work" | "services";
const ITEMS: { id: MenuId | "process"; label: string; href: string; match: (p: string) => boolean }[] = [
  { id: "systems", label: "Systems", href: "/solutions", match: (p) => p.startsWith("/solutions") },
  { id: "work", label: "Work", href: "/work", match: (p) => p.startsWith("/work") },
  { id: "process", label: "Process", href: "/#process", match: () => false },
  { id: "services", label: "Services", href: "/services", match: (p) => p.startsWith("/services") },
];

function SystemsMenu({ close }: { close: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_15rem] gap-6">
      <ul className="grid grid-cols-2 gap-1">
        {SOLUTIONS.map((s) => (
          <li key={s.slug}>
            <Link href={`/solutions/${s.slug}`} onClick={close} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06]">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: s.accent }} />
              <span>
                <span className="block font-semibold">{s.product}</span>
                <span className="block text-sm leading-snug text-fog group-hover:text-paper/70">{s.industry}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/solutions" onClick={close} className="flex flex-col justify-between rounded-xl bg-volt p-5 text-ink">
        <span className="text-sm font-medium opacity-60">Systems, not just sites</span>
        <span>
          <span className="block text-lg font-bold leading-tight">Website + CMS + CRM + automations, built as one.</span>
          <span className="mt-2 block text-sm opacity-70">{LAUNCH_PROMISE}.</span>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            All systems & modules <Arrow />
          </span>
        </span>
      </Link>
    </div>
  );
}

function WorkMenu({ close }: { close: () => void }) {
  const [hover, setHover] = useState(0);
  const p = PROJECTS[hover];
  return (
    <div className="grid grid-cols-[1fr_18rem] gap-6">
      <ul className="space-y-0.5">
        {PROJECTS.map((x, i) => (
          <li key={x.slug} onPointerEnter={() => setHover(i)}>
            <Link href={`/work/${x.slug}`} onClick={close} className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors ${hover === i ? "bg-white/[0.06]" : ""}`}>
              <span>
                <span className="block font-semibold">{x.name}</span>
                <span className="block text-sm text-fog">{x.category.replace(" · Launching soon", "")}</span>
              </span>
              <span className={`label shrink-0 rounded-full px-2 py-0.5 ${x.status === "in-progress" ? "border border-volt/50 text-volt" : "bg-white/5 text-paper/70"}`}>
                {x.status === "in-progress" ? "Launching" : "Live"}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/work" onClick={close} className="label flex items-center gap-2 px-3 pt-3 text-fog hover:text-paper">
            All case studies <Arrow />
          </Link>
        </li>
      </ul>
      <Link href={`/work/${p.slug}`} onClick={close} className="block overflow-hidden rounded-xl border border-white/10">
        <div className="relative aspect-[16/10]">
          <Image src={p.images.hero} alt={p.name} fill sizes="18rem" loading="eager" className="object-cover object-top" />
        </div>
        <div className="p-3">
          <p className="text-sm text-paper/70">{p.headline}</p>
          {p.integrations && (
            <div className="mt-2.5 flex items-center gap-2">
              {p.integrations.map((it) => (
                <span key={it.name} title={it.name} className="grid size-7 place-items-center rounded-md bg-white/[0.06]">
                  <BrandLogo name={it.name} size={15} />
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

function ServicesMenu({ close }: { close: () => void }) {
  return (
    <ul className="grid grid-cols-2 gap-1">
      {SERVICES.map((s, i) => (
        <li key={s.slug}>
          <Link href={`/services/${s.slug}`} onClick={close} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06]">
            <span className="mono mt-0.5 text-xs text-volt">0{i + 1}</span>
            <span>
              <span className="block font-semibold">{s.name}</span>
              <span className="block text-sm text-fog group-hover:text-paper/70">{s.short}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Nav() {
  const path = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [section, setSection] = useState<MenuId | null>(null);
  const closeTimer = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open && !menu);
    setSolid(y > 40);
  });

  // Close menus on navigation.
  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [path]);

  const openMenu = (id: MenuId | null) => {
    clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };
  const close = () => setMenu(null);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6"
        onPointerLeave={scheduleClose}
      >
        <nav
          className={`relative mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 ${
            solid || open || menu ? "border border-white/10 bg-ink/80 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link href="/" aria-label={`${SITE.name} home`} onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {ITEMS.map((n) => {
              const active = n.match(path);
              const hasMenu = n.id !== "process";
              return (
                <li key={n.id} onPointerEnter={() => openMenu(hasMenu ? (n.id as MenuId) : null)}>
                  <Link
                    href={n.href}
                    onFocus={() => openMenu(hasMenu ? (n.id as MenuId) : null)}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasMenu ? menu === n.id : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                      active ? "bg-white/10 text-paper" : menu === n.id ? "text-paper" : "text-paper/70 hover:text-paper"
                    }`}
                  >
                    {active && <span className="size-1.5 rounded-full bg-volt" />}
                    {n.label}
                    {hasMenu && (
                      <svg viewBox="0 0 10 6" className={`size-2 transition-transform ${menu === n.id ? "rotate-180" : ""}`} aria-hidden>
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <MagneticButton href="/contact" className="!h-10 !pl-5 !text-sm">
                Start a project
              </MagneticButton>
            </span>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full bg-paper text-ink md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {menu && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={() => openMenu(menu)}
                className="absolute left-1/2 top-[calc(100%+10px)] hidden w-[min(820px,calc(100vw-48px))] -translate-x-1/2 rounded-2xl border border-white/10 bg-ink/95 p-4 shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl md:block"
              >
                <AnimatePresence mode="wait">
                  <motion.div key={menu} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>
                    {menu === "systems" && <SystemsMenu close={close} />}
                    {menu === "work" && <WorkMenu close={close} />}
                    {menu === "services" && <ServicesMenu close={close} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pb-8 pt-24 md:hidden"
            data-lenis-prevent
          >
            <ul className="flex-1 divide-y divide-line border-y border-line">
              {ITEMS.map((n, i) => {
                const active = n.match(path);
                const sub =
                  n.id === "systems"
                    ? SOLUTIONS.map((s) => ({ href: `/solutions/${s.slug}`, label: s.product, note: s.industry.split(",")[0], dot: s.accent }))
                    : n.id === "work"
                      ? PROJECTS.map((p) => ({ href: `/work/${p.slug}`, label: p.name, note: p.status === "in-progress" ? "Launching soon" : "Live", dot: p.accent }))
                      : n.id === "services"
                        ? SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name, note: s.short, dot: "var(--volt)" }))
                        : null;
                const expanded = section === n.id;
                return (
                  <motion.li
                    key={n.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between py-3">
                      <Link href={n.href} onClick={() => setOpen(false)} className={`display text-[2.6rem] ${active ? "text-volt" : ""}`}>
                        {n.label}
                      </Link>
                      {sub && (
                        <button
                          type="button"
                          aria-label={`${expanded ? "Hide" : "Show"} ${n.label}`}
                          aria-expanded={expanded}
                          onClick={() => setSection(expanded ? null : (n.id as MenuId))}
                          className="grid size-11 place-items-center rounded-full border border-line text-xl active:scale-95"
                        >
                          <span className={`transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}>+</span>
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {sub && expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {sub.map((x) => (
                            <li key={x.href}>
                              <Link href={x.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 pl-1 active:opacity-60">
                                <span className="size-2 shrink-0 rounded-full" style={{ background: x.dot }} />
                                <span className="font-semibold">{x.label}</span>
                                <span className="truncate text-sm text-fog">{x.note}</span>
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-between rounded-2xl bg-volt p-5 text-lg font-semibold text-ink"
            >
              <span>
                Start a project
                <span className="block text-xs font-medium opacity-70">{LAUNCH_PROMISE}</span>
              </span>
              <Arrow className="size-5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
