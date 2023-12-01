#!/bin/bash -e

generate-icon ../../node_modules/@mdi/font/css/materialdesignicons.css \
  --prefix .mdi-\
  --componentName MaterialCommunityIcons\
  --fontFamily 'Material Design Icons'\
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/MaterialCommunityIcons.json\
  > src/index.ts

cp ../../node_modules/@mdi/font/fonts/materialdesignicons-webfont.ttf fonts/MaterialCommunityIcons.ttf
