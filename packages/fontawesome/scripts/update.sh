#!/bin/bash -e

node bin/generate-icon node_modules/font-awesome/css/font-awesome.css\
  --prefix=.fa-\
  --componentName=FontAwesome\
  --fontFamily=FontAwesome\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/FontAwesome.json\
  > FontAwesome.js
cp node_modules/font-awesome/fonts/fontawesome-webfont.ttf Fonts/FontAwesome.ttf
