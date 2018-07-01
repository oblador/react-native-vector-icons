#!/bin/bash -e

TEMP_DIR=`mktemp -d -t rnvi`
mkdir $TEMP_DIR/svg
curl https://dl.dropboxusercontent.com/u/4339492/entypo.zip > $TEMP_DIR/entypo.zip
unzip -j $TEMP_DIR/entypo.zip *.svg -x __MACOSX/* -d $TEMP_DIR/svg
fontcustom compile $TEMP_DIR/svg -o $TEMP_DIR -n Entypo -t css -h
node bin/generate-icon $TEMP_DIR/Entypo.css\
  --componentName=Entypo\
  --fontFamily=Entypo\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Entypo.json\
  > Entypo.js
cp $TEMP_DIR/Entypo.ttf Fonts
rm -rf $TEMP_DIR
rm -rf .fontcustom-manifest.json
