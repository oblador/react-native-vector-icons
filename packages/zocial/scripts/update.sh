#!/bin/bash -e

generate-icon ../../node_modules/css-social-buttons/css/zocial.css \
  --prefix .zocial. \
  --componentName Zocial \
  --fontFamily zocial \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Zocial.json \
  > src/index.ts

 cp ../../node_modules/css-social-buttons/css/zocial.ttf fonts/Zocial.ttf
