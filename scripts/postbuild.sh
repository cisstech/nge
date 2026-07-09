#!/bin/bash

cp -rf ./README.md ./dist/nge
cp -rf ./LICENSE ./dist/nge
cp -rf ./CHANGELOG.md ./dist/nge

# nge-monaco
mkdir -p dist/nge/assets/monaco
cp -rf ./projects/nge/monaco/src/themes ./dist/nge/assets/monaco/themes

# Re-expose the global `monaco` namespace: ng-packagr strips the triple-slash
# reference from the bundled declarations, so inject it into the monaco entry's
# types file. Fail loudly if the path moves, rather than shipping broken types.
MONACO_DTS=./dist/nge/types/cisstech-nge-monaco.d.ts
if [[ ! -f "$MONACO_DTS" ]]; then
  echo "postbuild: expected monaco types at $MONACO_DTS" >&2
  exit 1
fi
if [[ "$OSTYPE" == "darwin"* ]]; then
  gsed -i '1s/^/\/\/\/ <reference types="monaco-editor\/monaco" \/>\n/' "$MONACO_DTS"
else
  sed -i '1s/^/\/\/\/ <reference types="monaco-editor\/monaco" \/>\n/' "$MONACO_DTS"
fi

mkdir -p dist/nge/assets/ui/icon/icons
mkdir -p dist/nge/assets/ui/icon/fonts

cp -rf ./projects/nge/ui/icon/src/assets/ ./dist/nge/assets/ui/icon/

# nge-markdown
mkdir -p dist/nge/assets/markdown
cp -rf ./projects/nge/markdown/src/themes ./dist/nge/assets/markdown/themes
