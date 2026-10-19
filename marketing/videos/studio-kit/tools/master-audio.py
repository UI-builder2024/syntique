"""Two-pass EBU R128 loudness normalisation of the rendered MP4s to social-platform level
(-14 LUFS integrated, -1.5 dBTP). The video stream is copied untouched; only audio is re-encoded.

    python tools/master-audio.py ../syntique-promo-9x16.mp4 [...]     # in place
"""
import json, os, re, subprocess, sys

TARGET = dict(I=-14.0, TP=-1.5, LRA=11.0)

for path in sys.argv[1:]:
    flt = f"loudnorm=I={TARGET['I']}:TP={TARGET['TP']}:LRA={TARGET['LRA']}"
    p1 = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", flt + ":print_format=json", "-f", "null", "-"],
                        capture_output=True, text=True).stderr
    m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p1, re.S).group(0))
    second = (f"{flt}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
              f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    tmp = path + ".mastering.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-map", "0", "-c:v", "copy", "-af", second,
                    "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", tmp], check=True)
    os.replace(tmp, path)
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128=framelog=quiet", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    i = re.findall(r"I:\s+(-?[\d.]+) LUFS", out)[-1]
    print(f"{os.path.basename(path)}: {float(m['input_i']):.1f} -> {i} LUFS")
