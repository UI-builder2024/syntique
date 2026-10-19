#!/usr/bin/env bash
# Turns the raw ElevenLabs takes in assets/audio/src/ into the beds the compositions play.
# Measured with tools/analyze-audio.py: every bed is ~120 BPM (0.5s beat).
set -euo pipefail
cd "$(dirname "$0")/../assets/audio"
F="ffmpeg -v error -y"

# Promo (45s): drop kick sits at 16.0s in the take — start 0.7s in so it lands on the first
# case-study cut (15.3s). The take ends at ~40.4s, so the intro's pad/arpeggio (1–6s) returns
# under the CTA as a soft outro.
$F -i src/music-promo.mp3 -filter_complex \
  "[0]atrim=0.7:45,asetpts=PTS-STARTPTS[a]; \
   [0]atrim=1:6.5,asetpts=PTS-STARTPTS,volume=1.6,afade=t=in:d=0.8,afade=t=out:st=4.0:d=1.5,adelay=39500|39500[b]; \
   [a][b]amix=inputs=2:normalize=0,apad=whole_dur=45,atrim=0:45,afade=t=out:st=44.2:d=0.8" \
  -ar 48000 music-promo.mp3

# Case studies (16s): take is 16s, high energy throughout, decays from ~14.5s.
$F -i src/music-case.mp3 -af "afade=t=out:st=15.3:d=0.7" -ar 48000 music-case.mp3

# Automation (20s): quiet build to 8s, full from 8s, resolves ~17.5s.
$F -i src/music-automation.mp3 -af "afade=t=out:st=19.2:d=0.8" -ar 48000 music-automation.mp3

# Voiceovers — the ElevenLabs takes arrive at about -33 LUFS; bring them to -16 LUFS so the
# voice sits ~9 dB over the bed (timing is untouched, so shared/vo.js still lines up).
# The takes are first fitted onto the timeline sentence by sentence (tools/fit-vo.py -> src/<vo>-fit.wav).
for v in vo-promo vo-automation; do
  in=src/$v.mp3; [ -f src/$v-fit.wav ] && in=src/$v-fit.wav
  $F -i $in -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 48000 -b:a 192k $v.mp3
done
ls -la *.mp3
