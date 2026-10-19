// Shared motion kit for the Syntique compositions. Everything here is pure setup
// (DOM building + tween factories on a timeline you pass in) — no clocks, no randomness
// beyond the seeded PRNG, so every frame is a function of timeline time.
(function () {
  const MARK_D = "M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13";

  const SYN = {
    ease: { out: "expo.out", wipe: "power4.inOut", soft: "power2.out", snap: "back.out(2.2)" },

    // Circuit-trace S mark. `pulse` adds a volt spark that travels the trace after it draws.
    mark({ id, stroke = "#f3f0e8", node = "#d7ff3a", width = 5.5, pulse = true }) {
      return `<svg class="syn-mark" id="${id}" viewBox="0 0 48 48" fill="none" overflow="visible">
        <path class="trace" d="${MARK_D}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>
        ${pulse ? `<path class="spark" d="${MARK_D}" stroke="${node}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
        <circle class="n1" cx="36" cy="10" r="4.2" fill="${node}"/>
        <circle class="n2" cx="12" cy="38" r="4.2" fill="${node}"/>
      </svg>`;
    },

    // Logo sting: start node pops, trace draws top→bottom, end node pops, spark runs the trace.
    drawMark(tl, svg, at, { draw = 0.9, spark = true } = {}) {
      const trace = svg.querySelector(".trace");
      const sparkEl = svg.querySelector(".spark");
      const len = trace.getTotalLength() * 1.02;
      gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
      const n1 = svg.querySelector(".n1");
      const n2 = svg.querySelector(".n2");
      tl.fromTo(n1, { scale: 0, svgOrigin: "36 10" }, { scale: 1, svgOrigin: "36 10", duration: 0.45, ease: "back.out(3)" }, at);
      tl.to(trace, { strokeDashoffset: 0, duration: draw, ease: "power3.inOut" }, at + 0.12);
      tl.fromTo(n2, { scale: 0, svgOrigin: "12 38" }, { scale: 1, svgOrigin: "12 38", duration: 0.5, ease: "back.out(3)" }, at + 0.12 + draw * 0.92);
      if (sparkEl) {
        const seg = 7;
        gsap.set(sparkEl, { strokeDasharray: `${seg} ${len}`, strokeDashoffset: seg, opacity: 0 });
        if (spark) {
          tl.set(sparkEl, { opacity: 1 }, at + 0.15 + draw);
          tl.fromTo(sparkEl, { strokeDashoffset: seg }, { strokeDashoffset: -len, duration: 0.7, ease: "power2.inOut" }, at + 0.15 + draw);
          tl.set(sparkEl, { opacity: 0 }, at + 0.86 + draw);
        }
      }
      return at + 0.12 + draw + 0.5;
    },

    // Wrap each word of el in a mask so it can rise into place. Keeps <em>/<b> styling.
    split(el) {
      const out = [];
      const walk = (node, parentTag) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(" "));
                return;
              }
              const w = document.createElement("span");
              w.className = "w";
              w.setAttribute("data-layout-allow-overflow", "");
              const inner = document.createElement("span");
              inner.textContent = part;
              w.appendChild(inner);
              frag.appendChild(w);
              out.push(inner);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) {
            walk(child, child.tagName);
          }
        });
      };
      walk(el);
      return out;
    },

    // Words rise out of their masks.
    rise(tl, words, at, { stagger = 0.06, dur = 0.7, ease = "expo.out", from = 110 } = {}) {
      tl.fromTo(words, { yPercent: from }, { yPercent: 0, duration: dur, ease, stagger }, at);
      return at + dur + stagger * (words.length - 1);
    },

    // Words drop away (used for exits).
    sink(tl, words, at, { stagger = 0.02, dur = 0.4 } = {}) {
      tl.to(words, { yPercent: -110, duration: dur, ease: "power3.in", stagger }, at);
    },

    // Mulberry32 — deterministic pseudo-random for decorative placement.
    rng(seed) {
      let a = seed >>> 0;
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    },

    // Count a stat up from 0 ("13,164", "100+", "37"). Small counts, years ("2005") and
    // non-numeric values ("1 tap", "∞") are left as they are.
    countUp(tl, el, value, at, dur = 1) {
      const m = /^([\d,]+)(.*)$/.exec(value);
      if (!m) return;
      const comma = m[1].includes(",");
      const n = parseInt(m[1].replace(/,/g, ""), 10);
      if (n < 10 || (!comma && n >= 1900 && n <= 2100)) return;
      const o = { v: 0 };
      const fmt = (v) => (comma ? Math.round(v).toLocaleString("en-US") : String(Math.round(v))) + m[2];
      tl.fromTo(o, { v: 0 }, { v: n, duration: dur, ease: "power2.out", onUpdate: () => (el.textContent = fmt(o.v)) }, at);
    },

    project(slug) {
      return window.SYN_DATA.projects.find((p) => p.slug === slug);
    },
  };

  window.SYN = SYN;
})();
