cp -rf ./README.md ./dist/nge
cp -rf ./LICENSE ./dist/nge
cp -rf ./CHANGELOG.md ./dist/nge

# nge-monaco
mkdir -p dist/nge/assets/monaco
cp -rf ./projects/nge/monaco/src/themes ./dist/nge/assets/monaco/themes

mkdir -p dist/nge/assets/ui/icon/icons
mkdir -p dist/nge/assets/ui/icon/fonts

cp -rf ./projects/nge/ui/icon/src/assets/ ./dist/nge/assets/ui/icon/

# nge-markdown
cp -rf ./projects/nge/markdown/src/themes ./dist/nge/assets/markdown/themes
