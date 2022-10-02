#!/bin/bash -e

TEMP_DIR=$(mktemp -d -t rnvi.XXXXXX)
rm -rf $TEMP_DIR/svg
mkdir -p $TEMP_DIR/svg
cp node_modules/@primer/octicons/build/svg/*-16.svg $TEMP_DIR/svg
FILES="$TEMP_DIR/svg/*"
for f in $FILES
do
  mv $f $(echo $f | sed -e 's/-16\.svg$/.svg/')
done

fantasticon $TEMP_DIR/svg -o $TEMP_DIR -n Octicons -g css -t ttf

node bin/generate-icon.js $TEMP_DIR/Octicons.css\
  --prefix=.icon- \
  --componentName=Octicons \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/Octicons.json \
  --fontFamily=Octicons \
  > Octicons.js
cp $TEMP_DIR/Octicons.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
