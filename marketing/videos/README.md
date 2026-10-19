# Syntique — marketing videos

Channel-ready videos built from the website's own screenshots, copy and stats (`src/lib/*.ts`), in
the brand system (Ink / Paper / Signal / Volt; Bricolage Grotesque, Instrument Serif italic, JetBrains Mono)
with the circuit-trace S drawing on as the sting. Made with HyperFrames; source in [`studio-kit/`](studio-kit/).

| File | Length | Format | Audio | Intended channel |
| --- | --- | --- | --- | --- |
| `syntique-promo-16x9.mp4` | 45.0s | 1920×1080, H.264/AAC, 30 fps | Voiceover + kinetic captions, music, SFX | YouTube, LinkedIn feed, website (home/about), pitch decks |
| `syntique-promo-9x16.mp4` | 45.0s | 1080×1920, H.264/AAC, 30 fps | Voiceover + kinetic captions, music, SFX | Instagram Reels, YouTube Shorts, TikTok, LinkedIn mobile |
| `case-sisters-in-sweat-9x16.mp4` | 16.0s | 1080×1920, H.264/AAC, 30 fps | Music + SFX, kinetic text (sound-off friendly) | Reels / Shorts / Stories / LinkedIn — case study 01 |
| `case-four-states-9x16.mp4` | 16.0s | 1080×1920, H.264/AAC, 30 fps | Music + SFX, kinetic text | Reels / Shorts / Stories / LinkedIn — case study 02 |
| `case-timbuckdo-9x16.mp4` | 16.0s | 1080×1920, H.264/AAC, 30 fps | Music + SFX, kinetic text | Reels / Shorts / Stories / LinkedIn — case study 03 |
| `case-careerview-9x16.mp4` | 16.0s | 1080×1920, H.264/AAC, 30 fps | Music + SFX, kinetic text | Reels / Shorts / Stories / LinkedIn — case study 04 |
| `case-chf-usa-9x16.mp4` | 16.0s | 1080×1920, H.264/AAC, 30 fps | Music + SFX, kinetic text | Reels / Shorts / Stories / LinkedIn — case study 05 |
| `automation-pipeline-9x16.mp4` | 20.0s | 1080×1920, H.264/AAC, 30 fps | Voiceover + captions, music, SFX | Reels / Shorts / TikTok, LinkedIn — content-automation service |

All files are mastered to about −14 LUFS integrated (−13.8 to −14.0), −1.5 dBTP — the level Instagram,
TikTok and YouTube normalise to. `contact-sheets/` holds one frame per second of every file (timestamped),
used for the frame-by-frame review.
The older silent 31s reel (`../showreel-*.mp4`, from `/showreel`) is unchanged.

## What's in each

- **Brand promo** — hook ("Your website is your best salesperson. We make sure it closes.") → S-mark sting →
  "Websites. Platforms. Automation." for teams in India, the US and Australia → the five case studies
  (device mockups, category, one stat each from `work.ts`) → Discover → Grow process → "Let's build it right." CTA.
- **Case-study cuts** — headline hook (`project.headline`) → desktop + mobile screenshots → "What we did"
  (the `approach` titles, ticked off) + stack → every `stats` entry with count-ups (four for Sisters In Sweat's
  production numbers, three for the rest) → CTA. Story-style progress segments at the top; labels are quiet
  Instrument Serif lines (no boxed breadcrumbs), at most one per scene.
- **Automation explainer** — "A content engine that never runs dry." → the seven pipeline steps from
  `Automation.tsx` (Research, Design language, Script, Voice, Avatar, Edit, Publish), each with a small
  visual of its output → approval at every gate → CTA.

All text in the 9:16 files sits inside Instagram's safe area (top 14%, bottom 22%, right 12% kept clear).
No metrics or quotes were invented: every number and claim is from `src/lib/work.ts`, `services.ts`,
`site.ts` or `Automation.tsx`; the draft testimonials are not used.

## Before posting

- **Domain** — CTAs show `syntique.tech`, which `src/lib/site.ts` still marks `CONFIRM`. If it changes,
  edit `site.ts` and re-render (below). The promo voiceover also says "Syntique dot tech" — that needs a new
  voice take.
- **Audio rights** — voiceover (voice "Justin Case", `eleven_v4`) and music (`eleven_music_v2_5`, instrumental)
  were generated in your connected ElevenLabs workspace (flow "Syntique video kit — audio"); commercial use
  follows your ElevenLabs plan. SFX are the HyperFrames bundled set (Pixabay Content License, see
  `studio-kit/assets/sfx/CREDITS.md`).
- **Captions** — the voiced videos have burned-in kinetic captions; platforms' auto-captions can stay off.
- **Pronunciation** — the voiceovers pin tricky words with IPA in the TTS text (captions keep normal spelling):
  Syntique /sɪnˈtiːk/ (sin-TEEK), niche /niːʃ/ (neesh), closes /ˈkloʊzɪz/, the US /juː ˈɛs/, TimBuckDo
  /ˈtɪm bʌk duː/, CareerView /kəˈrɪər vjuː/, CHF USA spelled letter by letter. `pronunciation-check/all.mp3`
  plays each of those words (plus the old takes' "niche" and "Syntique" for comparison) — listen once before
  posting; `pronunciation-check/README.txt` lists what each clip should sound like.

## Editing and re-rendering

From `studio-kit/` (needs Node 22+, ffmpeg):

```bash
bash tools/render-all.sh
```

That re-exports `src/lib/*.ts` into `shared/data.js`, regenerates every cut in `cuts/`, renders all eight
MP4s here and masters their loudness (`tools/master-audio.py`); about 40 minutes for the set on this machine; pass a cut name (e.g. `bash tools/render-all.sh case-timbuckdo`) to render one. Then
`bash tools/contact-sheets.sh` refreshes the sheets.

- Scene logic: `shared/promo.js`, `shared/case.js`, `shared/automation.js`; layout: `promo.css`, `case.css`,
  `automation.css`; brand tokens and fonts: `brand.css`.
- To open one cut in HyperFrames Studio: `bash tools/select.sh promo-vertical.html` (copies it to
  `index.html`), then `npx hyperframes@0.8.169 preview`.
- Audio: raw takes in `assets/audio/src/`, trimmed/aligned by `tools/prep-audio.sh`; voiceover word timings
  (ElevenLabs Scribe) in `shared/vo.js`; the music bed's voiceover carve in `shared/carve/`.
