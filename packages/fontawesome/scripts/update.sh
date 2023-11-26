#!/bin/bash

set -e

generate-icon ../../node_modules/font-awesome/css/font-awesome.css \
  --prefix .fa- \
  --componentName FontAwesome \
  --fontFamily FontAwesome \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/FontAwesome.json \
  > src/index.ts

cp ../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf fonts/FontAwesome.ttf
