#!/bin/bash -e

# Material icons is currently published on npm and the published
# artifacts are >500MB unpacked. Until that is fixed we'll download
# them directly from the git repo.

TEMP_DIR=`mktemp -d -t rnvi`
REF="3912baecc97388955ce39f5e26bfb786a70cbe48"

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.ttf -Ls > Fonts/MaterialIcons.ttf

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons-Regular.codepoints

node bin/generate-material-icons $TEMP_DIR/MaterialIcons-Regular.codepoints\
  --componentName=MaterialIcons\
  --fontFamily='Material Icons'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/MaterialIcons.json\
  > MaterialIcons.js

rm -rf $TEMP_DIR
