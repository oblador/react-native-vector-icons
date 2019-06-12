#!/usr/bin/env bash

TEMP=$(mktemp -d -t "rnvi.XXXXX")
pushd ${TEMP}
curl -o font.zip -L http://maxcdn.icons8.com/fonts/line-awesome/1.1/line-awesome.zip
unzip -j -d font font.zip
popd

node bin/generate-icon ${TEMP}/font/line-awesome.css\
   --prefix=.la-\
   --componentName=LineAwesome \
   --fontFamily=lineawesome \
   --template=templates/separated-icon-set.tpl \
   --glyphmap=glyphmaps/LineAwesome.json \
   > LineAwesome.js

mv ${TEMP}/font/line-awesome.ttf Fonts/LineAwesome.ttf

rm -r ${TEMP}
