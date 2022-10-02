#!/bin/bash -e

TEMP_DIR=$(mktemp -d -t rnvi.XXXXXX)
fantasticon node_modules/evil-icons/assets/icons -o $TEMP_DIR -n EvilIcons -g css -t ttf

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
