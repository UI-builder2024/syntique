// Case-study cut (1080x1920, 16s). Project comes from #root[data-slug]; every word and number
// is read from SYN_DATA (src/lib/work.ts). Beats sit on the case bed's bar grid (~117.5 BPM,
// first downbeat 0.30s, bar 2.044s): hook · devices · what we did · stats · CTA.
(function () {
  const root = document.getElementById("root");
  const p = SYN.project(root.dataset.slug);
  const D = window.SYN_DATA;
  const idx = D.projects.indexOf(p) + 1;
  const $ = (s) => document.querySelector(s);
  const tl = gsap.timeline({ paused: true });
  const T = { b: 3.37, c: 7.46, d: 10.52, e: 12.57, end: 16 };
  root.style.setProperty("--acc", p.accent);
  root.style.setProperty("--acc-ink", p.accentInk);
  root.classList.add(p.accentInk === "#ffffff" ? "on-dark" : "on-light"); // white text gets an ink veil for contrast
  const name = p.slug === "chitrapur-heritage-foundation" ? "CHF USA" : p.name;
  const ink = p.accentInk === "#ffffff" ? "#ffffff" : "#0b0b0f";

  // ---------- persistent: story-style progress segments + label ----------
  $("#hud").innerHTML = `<div id="segs">${[0, 1, 2, 3, 4].map(() => `<i><b></b></i>`).join("")}</div>`;
  const edges = [0, T.b, T.c, T.d, T.e, T.end];
  document.querySelectorAll("#segs b").forEach((b, i) =>
    tl.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: edges[i + 1] - edges[i], ease: "none" }, edges[i])
  );
  tl.fromTo("#hud", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.1);

  // ---------- A · hook headline (0 – 3.37) ----------
  const long = p.headline.split(" ").length > 13;
  $("#c-hook").innerHTML = `<div class="fill acc"></div><div class="ghost display" data-layout-allow-overflow>0${idx}</div>
    <p class="tag" id="h-k">Case study 0${idx} · ${p.region}</p>
    <h1 class="display ${long ? "long" : ""}" id="h-t">${p.headline}</h1>`;
  tl.fromTo("#c-hook .fill", { clipPath: "circle(0% at 50% 45%)" }, { clipPath: "circle(80% at 50% 45%)", duration: 0.55, ease: "power3.out" }, 0);
  tl.fromTo("#h-k", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.25);
  SYN.rise(tl, SYN.split($("#h-t")), 0.3, { stagger: long ? 0.055 : 0.08, dur: 0.6 });
  tl.to(["#h-k", "#h-t"], { y: -60, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.03 }, T.b - 0.2);
  tl.fromTo("#c-hook .ghost", { yPercent: 10, opacity: 0 }, { yPercent: -4, opacity: 0.14, duration: 3.4, ease: "power1.out" }, 0);

  // ---------- B · devices (3.37 – 7.46) ----------
  const full = p.slug === "four-states" ? `assets/work/${p.dir}/desktop.webp` : `assets/work/${p.dir}/full.webp`;
  $("#c-dev").innerHTML = `<div class="fill acc"></div><div class="blueprint dark" data-layout-allow-overflow></div>
    <div class="dev">
      <div class="browser" id="d-br"><div class="bar"><i></i><i></i><i></i><b>${p.urlLabel}</b></div><div class="view"><img class="shot" src="${full}" alt="" /></div></div>
      <div class="phone" id="d-ph"><div class="view"><img class="shot" src="assets/work/${p.dir}/mobile.webp" alt="" /></div></div>
    </div>
    <h2 class="display" id="d-n">${name}</h2>
    <p class="tag" id="d-c">${p.category}</p>`;
  const B = T.b;
  tl.fromTo("#c-dev .fill", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.inOut" }, B - 0.12);
  tl.fromTo("#d-br", { y: 260, rotation: -9, opacity: 0 }, { y: 0, rotation: -5, opacity: 1, duration: 0.9, ease: "expo.out" }, B + 0.05);
  tl.fromTo("#d-ph", { y: 420, rotation: 10 }, { y: 0, rotation: 4, duration: 1.0, ease: "expo.out" }, B + 0.2);
  tl.fromTo(".dev", { scale: 1 }, { scale: 1.05, duration: T.c - B, ease: "none" }, B);
  tl.fromTo("#d-ph .shot", { yPercent: 0 }, { yPercent: -12, duration: T.c - B - 0.6, ease: "power1.inOut" }, B + 0.8);
  if (p.slug !== "four-states") tl.fromTo("#d-br .shot", { yPercent: 0 }, { yPercent: -30, duration: T.c - B - 0.6, ease: "power1.inOut" }, B + 0.6);
  SYN.rise(tl, SYN.split($("#d-n")), B + 0.25, { stagger: 0.06, dur: 0.7 });
  tl.fromTo("#d-c", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, B + 0.6);

  // ---------- C · what we did (7.46 – 10.52) ----------
  $("#c-did").innerHTML = `<div class="fill ink"></div><div class="glow" data-layout-allow-overflow></div>
    <p class="serif" id="w-k">What we did</p>
    <ol id="w-list">${p.approach.map((a) => `<li><span class="tick"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><b>${a}</b></li>`).join("")}</ol>
    <div id="w-stack">${p.stack.map((s) => `<span class="mono">${s}</span>`).join("")}</div>`;
  const C = T.c;
  tl.fromTo("#c-did .fill", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.5, ease: "power4.inOut" }, C - 0.12);
  tl.fromTo("#w-k", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, C + 0.15);
  const STEP = Math.min(0.5, 2 / p.approach.length); // 3–4 items at 0.5s, 5 at 0.4s
  document.querySelectorAll("#w-list li").forEach((li, i) => {
    const at = C + 0.4 + i * STEP;
    tl.fromTo(li, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, at);
    const path = li.querySelector("path");
    gsap.set(path, { strokeDasharray: 24, strokeDashoffset: 24 });
    tl.fromTo(li.querySelector(".tick"), { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(3)" }, at + 0.1);
    tl.to(path, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, at + 0.25);
  });
  tl.fromTo("#w-stack span", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }, C + 0.6 + p.approach.length * STEP);
  tl.fromTo("#c-did .glow", { scale: 0.8, opacity: 0 }, { scale: 1.1, opacity: 0.8, duration: T.d - C - 0.3, ease: "sine.inOut" }, C + 0.3);

  // ---------- D · stats (10.52 – 12.57) ----------
  $("#c-stats").innerHTML = `<div class="fill acc"></div><div class="blueprint dark" data-layout-allow-overflow></div>
    <p class="tag" id="s-k">By the numbers</p>
    <div id="s-list" class="n${p.stats.length}">${p.stats.map((s) => `<div class="st"><b class="display">${s.value}</b><span>${s.label}</span></div>`).join("")}</div>`;
  const Dd = T.d;
  tl.fromTo("#c-stats .fill", { clipPath: "circle(0% at 15% 50%)" }, { clipPath: "circle(120% at 15% 50%)", duration: 0.5, ease: "power3.inOut" }, Dd - 0.12);
  tl.fromTo("#s-k", { opacity: 0 }, { opacity: 1, duration: 0.3 }, Dd + 0.1);
  document.querySelectorAll("#s-list .st").forEach((el, i) => {
    const at = Dd + 0.15 + i * (p.stats.length > 3 ? 0.24 : 0.3);
    tl.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, at);
    SYN.countUp(tl, el.querySelector("b"), p.stats[i].value, at, 0.9);
  });

  // ---------- E · CTA (12.57 – 16) ----------
  $("#c-cta").innerHTML = `<div class="fill ink"></div><div class="glow" data-layout-allow-overflow></div>
    <div id="e-mark">${SYN.mark({ id: "e-svg" })}</div>
    <p class="serif" id="e-1">Got a build like this?</p>
    <p class="display" id="e-2"><span class="ln">Let's build</span> <span class="ln">it right.</span></p>
    <p id="e-url"><span>${D.site.host}</span><em>→</em></p>
    <p class="label" id="e-meta">Full case study on ${D.site.host}/work</p>`;
  const E = T.e;
  // keep the CTA copy out of the layout until the wipe has covered the stats
  tl.set(["#e-1", "#e-2", "#e-url", "#e-meta"], { visibility: "hidden" }, 0);
  tl.set(["#e-1", "#e-2", "#e-url", "#e-meta"], { visibility: "visible" }, E + 0.38);
  tl.fromTo("#c-cta .fill", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" }, E - 0.12);
  SYN.drawMark(tl, $("#e-svg"), E + 0.15, { draw: 0.6 });
  SYN.rise(tl, SYN.split($("#e-1")), E + 0.4, { stagger: 0.05, dur: 0.6 });
  SYN.rise(tl, SYN.split($("#e-2")), E + 0.75, { stagger: 0.08, dur: 0.7 });
  tl.fromTo("#e-url", { opacity: 0, y: 24, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, E + 1.2);
  tl.fromTo("#e-url em", { x: -8 }, { x: 8, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 3 }, E + 1.7);
  tl.fromTo("#e-meta", { opacity: 0 }, { opacity: 1, duration: 0.4 }, E + 1.5);
  tl.fromTo("#c-cta .glow", { scale: 0.7, opacity: 0 }, { scale: 1.1, opacity: 0.9, duration: T.end - E - 0.35, ease: "sine.out" }, E + 0.35);

  window.SYN_TL = tl;
})();
