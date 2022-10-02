#!/bin/bash -e

TEMP_DIR=$(mktemp -d -t rnvi.XXXXXX)
fantasticon node_modules/@entypo-icons/core/icons -o $TEMP_DIR -n Entypo -g css -t ttf

node bin/generate-icon.js $TEMP_DIR/Entypo.css\
  --componentName=Entypo \
  --fontFamily=Entypo \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Entypo.json \
  > Entypo.js
cp $TEMP_DIR/Entypo.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
