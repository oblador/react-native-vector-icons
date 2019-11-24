#!/bin/bash -e

node bin/generate-icon node_modules/fontisto/css/fontisto/fontisto.css\
  --prefix=.fi-\
  --componentName=Fontisto\
  --fontFamily=Fontisto\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Fontisto.json\
  > Fontisto.js
cp node_modules/fontisto/fonts/fontisto/fontisto.ttf Fonts/Fontisto.ttf
