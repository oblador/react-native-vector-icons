#!/bin/bash -e

curl https://raw.githubusercontent.com/ez-connect/flutter-ionicons/master/assets/ionicons.css > $TEMP_DIR/ionicons.css

node bin/generate-icon $TEMP_DIR/ionicons.css\
  --prefix=.icon-\
  --componentName=Ionicons\
  --fontFamily=Ionicons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Ionicons.json\
  > Ionicons.js
# cp node_modules/ionicons/dist/fonts/ionicons.ttf Fonts/Ionicons.ttf
