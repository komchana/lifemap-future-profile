#!/usr/bin/env bash
# Verifies that the working tree (or a given directory) holds exactly the deployed Skill Lab v02 files.
#   docs/skilllab-baseline/verify-baseline.sh [dir=.] [--live]
# --live additionally downloads each file from https://ubiquitous-narwhal-a393cf.netlify.app and compares (read-only GETs).
set -euo pipefail
DIR="${1:-.}"; LIVE="${2:-}"; M="$(cd "$(dirname "$0")" && pwd)/BASELINE_V02_MANIFEST.sha256"; bad=0
while read -r sha bytes path; do
  case "$sha" in \#*|"") continue;; esac
  have="$(shasum -a 256 "$DIR/$path" 2>/dev/null | cut -d' ' -f1 || true)"
  if [ "$have" = "$sha" ]; then s=OK; else s="DIFF"; bad=1; fi
  if [ "$LIVE" = "--live" ]; then live="$(curl -s --max-time 40 "https://ubiquitous-narwhal-a393cf.netlify.app/$path" | shasum -a 256 | cut -d' ' -f1)"; [ "$live" = "$sha" ] && l="live=OK" || { l="live=DIFF"; bad=1; }; else l=""; fi
  printf "%-6s %-30s %s\n" "$s" "$path" "$l"
done < "$M"
[ $bad = 0 ] && echo "baseline verified" || { echo "baseline MISMATCH"; exit 1; }
