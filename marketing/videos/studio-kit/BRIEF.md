---
workflow: general-video
flow: automation
storyboard: no
message: "Syntique is the studio that designs and engineers websites, platforms and automation that convert — here is the proof."
audience: "Founders, marketing leads and non-profit teams in India, the US and Australia who need a website, platform or content engine built"
destination: instagram-reels / linkedin / youtube / website
aspect: 1080x1920 (all vertical cuts) + 1920x1080 (landscape promo)
language: en
length: "promo 45s · case studies 16s each · automation explainer 20s"
narration: "yes for the promo and automation explainer (ElevenLabs voiceover + kinetic captions); case studies are sound-off-first: kinetic text + music"
---

## Intent

A channel-ready video kit for Syntique Technologies built from the website's own visuals, to bring in clients.
Eight renders from one project: a 45s brand promo (16:9 + 9:16), five 16s 9:16 case-study cuts (one per
project in `src/lib/work.ts`) and a 20s 9:16 "content automation pipeline" explainer. Confident, crafted,
studio-grade — a step up from the silent 31s `/showreel` reel.

## Assets

- assets/work/<slug>/*.webp — site screenshots (desktop 1440×900, mobile 780×1688, full-page 1440×N, Four States extras).
- assets/brand/mark-*.svg — the circuit-trace S mark; redrawn inline as an SVG path so it can draw on.
- assets/fonts/*.woff2 — Bricolage Grotesque (variable), Instrument Serif (italic), JetBrains Mono (variable), from Fontsource.
- assets/audio/src/*.mp3 — raw ElevenLabs takes (user's connected ElevenLabs workspace, flow "Syntique video kit — audio"): voice "Justin Case" on eleven_v4, music on eleven_music_v2_5 (instrumental).
- assets/audio/*.mp3 — trimmed/aligned beds and VO made by `tools/prep-audio.sh`; word timings in shared/vo.js (ElevenLabs Scribe).
- assets/sfx/*.mp3 — HyperFrames bundled SFX library (Pixabay Content License).

## Customizations

- Logo sting: the S path draws on (stroke-dashoffset), volt nodes pop at both ends, wordmark rises.
- Stat count-ups on the case-study stats (values exactly as in work.ts).
- Beat grid: beds are ~120 BPM; promo bed offset so its drop lands on the first case-study cut (15.3s); case cuts land on the case bed's bar lines.
- Music bed carved under the voiceover (hyperframes-audio carve.mjs), saved in shared/carve/*.attrs.

## Notes

- Copy, stats and claims come only from src/lib/{site,work,services}.ts and Automation.tsx. No invented metrics, no client quotes (TESTIMONIALS are drafts).
- Domain `syntique.tech` is marked CONFIRM in site.ts — CTA text uses it; change in `shared/data.js` if the domain changes.
- 9:16 text stays inside Instagram safe zones: top 14% (269px), bottom 22% (422px), right 12% (130px).
- Volt (#D7FF3A) used sparingly: nodes of the S mark, one accent word per scene at most, check marks.
