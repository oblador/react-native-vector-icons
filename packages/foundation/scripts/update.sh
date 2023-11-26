#!/bin/bash

set -e

generate-icon ../../node_modules/foundation-icon-fonts/foundation-icons.css \
  --prefix .fi- \
  --componentName Foundation \
  --fontFamily fontcustom \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/Foundation.json \
  > src/index.ts

cp ../../node_modules/foundation-icon-fonts/foundation-icons.ttf fonts/Foundation.ttf
