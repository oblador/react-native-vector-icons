#!/bin/bash -e

node bin/generate-icon bower_components/css-social-buttons/css/zocial.css\
  --prefix=.zocial.\
  --componentName=Zocial\
  --fontFamily=zocial\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Zocial.json\
  > Zocial.js
 cp bower_components/css-social-buttons/css/zocial.ttf Fonts/Zocial.ttf
