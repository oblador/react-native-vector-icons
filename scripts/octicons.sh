#!/bin/bash -e

TEMP_DIR=tmp
./scripts/fontcustom compile node_modules/octicons/build/svg \
  --output $TEMP_DIR \
  --name Octicons \
  --templates css \
  --no-hash \
  --autowidth

node bin/generate-icon.js $TEMP_DIR/Octicons.css\
  --prefix=.icon- \
  --componentName=Octicons \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Octicons.json \
  --fontFamily=Octicons \
  > Octicons.js
cp $TEMP_DIR/Octicons.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
