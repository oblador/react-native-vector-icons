#!/bin/bash -e

TEMP_DIR=tmp
rm -rf $TEMP_DIR/svg
mkdir -p $TEMP_DIR/svg
cp node_modules/feather-icons/dist/icons/*.svg $TEMP_DIR/svg

# The most icons fail compile with "Some fragments did not join" if not converted to plain paths
./scripts/svg-object-to-path.sh $TEMP_DIR/svg/*.svg

./scripts/fontcustom compile $TEMP_DIR/svg \
  --output $TEMP_DIR \
  --name Feather \
  --templates css \
  --force \
  --no-hash

node bin/generate-icon ${TEMP_DIR}/Feather.css \
  --componentName=Feather \
  --fontFamily=Feather \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Feather.json > Feather.js
mv "${TEMP_DIR}/Feather.ttf" "Fonts/Feather.ttf" && rm -rf ${TEMP_DIR}
