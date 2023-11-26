#!/bin/bash -e

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX -p .)
mkdir $TEMP_DIR/svg

oslllo-svg-fixer -s ../../node_modules/ionicons/dist/svg -d $TEMP_DIR/svg

fontcustom compile $TEMP_DIR/svg \
  --output $TEMP_DIR \
  --name Ionicons \
  --templates css \
  --force \
  --no-hash

  # --prefix .icon-ei- \
generate-icon $TEMP_DIR/Ionicons.css \
  --componentName Ionicons \
  --fontFamily Ionicons \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Ionicons.json \
  > src/index.tsx

cp $TEMP_DIR/Ionicons.ttf fonts

rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
