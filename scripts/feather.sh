#!/bin/bash -e

fontcustom compile node_modules/feather-icons/dist/icons\
  --font-name=Feather\
  --output=Feather\
  --quiet\
  --force\
  --no-hash

node bin/generate-icon Feather/Feather.css\
  --prefix=.icon-\
  --componentName=Feather\
  --fontFamily=Feather\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Feather.json\
  > Feather.js
cp Feather/Feather.ttf Fonts/Feather.ttf

rm -rf Feather
