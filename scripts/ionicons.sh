#!/bin/bash -e

node bin/generate-icon node_modules/ionicons/dist/css/ionicons.css\
  --prefix=.ion-\
  --componentName=Ionicons\
  --fontFamily=Ionicons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Ionicons.json\
  > Ionicons.js
cp node_modules/ionicons/dist/fonts/ionicons.ttf Fonts/Ionicons.ttf
