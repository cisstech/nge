cp -rf ./README.md ./dist/nge
cp -rf ./LICENSE ./dist/nge
cp -rf ./CHANGELOG.md ./dist/nge

# nge-monaco
mkdir -p dist/nge/assets/monaco
cp -rf ./projects/nge/monaco/src/themes ./dist/nge/assets/monaco/themes

mkdir -p dist/nge/assets/ui/icon/icons
mkdir -p dist/nge/assets/ui/icon/fonts

cp -rf ./projects/nge/ui/icon/src/assets/icons ./dist/nge/assets/ui/icon/icons
cp -rf ./projects/nge/ui/icon/src/assets/fonts ./dist/nge/assets/ui/icon/fonts

