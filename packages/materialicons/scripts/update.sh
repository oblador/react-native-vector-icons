#!/bin/bash

set -e

# Material icons is currently published on npm and the published
# artifacts are >500MB unpacked. Until that is fixed we'll download
# them directly from the git repo.

TEMP_DIR=$(mktemp -d -t rnvi.XXX)
REF="f7bd4f25f3764883717c09a1fd867f560c9a9581" # Sep 19, 2022 update

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons-Regular.codepoints

generate-icon $TEMP_DIR/MaterialIcons-Regular.codepoints \
  --componentName MaterialIcons \
  --fontFamily 'Material Icons' \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/MaterialIcons.json \
  --mode codepoints \
  > src/index.ts

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.ttf -Ls > fonts/MaterialIcons.ttf

rm -rf $TEMP_DIR
