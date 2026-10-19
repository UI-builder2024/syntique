#!/usr/bin/env bash
# Rebuilds every cut, renders it to marketing/videos/<name>.mp4 and masters its loudness.
#   bash tools/render-all.sh            # all eight
#   bash tools/render-all.sh promo-vertical   # just one (name of a file in cuts/, no .html)
set -euo pipefail
cd "$(dirname "$0")/.."
HF="npx --yes hyperframes@0.8.169"
OUT=..

node --experimental-strip-types tools/export-data.mjs 2>/dev/null
node tools/build-promo.mjs
node tools/build-cases.mjs
node tools/build-automation.mjs

declare -A NAME=(
  [promo-landscape]=syntique-promo-16x9
  [promo-vertical]=syntique-promo-9x16
  [case-sisters-in-sweat]=case-sisters-in-sweat-9x16
  [case-four-states]=case-four-states-9x16
  [case-timbuckdo]=case-timbuckdo-9x16
  [case-careerview]=case-careerview-9x16
  [case-chf]=case-chf-usa-9x16
  [automation-pipeline]=automation-pipeline-9x16
)
ORDER=(promo-landscape promo-vertical case-sisters-in-sweat case-four-states case-timbuckdo case-careerview case-chf automation-pipeline)
[ $# -gt 0 ] && ORDER=("$@")

for cut in "${ORDER[@]}"; do
  bash tools/select.sh "$cut.html"
  echo "== rendering $cut -> $OUT/${NAME[$cut]}.mp4"
  $HF render . -o "$OUT/${NAME[$cut]}.mp4" --quiet --skill=general-video
  python tools/master-audio.py "$OUT/${NAME[$cut]}.mp4"   # -14 LUFS / -1.5 dBTP for social
done
bash tools/select.sh promo-vertical.html
echo "done"
