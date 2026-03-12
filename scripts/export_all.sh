#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: bash scripts/export_all.sh <output-dir>"
  echo "Example: bash scripts/export_all.sh outputs/chiri-revops-principal-2026-02-19"
  exit 1
fi

INDIR="$1"

echo "=== Rendering HTML ==="
node scripts/render_html.js --inDir "$INDIR"

echo ""
echo "=== Exporting PDF ==="
node scripts/export_pdf.js --inDir "$INDIR"

echo ""
echo "=== Done ==="
echo "Files in $INDIR:"
ls -1 "$INDIR"/*.html "$INDIR"/*.pdf 2>/dev/null || echo "  (no output files found)"
