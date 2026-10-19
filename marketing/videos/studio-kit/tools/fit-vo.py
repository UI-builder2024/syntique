"""Fit a re-generated voiceover onto the existing timeline, sentence by sentence.

Each sentence of the new take is cut out (with a little air either side) and placed so its first
word starts exactly where that sentence started before, so scene cuts, music sync and SFX stay put.
If a sentence runs long, the following ones are pushed later (reported). Word timings for the
captions are rewritten into shared/vo.js; caption words keep their normal spelling even where the
TTS text used IPA (/niːʃ/ etc.).

    python tools/fit-vo.py promo        # src/vo-promo.mp3 + src/words-promo.json -> src/vo-promo-fit.wav
    python tools/fit-vo.py automation
"""
import json, os, re, subprocess, sys, wave
import numpy as np

KEY = sys.argv[1]
ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "assets", "audio", "src")
SR = 44100
PRE, POST, GAP = 0.12, 0.3, 0.3

# current caption words + timings (the timeline we keep)
vo_js = open(os.path.join(ROOT, "shared", "vo.js"), encoding="utf8").read()
block = re.search(rf"  {KEY}: \[(.*?)\n  \],", vo_js, re.S)
old = [(w, float(a), float(b)) for w, a, b in re.findall(r'\["([^"]+)", ([\d.]+), ([\d.]+)\]', block.group(1))]

# new take's tokens -> one group per spoken caption word
toks = [t for t in json.load(open(os.path.join(SRC, f"words-{KEY}.json"), encoding="utf8"))["words"]
        if t["type"] == "word" and not t["text"].startswith("[") and not t["text"].endswith("]") and t["text"] != "—"]
groups, cur = [], None
for t in toks:
    if cur is None and t["text"].startswith("/"):
        cur = [t]
    elif cur is not None:
        cur.append(t)
    else:
        groups.append([t])
    if cur is not None and re.search(r"/[.,:]?$", t["text"]):
        groups.append(cur)
        cur = None
new = []
for g in groups:
    a, b = g[0]["start"], g[-1]["end"]
    new.append((a, b))
# "CHF USA" is one IPA group but two caption words: split it at the letter boundary
if len(new) == len(old) - 1:
    i = next(k for k, (w, _, _) in enumerate(old) if w == "CHF")
    a, b = new[i]
    mid = a + (b - a) * 0.5
    new[i:i + 1] = [(a, mid - 0.02), (mid, b)]
assert len(new) == len(old), (len(new), len(old))

# sentences start after a word ending in "."
starts = [0] + [i + 1 for i, (w, _, _) in enumerate(old[:-1]) if w.endswith(".")]
bounds = list(zip(starts, starts[1:] + [len(old)]))

raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(SRC, f"vo-{KEY}.mp3"), "-ac", "1", "-ar", str(SR),
                      "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.float32)
out = np.zeros(int(70 * SR), dtype=np.float32)
fitted, cursor, end_all = [], 0.0, 0.0
for k, (s, e) in enumerate(bounds):
    n_a, n_b = new[s][0], new[e - 1][1]
    nxt_new = new[e][0] if e < len(new) else n_b + 1.0
    a = max(0.0, n_a - PRE)
    b = min(n_b + POST, nxt_new - PRE)
    target = max(old[s][1], cursor)
    if target > old[s][1] + 1e-3:
        print(f"  sentence {k + 1} ('{old[s][0]} …') pushed +{target - old[s][1]:.2f}s")
    seg = x[int(a * SR):int(b * SR)].copy()
    f = int(0.01 * SR)
    seg[:f] *= np.linspace(0, 1, f)
    seg[-f:] *= np.linspace(1, 0, f)
    at = int((target - (n_a - a)) * SR)
    out[at:at + len(seg)] += seg
    shift = target - n_a
    for j in range(s, e):
        fitted.append((old[j][0], round(new[j][0] + shift, 3), round(new[j][1] + shift, 3)))
    cursor = target + (n_b - n_a) + GAP
    end_all = target + (n_b - n_a)
out = out[: int((end_all + 0.6) * SR)]

dst = os.path.join(SRC, f"vo-{KEY}-fit.wav")
with wave.open(dst, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((np.clip(out, -1, 1) * 32767).astype("<i2").tobytes())

# rewrite this VO's word list in shared/vo.js
rows, line = [], []
for i, (w, a, b) in enumerate(fitted):
    line.append(f'["{w}", {a}, {b}]')
    if w.endswith(".") or i == len(fitted) - 1:
        rows.append("    " + ", ".join(line) + ",")
        line = []
vo_js = vo_js.replace(block.group(0), f"  {KEY}: [\n" + "\n".join(rows) + "\n  ],")
open(os.path.join(ROOT, "shared", "vo.js"), "w", encoding="utf8").write(vo_js)
print(f"{KEY}: {len(fitted)} words, speech ends {end_all:.2f}s -> {os.path.relpath(dst, ROOT)}")
for (w, oa, _), (_, na, _) in zip(old, fitted):
    if abs(oa - na) > 0.35:
        print(f"  {w:<14} {oa:6.2f} -> {na:6.2f}")
