#!/bin/bash -e

node bin/generate-icon bower_components/foundation-icon-fonts/foundation-icons.css\
  --prefix=.fi-\
  --componentName=Foundation\
  --fontFamily=fontcustom\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Foundation.json\
  > Foundation.js
cp bower_components/foundation-icon-fonts/foundation-icons.ttf Fonts/Foundation.ttf
