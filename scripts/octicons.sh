#!/bin/bash -e

TEMP_DIR=`mktemp -d -t rnvi`
fontcustom compile node_modules/octicons/build/svg -o $TEMP_DIR -n Octicons -t css -h -A
node bin/generate-icon $TEMP_DIR/Octicons.css\
  --prefix=.icon-\
  --componentName=Octicons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Octicons.json\
  --fontFamily=Octicons\
  > Octicons.js
cp $TEMP_DIR/Octicons.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
