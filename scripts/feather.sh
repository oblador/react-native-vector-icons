#!/bin/bash -e

node bin/generate-icon Feather/style.css\
  --componentName=Feather\
  --fontFamily=Feather\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Feather.json\
  > Feather.js
cp Feather/fonts/Feather.ttf Fonts/Feather.ttf
