"""Cut every pinned word out of the final voiceovers into marketing/videos/pronunciation-check/,
plus one combined file (each clip separated by a short pause) and an index, so the words can be
checked by ear in a minute. Old-take clips of "Syntique" and "niche" are included for comparison.

    python tools/pronunciation-pack.py
"""
import os, re, subprocess

ROOT = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(ROOT, "..", "pronunciation-check")
os.makedirs(OUT, exist_ok=True)

vo_js = open(os.path.join(ROOT, "shared", "vo.js"), encoding="utf8").read()
def words(key):
    block = re.search(rf"  {key}: \[(.*?)\n  \],", vo_js, re.S).group(1)
    return [(w, float(a), float(b)) for w, a, b in re.findall(r'\["([^"]+)", ([\d.]+), ([\d.]+)\]', block)]

# (label, audio, start, end, how it should sound)
CHECKS = []
def add(key, word, n, say, pad=(0.35, 0.35)):
    hits = [w for w in words(key) if w[0].rstrip(".,:") == word]
    w = hits[n]
    CHECKS.append((f"{key}-{word}{'-' + str(n + 1) if len(hits) > 1 else ''}", f"assets/audio/vo-{key}.mp3",
                   max(0, w[1] - pad[0]), w[2] + pad[1], say))

add("automation", "niche", 0, "neesh /niːʃ/")
add("automation", "Syntique", 0, "sin-TEEK /sɪnˈtiːk/")
add("promo", "closes", 0, "KLOH-ziz /ˈkloʊzɪz/")
add("promo", "Syntique", 0, "sin-TEEK /sɪnˈtiːk/")
add("promo", "US", 0, "you-ESS (the country)")
add("promo", "TimBuckDo", 0, "TIM-buck-doo")
add("promo", "CareerView", 0, "kuh-REER-vyoo")
add("promo", "CHF", 0, "see-aitch-EFF", pad=(0.35, 0.05))
add("promo", "USA", 0, "you-ess-AY", pad=(0.05, 0.35))
add("promo", "Syntique", 1, "sin-TEEK dot tech", pad=(0.35, 0.9))
# previous takes, for comparison (TTS text was the respelling "Sinteek"; niche was plain text)
CHECKS.append(("OLD-automation-niche", "assets/audio/src/vo-automation-take1.mp3", 3.3, 4.6, "old take: listen for 'nitch'"))
CHECKS.append(("OLD-promo-Syntique", "assets/audio/src/vo-promo-take1.mp3", 4.5, 5.9, "old take: respelled 'Sinteek'"))

lines, parts = ["# Pronunciation check — listen to each clip (all.mp3 plays them in this order)", ""], []
for i, (label, src, a, b, say) in enumerate(CHECKS, 1):
    dst = os.path.join(OUT, f"{i:02d}-{label}.mp3")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.2f}", "-to", f"{b:.2f}", "-i", os.path.join(ROOT, src),
                    "-af", "afade=t=in:d=0.03,afade=t=out:st=%.2f:d=0.05,apad=pad_dur=0.7" % (b - a - 0.05),
                    "-ar", "48000", "-ac", "1", dst], check=True)
    parts.append(dst)
    lines.append(f"{i:02d}. {label:<24} {a:6.2f}–{b:5.2f}s in {os.path.basename(src):<26} should sound like: {say}")
with open(os.path.join(OUT, "list.txt"), "w", encoding="utf8") as f:
    f.write("".join(f"file '{p}'\n" for p in parts))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(OUT, "list.txt"),
                "-c:a", "libmp3lame", "-q:a", "3", os.path.join(OUT, "all.mp3")], check=True)
os.remove(os.path.join(OUT, "list.txt"))
open(os.path.join(OUT, "README.txt"), "w", encoding="utf8").write("\n".join(lines) + "\n")
print(f"wrote {len(CHECKS)} clips + all.mp3 + README.txt to {os.path.normpath(OUT)}")
