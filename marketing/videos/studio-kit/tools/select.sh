#!/usr/bin/env bash
# check / snapshot / preview read index.html; copy the composition under review into it.
#   bash tools/select.sh promo-vertical.html   (a file in cuts/)
set -euo pipefail
cd "$(dirname "$0")/.."
cp "cuts/$1" index.html
echo "index.html <- $1"
