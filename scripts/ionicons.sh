#!/bin/bash -e

TEMP=$(mktemp -d -t rnvi.XXXXXX)
pushd ${TEMP}
curl -o font.zip -L https://ionic.io/ionicons/ionicons.designerpack.zip
unzip -j -d $TEMP/svg font.zip
popd

fantasticon $TEMP/svg -o $TEMP -n ionicons -g css -t ttf

node bin/generate-icon $TEMP/ionicons.css\
  --prefix=.ion-\
  --componentName=Ionicons\
  --fontFamily=Ionicons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Ionicons.json\
  > Ionicons.js

cp $TEMP/ionicons.ttf Fonts/Ionicons.ttf