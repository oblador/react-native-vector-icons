#!/bin/bash

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX -p .)

mkdir -p $TEMP_DIR/svg
cp ../../node_modules/feather-icons/dist/icons/*.svg $TEMP_DIR/svg

# The most icons fail compile with "Some fragments did not join" if not converted to plain paths
svg-object-to-path "$TEMP_DIR/svg/*.svg"

fontcustom compile $TEMP_DIR/svg \
  --output $TEMP_DIR \
  --name Feather \
  --templates css \
  --force \
  --no-hash

generate-icon $TEMP_DIR/Feather.css \
  --componentName Feather \
  --fontFamily Feather \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Feather.json \
  > src/index.tsx

mv $TEMP_DIR/Feather.ttf fonts

rm -rf $TEMP_DIR
