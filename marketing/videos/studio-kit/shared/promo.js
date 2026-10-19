// Brand promo — one scene builder for both promo-landscape.html (16:9) and promo-vertical.html (9:16).
// Scene windows live as static <section class="clip"> elements in each HTML file; this script fills
// them from SYN_DATA (site copy) and SYN_VO (voiceover word timings) and builds the one paused timeline.
(function () {
  const D = window.SYN_DATA;
  const VO = window.SYN_VO.promo;
  const V = document.getElementById("root").dataset.orient === "vert";
  const $ = (s, r = document) => r.querySelector(s);
  const tl = gsap.timeline({ paused: true });

  // ---------- helpers ----------
  const words = (a, b) => VO.filter((w) => w[1] >= a && w[1] < b);
  const said = (word) => VO.find((w) => w[0] === word)[1]; // when a word is spoken
  // Caption line whose words rise exactly as they are spoken.
  function caption(el, a, b, { lead = 0.06, skip = 0 } = {}) {
    const ws = words(a, b).slice(skip);
    el.innerHTML = ws.map((w) => `<span class="w" data-layout-allow-overflow><span>${w[0]}</span></span>`).join(" ");
    [...el.querySelectorAll(".w > span")].forEach((s, i) => {
      tl.fromTo(s, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: "expo.out" }, Math.max(0, ws[i][1] - lead));
    });
    return el;
  }
  const html = (el, s) => ((el.innerHTML = s), el);
  const img = (src, cls = "") => `<img class="${cls}" src="${src}" alt="" />`;
  const browser = (src, url, cls) =>
    `<div class="browser ${cls}"><div class="bar"><i></i><i></i><i></i><b>${url}</b></div><div class="view">${img(src, "shot")}</div></div>`;
  const phone = (src, cls) => `<div class="phone ${cls}"><div class="view">${img(src, "shot")}</div></div>`;

  // ---------- persistent background ----------
  const bg = $("#bg");
  html(bg, `<div class="blueprint" id="bp"></div><div class="glow" id="g1" data-layout-allow-overflow></div><div class="glow" id="g2" data-layout-allow-overflow></div>`);
  tl.fromTo("#bp", { x: 0, y: 0 }, { x: -64, y: -64, duration: 45, ease: "none" }, 0);
  tl.fromTo("#g1", { scale: 0.9, opacity: 0.55 }, { scale: 1.15, opacity: 0.8, duration: 7.5, ease: "sine.inOut", yoyo: true, repeat: 5 }, 0);
  tl.fromTo("#g2", { scale: 1.1, opacity: 0.35 }, { scale: 0.9, opacity: 0.6, duration: 6, ease: "sine.inOut", yoyo: true, repeat: 6 }, 0);

  // ---------- HUD (thin progress rail + label) ----------
  html($("#hud"), `<i id="rail"></i>`);
  tl.fromTo("#hud", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3);
  tl.fromTo("#rail", { scaleX: 0 }, { scaleX: 1, duration: 45, ease: "none" }, 0);
  tl.to("#hud", { opacity: 0, duration: 0.3 }, 40.9);

  // ---------- 1 · hook (0 – 4.6) ----------
  html($("#s-hook"), `<div id="hk-ghost">${SYN.mark({ id: "hk-svg", stroke: "#9b99ff", node: "none", width: 1.2, pulse: false })}</div><p class="label kicker" id="hk-k">The pitch</p><h1 class="display" id="hk-1"></h1><p class="serif" id="hk-2"></p>`);
  SYN.drawMark(tl, $("#hk-svg"), 0, { draw: 3.6, spark: false });
  tl.fromTo("#hk-ghost", { rotation: -8, scale: 0.95 }, { rotation: 4, scale: 1.05, duration: 4.6, ease: "none" }, 0);
  caption($("#hk-1"), 0, 2.6);
  caption($("#hk-2"), 2.6, 4.5);
  tl.fromTo("#hk-k", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.1);
  // "closes." gets a volt underline that draws on as it is said
  const closes = [...$("#hk-2").querySelectorAll(".w")].pop();
  closes.classList.add("hl");
  closes.insertAdjacentHTML("beforeend", `<i class="uline"></i>`);
  tl.fromTo(closes.querySelector(".uline"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 3.55);
  tl.to(["#hk-1", "#hk-2", "#hk-k"], { y: V ? -60 : -40, opacity: 0, duration: 0.35, ease: "power2.in", stagger: 0.04 }, 4.3);

  // ---------- 2 · logo sting (4.5 – 7.85) ----------
  html($("#s-sting"), `<div class="flash" id="st-flash"></div><div id="st-mark">${SYN.mark({ id: "st-svg" })}</div><p class="display" id="st-word">syntique</p><p class="serif" id="st-tag"></p>`);
  SYN.drawMark(tl, $("#st-svg"), 4.5, { draw: 0.75 });
  SYN.rise(tl, SYN.split($("#st-word")), 4.86, { stagger: 0.04, dur: 0.8 });
  caption($("#st-tag"), 5.6, 7.8);
  tl.fromTo("#st-flash", { opacity: 0, scale: 0.6 }, { opacity: 0.9, scale: 1, duration: 0.25, ease: "power2.out" }, 4.86);
  tl.to("#st-flash", { opacity: 0, scale: 1.5, duration: 1.2, ease: "power2.out" }, 5.11);
  tl.fromTo("#st-mark", { scale: 0.92 }, { scale: 1.04, duration: 3.3, ease: "none" }, 4.5);
  tl.to(["#st-mark", "#st-word", "#st-tag"], { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.03 }, 7.6);

  // ---------- 3 · positioning (7.85 – 15.3) ----------
  const ribbon = D.projects.map((p) => img(`assets/work/${p.dir}/desktop.webp`, "rb")).join("");
  html(
    $("#s-pos"),
    `<div id="ps-ribbon"><div id="ps-track">${ribbon}${ribbon}</div></div><div id="ps-shade"></div>
     <p class="serif" id="ps-lead"></p>
     <div id="ps-stack"><p class="display" id="ps-a"></p><p class="display" id="ps-b"></p><p class="display volt" id="ps-c"></p></div>
     <div id="ps-geo"><p class="serif" id="ps-geo-k"></p><div id="ps-chips"><span class="chip">India</span><span class="chip">United States</span><span class="chip">Australia</span></div></div>`
  );
  caption($("#ps-lead"), 7.9, 8.9);
  // the three disciplines land on the spoken word, set in full display caps
  [["#ps-a", "Websites.", said("websites,")], ["#ps-b", "Platforms.", said("platforms")], ["#ps-c", "Automation.", said("automation")]].forEach(([id, t, at]) => {
    $(id).textContent = t;
    SYN.rise(tl, SYN.split($(id)), at - 0.08, { dur: 0.6 });
  });
  html($("#ps-geo-k"), "for teams in");
  tl.fromTo("#ps-geo-k", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 11.85);
  [said("India,"), said("US"), said("Australia.")].forEach((t, i) =>
    tl.fromTo(`#ps-chips .chip:nth-child(${i + 1})`, { scale: 0.4, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(2.4)" }, t - 0.05)
  );
  tl.fromTo("#ps-ribbon", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 7.9);
  tl.fromTo("#ps-track", { xPercent: 0 }, { xPercent: -50, duration: 14, ease: "none" }, 7.85);
  tl.fromTo("#ps-stack", { scale: 1 }, { scale: 1.03, duration: 7.4, ease: "none" }, 7.9);
  // copy leaves before the first case wipes in; the dark field stays until the wipe covers it
  tl.to(["#ps-lead", "#ps-stack", "#ps-geo"], { opacity: 0, duration: 0.2, ease: "power1.in" }, 15.15);

  // ---------- 4 · five case studies ----------
  const CASES = [
    { slug: "sisters-in-sweat", dir: "sisters-in-sweat", a: 15.3, b: 20.85, cap: [16.6, 20.6], name: "Sisters In Sweat", scroll: "full" },
    { slug: "four-states", dir: "four-states", a: 20.85, b: 25.05, cap: [21.9, 24.9], name: "Four States", scroll: "hero" },
    { slug: "timbuckdo", dir: "timbuckdo", a: 25.05, b: 28.8, cap: [26.2, 28.7], name: "TimBuckDo", scroll: "full" },
    { slug: "careerview", dir: "careerview", a: 28.8, b: 33.3, cap: [30.0, 33.2], name: "CareerView", scroll: "full" },
    { slug: "chitrapur-heritage-foundation", dir: "chf", a: 33.3, b: 37.8, cap: [35.25, 37.6], name: "CHF USA", scroll: "full" },
  ];
  CASES.forEach((c, i) => {
    const p = SYN.project(c.slug);
    const el = $(`#s-case-${i + 1}`);
    const stat = p.stats[0];
    const host = p.urlLabel;
    const shot = c.scroll === "full" ? `assets/work/${c.dir}/full.webp` : `assets/work/${c.dir}/hero.webp`;
    el.style.setProperty("--acc", p.accent);
    el.style.setProperty("--acc-ink", p.accentInk);
    if (p.accentInk === "#ffffff") el.classList.add("on-dark");
    html(
      el,
      `<div class="panel"></div>
       <div class="devices">${browser(shot, host, "cs-browser")}${phone(`assets/work/${c.dir}/mobile.webp`, "cs-phone")}</div>
       <div class="cs-copy">
         <p class="tag cs-k">0${i + 1} — ${p.category}</p>
         <h2 class="display cs-name">${c.name}</h2>
         <p class="cs-cap"></p>
         <div class="cs-stat"><b class="display">${stat.value}</b><span>${stat.label}</span></div>
       </div>`
    );
    const q = (s) => el.querySelector(s);
    // accent panel wipes across on the cut (direction alternates)
    const from = i % 2 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    tl.fromTo(q(".panel"), { clipPath: from }, { clipPath: "inset(0 0% 0 0%)", duration: 0.55, ease: "power4.inOut" }, c.a);
    tl.fromTo(q(".devices"), { y: V ? 160 : 120, opacity: 0, rotation: V ? -2 : 0 }, { y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: "expo.out" }, c.a + 0.2);
    tl.fromTo(q(".cs-phone"), { y: 220, rotation: 8 }, { y: 0, rotation: V ? 4 : 3, duration: 1.0, ease: "expo.out" }, c.a + 0.35);
    tl.fromTo(q(".devices"), { scale: 1 }, { scale: 1.045, duration: c.b - c.a, ease: "none" }, c.a);
    // scroll the long page inside the browser
    if (c.scroll === "full") tl.fromTo(q(".cs-browser .shot"), { yPercent: 0 }, { yPercent: -38, duration: c.b - c.a - 0.6, ease: "power1.inOut" }, c.a + 0.6);
    else tl.fromTo(q(".cs-browser .shot"), { scale: 1.12 }, { scale: 1, duration: c.b - c.a, ease: "none" }, c.a);
    tl.fromTo(q(".cs-phone .shot"), { yPercent: 0 }, { yPercent: -10, duration: c.b - c.a, ease: "none" }, c.a);
    tl.fromTo(q(".cs-k"), { opacity: 0, x: -24 }, { opacity: 0.85, x: 0, duration: 0.5, ease: "power2.out" }, c.a + 0.3);
    SYN.rise(tl, SYN.split(q(".cs-name")), c.a + 0.22, { stagger: 0.05, dur: 0.7 });
    caption(q(".cs-cap"), c.cap[0], c.cap[1]);
    tl.fromTo(q(".cs-stat"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" }, c.a + 0.9);
    SYN.countUp(tl, q(".cs-stat b"), stat.value, c.a + 0.9, 1.1);
  });

  // ---------- 5 · process (37.8 – 41.1) ----------
  const STEPS = ["Discover", "Architect", "Design", "Engineer", "Launch", "Grow"];
  html(
    $("#s-proc"),
    `<div class="proc-bg"></div><p class="serif" id="pr-cap"></p><ol id="pr-list">${STEPS.map((s, i) => `<li><span class="label">0${i + 1}</span><b class="display">${s}</b></li>`).join("")}</ol>`
  );
  tl.fromTo("#s-proc .proc-bg", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.inOut" }, 37.75);
  caption($("#pr-cap"), 37.9, 40.7);
  const lis = [...document.querySelectorAll("#pr-list li")];
  tl.fromTo(lis, { opacity: 0, x: -40 }, { opacity: 0.22, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.03 }, 37.85);
  lis.forEach((li, i) => {
    const t = 38.45 + i * 0.37;
    tl.to(li, { opacity: 1, duration: 0.15 }, t);
    tl.fromTo(li.querySelector("b"), { color: "#f3f0e8", x: 0 }, { color: "#d7ff3a", x: V ? 24 : 36, duration: 0.25, ease: "power2.out" }, t);
    if (i < STEPS.length - 1) tl.to(li.querySelector("b"), { color: "#f3f0e8", x: 0, duration: 0.25 }, t + 0.37);
  });

  // ---------- 6 · CTA (41.1 – 45) ----------
  html(
    $("#s-cta"),
    `<div class="paper"></div><div id="ct-mark">${SYN.mark({ id: "ct-svg", stroke: "#0b0b0f", node: "#3d3bff" })}</div>
     <p class="display" id="ct-1">Let's build</p><p class="serif" id="ct-2">it right.</p>
     <p id="ct-url"><span>${D.site.host}</span><em>→</em></p>
     <p class="label" id="ct-meta"><i></i>${D.site.availability} · ${D.site.email}</p>`
  );
  tl.fromTo("#s-cta .paper", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.6, ease: "power3.inOut" }, 41.05);
  SYN.drawMark(tl, $("#ct-svg"), 41.25, { draw: 0.6 });
  SYN.rise(tl, SYN.split($("#ct-1")), 41.22, { stagger: 0.07, dur: 0.75 });
  SYN.rise(tl, SYN.split($("#ct-2")), 41.78, { stagger: 0.07, dur: 0.75 });
  tl.fromTo("#ct-url", { opacity: 0, y: 30, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" }, 42.9);
  tl.fromTo("#ct-url em", { x: -10 }, { x: 8, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 3 }, 43.4);
  tl.fromTo("#ct-meta", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 43.3);

  window.SYN_TL = tl; // registered inline by the page, after this script has built it
})();
