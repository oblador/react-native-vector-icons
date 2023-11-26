#!/bin/bash

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX -p .)

mkdir -p $TEMP_DIR/svg

oslllo-svg-fixer -s ../../node_modules/@primer/octicons/build/svg -d $TEMP_DIR/svg

find $TEMP_DIR/svg -type f -name "*.svg" ! -name "*-16.svg" -exec rm {} \;

for f in $TEMP_DIR/svg/*; do
  mv $f $(echo $f | sed -e 's/-16\.svg$/.svg/')
done

fontcustom compile $TEMP_DIR/svg \
  --output $TEMP_DIR \
  --name Octicons \
  --templates css \
  --no-hash \
  --autowidth

generate-icon $TEMP_DIR/Octicons.css\
  --prefix .icon- \
  --componentName Octicons \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Octicons.json \
  --fontFamily Octicons \
  > src/index.ts

cp $TEMP_DIR/Octicons.ttf fonts

rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
