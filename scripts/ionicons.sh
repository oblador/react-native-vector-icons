#!/bin/bash -e

node bin/generate-icon node_modules/ionicons/dist/css/ionicons.css\
  --prefix=.ion-\
  --componentName=Ionicons\
  --fontFamily=Ionicons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Ionicons.json\
  > Ionicons.js

# Fix vertical alignment
FONT_PATH=./node_modules/ionicons/dist/fonts
FONT_FILE=${FONT_PATH}/ionicons.ttf
XML_FILE=${FONT_PATH}/Ionicons.hhea.xml
ftxdumperfuser -t hhea -A d ${FONT_FILE} && sed -i '' 's/lineGap="46"/lineGap="0"/' ${XML_FILE} && sed -i '' 's/ascender="448"/ascender="471"/' ${XML_FILE} && ftxdumperfuser -t hhea -A f ${FONT_FILE}

cp ${FONT_FILE} Fonts/Ionicons.ttf
