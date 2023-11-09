#!/bin/bash -e

TEMP_DIR=tmp
./scripts/fontcustom compile node_modules/evil-icons/assets/icons \
  --output $TEMP_DIR \
  --name EvilIcons \
  --templates css \
  --force \
  --no-hash

node bin/generate-icon.js $TEMP_DIR/EvilIcons.css \
  --prefix=.icon-ei- \
  --componentName=EvilIcons \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/EvilIcons.json \
  --fontFamily=EvilIcons \
  > EvilIcons.js
cp $TEMP_DIR/EvilIcons.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
