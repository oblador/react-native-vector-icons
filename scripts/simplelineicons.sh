#!/bin/bash -e

node bin/generate-icon bower_components/simple-line-icons/css/simple-line-icons.css\
  --prefix=.icon-\
  --componentName=SimpleLineIcons\
  --fontFamily=simple-line-icons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/SimpleLineIcons.json\
  > SimpleLineIcons.js
cp bower_components/simple-line-icons/fonts/Simple-Line-Icons.ttf Fonts/SimpleLineIcons.ttf
