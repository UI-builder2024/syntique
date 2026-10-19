"""Print tempo estimate and a 0.5s RMS energy strip for each audio file (used to align cuts)."""
import subprocess, sys
import numpy as np
SR = 22050
for path in sys.argv[1:]:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.float32)
    hop = 512
    frames = len(x) // hop
    e = np.array([np.sum(x[i*hop:(i+1)*hop] ** 2) for i in range(frames)])
    on = np.maximum(0, np.diff(np.log1p(e * 1000)))
    on -= on.mean()
    ac = np.correlate(on, on, "full")[len(on)-1:]
    fps = SR / hop
    lags = np.arange(len(ac)) / fps
    m = (lags > 60/180) & (lags < 60/70)
    beat = lags[m][np.argmax(ac[m])]
    # beat phase: offset maximizing onset sum on the beat grid
    period = beat * fps
    best = max(range(int(period)), key=lambda o: on[o::1][::1][np.round(np.arange(o, len(on), period)).astype(int) - o].sum() if True else 0)
    print(f"\n{path}: {len(x)/SR:.2f}s  beat={beat:.3f}s ({60/beat:.1f} BPM)  phase={best/fps:.3f}s")
    win = int(0.5 * SR)
    rms = [np.sqrt(np.mean(x[i:i+win] ** 2)) for i in range(0, len(x) - win + 1, win)]
    peak = max(rms)
    print(" ".join(f"{r/peak*9:.0f}" for r in rms))
