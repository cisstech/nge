mkdir -p dist/nge/assets/monaco

cp -rf node_modules/monaco-editor/min dist/nge/assets/monaco/min
cp -rf node_modules/monaco-editor/min-maps dist/nge/assets/monaco

cp -rf ./README.md ./dist/nge
cp -rf ./LICENSE ./dist/nge
cp -rf ./CHANGELOG.md ./dist/nge
