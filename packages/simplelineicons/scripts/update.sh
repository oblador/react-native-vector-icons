#!/bin/bash -e

generate-icon ../../node_modules/simple-line-icons/css/simple-line-icons.css \
  --prefix .icon- \
  --componentName SimpleLineIcons \
  --fontFamily simple-line-icons \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/SimpleLineIcons.json \
  > src/index.ts

cp ../../node_modules/simple-line-icons/fonts/Simple-Line-Icons.ttf fonts/SimpleLineIcons.ttf
