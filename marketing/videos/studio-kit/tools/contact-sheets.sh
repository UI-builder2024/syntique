#!/usr/bin/env bash
# One frame per second of every rendered MP4, tiled into marketing/videos/contact-sheets/<name>.jpg,
# with the timestamp burned into each tile. Used for the frame-by-frame review.
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p contact-sheets
for f in *.mp4; do
  n="${f%.mp4}"
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f")
  if [ "$w" -gt 1100 ]; then scale=384:216; cols=6; else scale=216:384; cols=10; fi
  rows=$(( ( ${d%.*} + cols ) / cols ))
  ffmpeg -v error -y -i "$f" -vf "fps=1,scale=$scale,drawtext=text='%{pts\:hms}':x=6:y=6:fontsize=16:fontcolor=white:box=1:boxcolor=black@0.6,tile=${cols}x${rows}:padding=4:margin=4:color=0x222222" -frames:v 1 "contact-sheets/$n.jpg"
  echo "contact-sheets/$n.jpg  (${d}s)"
done
