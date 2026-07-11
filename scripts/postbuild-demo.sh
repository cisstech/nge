#!/bin/bash
set -euo pipefail

# GitHub Pages serves static files and falls back to 404.html for unknown paths.
# The prerendered /guide pages are served directly; the code-first /docs routes
# render on the client, so the root and any unmatched path must serve the CSR
# shell. Angular emits it as index.csr.html; expose it as index.html and 404.html.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BROWSER="$ROOT/dist/demo/browser"
SHELL_HTML="$BROWSER/index.csr.html"

if [[ ! -f "$SHELL_HTML" ]]; then
  echo "postbuild-demo: expected CSR shell at $SHELL_HTML" >&2
  exit 1
fi

cp -f "$SHELL_HTML" "$BROWSER/index.html"
cp -f "$SHELL_HTML" "$BROWSER/404.html"

# The docs builder emits sitemap.xml and robots.txt next to the manifest; move
# them to the site root where crawlers expect them.
GUIDE_ASSETS="$BROWSER/assets/guide"
for file in sitemap.xml robots.txt; do
  if [[ -f "$GUIDE_ASSETS/$file" ]]; then
    mv -f "$GUIDE_ASSETS/$file" "$BROWSER/$file"
  fi
done

echo "postbuild-demo: wrote index.html and 404.html from the CSR shell, moved sitemap.xml/robots.txt to root"
