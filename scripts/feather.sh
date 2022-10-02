#!/bin/bash -e

TEMP_DIR=$(mktemp -d -t rnvi.XXXXXX)
rm -rf $TEMP_DIR/svg
mkdir -p $TEMP_DIR/svg
cp node_modules/feather-icons/dist/icons/*.svg $TEMP_DIR/svg


fantasticon $TEMP_DIR/svg -o $TEMP_DIR -n Feather -g css -t ttf

node bin/generate-icon ${TEMP_DIR}/Feather.css \
  --componentName=Feather \
  --fontFamily=Feather \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Feather.json > Feather.js
mv "${TEMP_DIR}/Feather.ttf" "Fonts/Feather.ttf" && rm -rf ${TEMP_DIR}
