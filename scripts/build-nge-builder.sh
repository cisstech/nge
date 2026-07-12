#!/bin/bash
set -euo pipefail

# Compiles the framework-free doc compiler and its architect builder to CommonJS.
# dist/nge is an ESM package ("type":"module"), so the Node builder lives under
# dist/nge/node with its own package.json marking that subtree as CommonJS.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npx tsc -p projects/nge/tsconfig.builder.json

# tsc emits every program file under rootDir, so type-only imports drag the
# Angular-facing src files in too. Only src/shared (the framework-free utils)
# is needed at runtime; drop the rest so the Node bundle carries no dead
# @angular imports.
find dist/nge/node/src -mindepth 1 -maxdepth 1 ! -name shared -exec rm -rf {} +

echo '{ "type": "commonjs" }' > dist/nge/node/package.json

cp -f projects/nge/builders.json dist/nge/builders.json
cp -f projects/nge/doc/builders/docs/schema.json dist/nge/node/builders/docs/schema.json

# The ng-add schematic follows the same recipe: CJS compile plus static files.
npx tsc -p projects/nge/tsconfig.schematics.json
echo '{ "type": "commonjs" }' > dist/nge/schematics/package.json
cp -f projects/nge/doc/schematics/collection.json dist/nge/schematics/collection.json
cp -f projects/nge/doc/schematics/ng-add/schema.json dist/nge/schematics/ng-add/schema.json

echo "build-nge-builder: staged @cisstech/nge:docs and ng-add into dist/nge"
