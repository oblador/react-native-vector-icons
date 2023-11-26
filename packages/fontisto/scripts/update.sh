#!/bin/bash -e

generate-icon ../../node_modules/fontisto/css/fontisto/fontisto.css \
  --prefix .fi- \
  --componentName Fontisto \
  --fontFamily Fontisto \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Fontisto.json \
  > src/index.ts

cp ../../node_modules/fontisto/fonts/fontisto/fontisto.ttf fonts/Fontisto.ttf
