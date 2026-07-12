#!/bin/bash
set -euo pipefail

# Compiles the framework-free doc compiler and its architect builder to CommonJS.
# dist/nge is an ESM package ("type":"module"), so the Node builder lives under
# dist/nge/node with its own package.json marking that subtree as CommonJS.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npx tsc -p projects/nge/tsconfig.builder.json

# tsc emits every program file under rootDir, so type-only imports drag the
# Angular-facing src files in too. Only the pure utils (frontmatter, slug) are
# needed at runtime; drop the rest so the Node bundle carries no dead @angular
# imports.
find dist/nge/node/src -type f ! -name 'frontmatter.js' ! -name 'slug.js' -delete

echo '{ "type": "commonjs" }' > dist/nge/node/package.json

cp -f projects/nge/builders.json dist/nge/builders.json
cp -f projects/nge/doc/builders/docs/schema.json dist/nge/node/builders/docs/schema.json

echo "build-nge-builder: staged @cisstech/nge:docs into dist/nge/node"
