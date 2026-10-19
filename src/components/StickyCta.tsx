"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { Arrow } from "./ui";

// Desktop: a pill bottom-right once past the hero. Phones: a thumb-height bar that tucks away while
// you scroll down (so it never covers what you're reading) and returns on scroll up or when you pause.
export function StickyCta() {
  const path = usePathname();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [tucked, setTucked] = useState(false);
  const idle = useRef(0);
  const [formVisible, setFormVisible] = useState(false);

  // The brief form is the destination — never cover it.
  useEffect(() => {
    const els = document.querySelectorAll("#brief, #quote");
    if (!els.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setFormVisible(seen.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 700;
    setPast(y > window.innerHeight * 0.8 && !nearEnd);
    if (Math.abs(y - prev) > 4) setTucked(y > prev);
    clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setTucked(false), 900);
  });
  useEffect(() => () => clearTimeout(idle.current), []);

  if (path === "/contact") return null;
  const onPackage = path.startsWith("/solutions/");
  const href = onPackage ? "#quote" : "/contact";
  const label = onPackage ? "Get a quote" : "Start a project";

  return (
    <AnimatePresence>
      {past && !formVisible && (
        <>
          <motion.div
            key="desk"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <Link href={href} className="group flex items-center gap-3 rounded-full border border-white/10 bg-ink/80 py-2 pl-2 pr-5 shadow-2xl backdrop-blur-xl">
              <span className="grid size-9 place-items-center rounded-full bg-volt text-ink">
                <Arrow />
              </span>
              <span className="text-sm">
                <span className="block font-semibold leading-tight">{label}</span>
                <span className="block text-xs leading-tight text-fog">2-minute brief · live in as little as 2 weeks</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            key="mob"
            initial={{ y: 120 }}
            animate={{ y: tucked ? 120 : 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-x-3 z-40 flex gap-2 md:hidden"
            style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            <Link
              href={href}
              className="flex h-14 flex-1 items-center justify-between rounded-2xl bg-volt pl-5 pr-2 font-semibold text-ink shadow-[0_20px_50px_-10px_rgba(0,0,0,.8)] active:scale-[0.98]"
            >
              <span className="leading-tight">
                {label}
                <span className="block text-[0.7rem] font-medium opacity-70">Live in as little as 2 weeks</span>
              </span>
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-paper">
                <Arrow />
              </span>
            </Link>
            {SITE.whatsapp && (
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                aria-label="Chat on WhatsApp"
                className="grid size-14 place-items-center rounded-2xl bg-[#25D366] text-xl text-ink shadow-xl active:scale-95"
              >
                ✆
              </a>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
