#!/bin/bash

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX -p .)

fontcustom compile node_modules/@entypo-icons/core/icons \
  --output $TEMP_DIR \
  --name Entypo \
  --templates css \
  --force \
  --no-hash

generate-icon $TEMP_DIR/Entypo.css \
  --componentName Entypo \
  --fontFamily Entypo \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Entypo.json \
  > src/index.ts

cp $TEMP_DIR/Entypo.ttf fonts

rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
