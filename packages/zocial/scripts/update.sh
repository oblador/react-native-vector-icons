#!/bin/bash -e

node bin/generate-icon node_modules/css-social-buttons/css/zocial.css\
  --prefix=.zocial.\
  --componentName=Zocial\
  --fontFamily=zocial\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Zocial.json\
  > Zocial.js
 cp node_modules/css-social-buttons/css/zocial.ttf Fonts/Zocial.ttf
