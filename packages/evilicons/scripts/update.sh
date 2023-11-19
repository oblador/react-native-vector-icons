#!/bin/bash -e

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX -p .)

fontcustom compile ../node_modules/evil-icons/assets/icons \
  --output $TEMP_DIR \
  --name EvilIcons \
  --templates css \
  --force \
  --no-hash

generate-icon $TEMP_DIR/EvilIcons.css \
  --prefix=.icon-ei- \
  --componentName=EvilIcons \
  --fontFamily=EvilIcons \
  --template=../common/templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/EvilIcons.json \
  > index.tsx

cp $TEMP_DIR/EvilIcons.ttf fonts

rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
