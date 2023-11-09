#!/bin/bash -e

TEMP_DIR=tmp

./scripts/fontcustom compile node_modules/@entypo-icons/core/icons \
  --output $TEMP_DIR \
  --name Entypo \
  --templates css \
  --force \
  --no-hash

node bin/generate-icon.js $TEMP_DIR/Entypo.css\
  --componentName=Entypo \
  --fontFamily=Entypo \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Entypo.json \
  > Entypo.js
cp $TEMP_DIR/Entypo.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
