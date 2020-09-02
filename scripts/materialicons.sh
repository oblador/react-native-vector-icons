#!/bin/bash -e

node bin/generate-material-icons node_modules/material-design-icons/font/MaterialIcons-Regular.codepoints\
  --componentName=MaterialIcons\
  --fontFamily='Material Icons'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/MaterialIcons.json\
  > MaterialIcons.js
cp node_modules/material-design-icons/font/MaterialIcons-Regular.ttf Fonts/MaterialIcons.ttf
