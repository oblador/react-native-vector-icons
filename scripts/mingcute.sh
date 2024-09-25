#!/bin/bash -e

node bin/generate-icon node_modules/mingcute_icon/font/Mingcute.css\
  --prefix=.mgc_\
  --componentName=MingCute\
  --fontFamily='MingCute'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/MingCute.json\
  > MingCute.js
cp  node_modules/mingcute_icon/font/MingCute.ttf Fonts/MingCute.ttf
