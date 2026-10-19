// Content-automation pipeline explainer (1080x1920, 20s), voiced. Steps and copy mirror
// src/components/home/Automation.tsx (PIPE + FRAMES) and the content-automation service in
// src/lib/services.ts. Step changes land on the voiceover's words (SYN_VO.automation).
(function () {
  const VO = window.SYN_VO.automation;
  const D = window.SYN_DATA;
  const $ = (s) => document.querySelector(s);
  const tl = gsap.timeline({ paused: true });
  const at = (word, from = 0) => VO.find((w, i) => i >= from && w[0].toLowerCase().startsWith(word))[1];

  // PIPE from Automation.tsx, with the moment each one is introduced in the voiceover.
  const PIPE = [
    { k: "Research", d: "Studies your niche and the creators winning it.", t: at("researches") - 0.1 },
    { k: "Design language", d: "A look built for your brand, approved once.", t: at("builds") },
    { k: "Script", d: "Hooks and beats you sign off before anything renders.", t: at("writes") },
    { k: "Voice", d: "Your cloned voice, timed word by word.", t: at("voices") },
    { k: "Avatar", d: "Face-to-camera clips where they matter.", t: at("cloned") + 0.25 },
    { k: "Edit", d: "Motion graphics every 2–4 seconds, mixed to platform loudness.", t: at("and", 28) },
    { k: "Publish", d: "9:16 reels and carousels, AI-labelled and ready.", t: at("reels") },
  ];
  const GATE = at("with");
  const CTA = at("content", 40) - 0.35;
  const END = VO[VO.length - 1][2]; // last spoken word ends
  const FRAMES = [
    { bg: "#3d3bff", fg: "#f3f0e8", big: "3 mistakes", small: "killing your bookings" },
    { bg: "#d7ff3a", fg: "#0b0b0f", big: "#1", small: "a login wall before intent" },
    { bg: "#0b0b0f", fg: "#f3f0e8", big: "#2", small: "a menu that's a PDF" },
    { bg: "#f3f0e8", fg: "#0b0b0f", big: "#3", small: "no reply in 24h" },
  ];

  // ---------- background ----------
  $("#bg").innerHTML = `<div class="blueprint" id="bp" data-layout-allow-overflow></div><div class="glow" id="g1" data-layout-allow-overflow></div>`;
  tl.fromTo("#bp", { y: 0 }, { y: -128, duration: 20, ease: "none" }, 0);
  tl.fromTo("#g1", { scale: 0.85, opacity: 0.5 }, { scale: 1.15, opacity: 0.85, duration: 5, ease: "sine.inOut", yoyo: true, repeat: 3 }, 0);

  // ---------- 1 · hook (0 – 2.8) ----------
  $("#a-hook").innerHTML = `<p class="label kicker" id="k">New · Content automation</p>
    <h1 class="display" id="h1"></h1>`;
  const hw = VO.filter((w) => w[1] < 2.6);
  $("#h1").innerHTML = hw
    .map((w, i) => `<span class="w${i >= 4 ? " sv" : ""}" data-layout-allow-overflow><span>${w[0]}</span></span>`)
    .join(" ");
  [...document.querySelectorAll("#h1 .w > span")].forEach((s, i) =>
    tl.fromTo(s, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, Math.max(0, hw[i][1] - 0.05))
  );
  tl.fromTo("#k", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.05);
  tl.to(["#k", "#h1"], { y: -80, opacity: 0, duration: 0.35, ease: "power2.in", stagger: 0.03 }, 2.55);

  // ---------- 2 · pipeline (2.8 – CTA) ----------
  const rail = PIPE.map((p, i) => `<i class="node" style="left:${(i / 6) * 100}%"><b></b><em>✓</em></i>`).join("");
  $("#a-pipe").innerHTML = `
    <div id="rail"><span id="r-base"></span><span id="r-fill"></span>${rail}</div>
    <p class="label" id="r-n">Step <span id="r-i">${PIPE.map((_, i) => `<b>0${i + 1}</b>`).join("")}</span> / 07</p>
    <div id="cards">${PIPE.map((p, i) => `<section class="card" id="cd-${i}" data-layout-allow-overlap><h2 class="display">${p.k}</h2><p class="desc">${p.d}</p><div class="art" id="art-${i}"></div></section>`).join("")}
      <section class="card" id="cd-gate"><h2 class="display">Approval at <span class="serif">every gate.</span></h2><p class="desc">Approval gates at every step, and AI disclosure built in.</p>
        <ol id="gates">${PIPE.map((p) => `<li><span>${p.k}</span><em class="label">Approved</em></li>`).join("")}</ol></section>
    </div>
    <div id="caps"></div>`;

  // artifacts — abstract stand-ins for each stage's output (no invented data)
  const R = SYN.rng(11);
  $("#art-0").innerHTML = `<div class="tiles">${Array.from({ length: 6 }, () => `<div class="tile"><i class="play"></i><span class="bar"><b></b></span></div>`).join("")}</div><div class="scan"></div>`;
  $("#art-1").innerHTML = `<div class="sw" style="--c:#0b0b0f">Ink</div><div class="sw" style="--c:#f3f0e8;--t:#0b0b0f">Paper</div><div class="sw" style="--c:#3d3bff">Signal</div><div class="sw" style="--c:#d7ff3a;--t:#0b0b0f">Volt</div><p class="spec"><span class="display">Aa</span><span class="serif">Aa</span><span class="mono">Aa</span></p>`;
  $("#art-2").innerHTML = `<div class="doc">${FRAMES.map((f, i) => `<p><span class="mono">${i ? "BEAT " + i : "HOOK"}</span>${f.big === "3 mistakes" ? "3 mistakes killing your bookings" : f.small}</p>`).join("")}<b class="stamp label">Approved ✓</b></div>`;
  $("#art-3").innerHTML = `<div class="wave">${Array.from({ length: 44 }, () => `<i style="height:${Math.round(20 + R() * 80)}%"></i>`).join("")}</div><p class="mono cap">your-voice.clone · word timings ✓</p>`;
  $("#art-4").innerHTML = `<div class="cam"><svg viewBox="0 0 100 100"><circle cx="50" cy="38" r="17"/><path d="M18 92c4-20 18-30 32-30s28 10 32 30"/></svg><span class="rec"></span><span class="label">REC</span></div>`;
  $("#art-5").innerHTML = `<div class="lanes">${["Motion", "Voice", "Music"].map((n, i) => `<div class="lane"><span class="label">${n}</span><div class="clips">${Array.from({ length: i ? 2 : 5 }, (_, j) => `<b style="left:${i ? j * 50 + 2 : j * 20 + 1}%;width:${i ? 45 : 17}%"></b>`).join("")}</div></div>`).join("")}<i class="head"></i></div><p class="mono cap">−14 LUFS ✓</p>`;
  $("#art-6").innerHTML = `<div class="mini-phone" data-layout-allow-overlap>${FRAMES.map((f, i) => `<div class="fr" id="fr-${i}" style="background:${f.bg};color:${f.fg}"><b class="display">${f.big}</b><span class="serif">${f.small}</span></div>`).join("")}</div>
    <div class="badges"><span class="mono">1080 × 1920</span><span class="mono">−14 LUFS ✓</span><span class="mono">AI-labelled</span><span class="mono">+ carousels</span></div>`;

  // rail
  tl.fromTo("#rail, #r-n", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, PIPE[0].t - 0.2);
  const nodes = [...document.querySelectorAll("#rail .node")];
  PIPE.forEach((p, i) => {
    tl.to("#r-fill", { scaleX: i / 6, duration: 0.45, ease: "power3.inOut" }, p.t);
    tl.fromTo(nodes[i].querySelector("b"), { scale: 0.5, backgroundColor: "#1c1c24" }, { scale: 1, backgroundColor: "#d7ff3a", duration: 0.4, ease: "back.out(3)" }, p.t);
    tl.set("#r-i b", { visibility: "hidden" }, p.t);
    tl.set(`#r-i b:nth-child(${i + 1})`, { visibility: "visible" }, p.t);
    if (i) tl.fromTo(nodes[i - 1].querySelector("em"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, p.t);
  });
  tl.fromTo(nodes[6].querySelector("em"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, GATE);

  // cards: each slides up into place, the previous one lifts away
  const cards = [...PIPE.map((_, i) => `#cd-${i}`), "#cd-gate"];
  const starts = [...PIPE.map((p) => p.t), GATE];
  cards.forEach((c, i) => {
    tl.fromTo(c, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, starts[i] + 0.02);
    tl.fromTo(`${c} h2`, { yPercent: 40 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, starts[i]);
    // outgoing card is fully gone before the next one lands, so two cards never share the frame
    if (i < cards.length - 1) tl.to(c, { y: -90, opacity: 0, duration: 0.22, ease: "power2.in" }, starts[i + 1] - 0.2);
  });

  // artifact motion per step
  const s = PIPE.map((p) => p.t);
  tl.fromTo("#art-0 .tile", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.07, ease: "back.out(2)" }, s[0] + 0.1);
  tl.fromTo("#art-0 .bar b", { scaleX: 0 }, { scaleX: (i) => [0.9, 0.35, 0.7, 0.5, 0.95, 0.6][i], duration: 0.8, stagger: 0.06, ease: "power3.out" }, s[0] + 0.35);
  tl.fromTo("#art-0 .scan", { yPercent: -10 }, { yPercent: 900, duration: 1.3, ease: "power1.inOut" }, s[0] + 0.2);
  tl.fromTo("#art-1 .sw", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "expo.out" }, s[1] + 0.1);
  tl.fromTo("#art-1 .spec span", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, s[1] + 0.6);
  tl.fromTo("#art-2 .doc p", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.18, ease: "power2.out" }, s[2] + 0.1);
  tl.fromTo("#art-2 .stamp", { scale: 2.2, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.35, ease: "back.out(2)" }, s[2] + 0.95);
  tl.fromTo("#art-3 .wave i", { scaleY: 0.1 }, { scaleY: 1, duration: 0.3, stagger: { each: 0.02, from: "center" }, ease: "power2.out" }, s[3] + 0.1);
  tl.to("#art-3 .wave i", { scaleY: (i) => 0.35 + ((i * 37) % 10) / 14, duration: 0.25, stagger: 0.015, yoyo: true, repeat: 3, ease: "sine.inOut" }, s[3] + 0.6);
  tl.fromTo("#art-4 .cam", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "expo.out" }, s[4] + 0.05);
  tl.fromTo("#art-4 .rec", { opacity: 1 }, { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 3 }, s[4] + 0.2);
  tl.fromTo("#art-5 .clips b", { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" }, s[5] + 0.05);
  tl.fromTo("#art-5 .head", { left: "8%" }, { left: "92%", duration: s[6] - s[5], ease: "none" }, s[5]);
  tl.fromTo("#art-6 .mini-phone", { y: 80, opacity: 0, rotation: 6 }, { y: 0, opacity: 1, rotation: -3, duration: 0.6, ease: "expo.out" }, s[6] + 0.05);
  FRAMES.forEach((_, i) => {
    if (i) {
      tl.fromTo(`#fr-${i}`, { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: "power4.inOut" }, s[6] + 0.1 + i * 0.32);
      tl.set(`#fr-${i - 1}`, { visibility: "hidden" }, s[6] + 0.46 + i * 0.32);
    }
  });
  tl.fromTo("#art-6 .badges span", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.12, ease: "back.out(2)" }, s[6] + 0.35);
  // gates cascade
  document.querySelectorAll("#gates li").forEach((li, i) => {
    tl.fromTo(li, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, GATE + 0.15 + i * 0.12);
    tl.fromTo(li.querySelector("em"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(3)" }, GATE + 0.45 + i * 0.16);
  });

  // captions: one phrase at a time, words rise as spoken
  // one caption line per clause of the middle sentence: break after a comma and before "with"
  const PHR = [];
  VO.forEach((w, i) => {
    if (i < 7 || i >= 40) return; // "It researches …" through "… every gate."
    if (!PHR.length || /,$/.test(VO[i - 1][0]) || w[0] === "with") PHR.push([w[1] - 0.1, 0]);
    PHR[PHR.length - 1][1] = w[2] + 0.1;
  });
  $("#caps").innerHTML = PHR.map((_, i) => `<p class="cap-line" id="cp-${i}"></p>`).join("");
  PHR.forEach(([a, b], i) => {
    const ws = VO.filter((w) => w[1] >= a && w[1] < b);
    const el = $(`#cp-${i}`);
    el.innerHTML = ws.map((w) => `<span class="w" data-layout-allow-overflow><span>${w[0]}</span></span>`).join(" ");
    [...el.querySelectorAll(".w > span")].forEach((sp, j) =>
      tl.fromTo(sp, { yPercent: 110 }, { yPercent: 0, duration: 0.4, ease: "expo.out" }, ws[j][1] - 0.05)
    );
    tl.set(el, { visibility: "hidden" }, 0);
    tl.set(el, { visibility: "visible" }, ws[0][1] - 0.06);
    if (i < PHR.length - 1) tl.set(el, { visibility: "hidden" }, PHR[i + 1][0] + 0.02);
  });
  tl.to("#a-pipe > *", { opacity: 0, y: -40, duration: 0.3, ease: "power2.in" }, CTA - 0.05);

  // ---------- 3 · CTA (≈15.6 – 20) ----------
  $("#a-cta").innerHTML = `<div class="fill"></div><div id="c-mark">${SYN.mark({ id: "c-svg" })}</div>
    <p class="serif" id="c-k">New service</p>
    <h2 class="display" id="c-1">Content automation,</h2><p class="serif" id="c-2">by Syntique.</p>
    <p id="c-url"><span>${D.site.host}</span><em>→</em></p>
    <p class="label" id="c-meta">Research · Script · Voice · Edit · Publish</p>`;
  tl.fromTo("#a-cta .fill", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(80% at 50% 50%)", duration: 0.6, ease: "power3.inOut" }, CTA);
  SYN.drawMark(tl, $("#c-svg"), CTA + 0.15, { draw: 0.6 });
  tl.fromTo("#c-k", { opacity: 0 }, { opacity: 1, duration: 0.4 }, CTA + 0.3);
  SYN.rise(tl, SYN.split($("#c-1")), at("content", 40) - 0.05, { stagger: 0.12, dur: 0.6 });
  SYN.rise(tl, SYN.split($("#c-2")), at("by", 40) - 0.05, { stagger: 0.1, dur: 0.6 });
  tl.fromTo("#c-url", { opacity: 0, y: 24, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, END - 0.2);
  tl.fromTo("#c-url em", { x: -8 }, { x: 8, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 1 }, END + 0.3);
  tl.fromTo("#c-meta", { opacity: 0 }, { opacity: 1, duration: 0.4 }, END + 0.1);

  window.SYN_TL = tl;
  window.SYN_CTA = CTA;
})();
