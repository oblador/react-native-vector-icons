#!/bin/bash -e

# Material icons is currently published on npm and the published
# artifacts are >500MB unpacked. Until that is fixed we'll download
# them directly from the git repo.

TEMP_DIR=`mktemp -d -t rnvi`
REF="f7bd4f25f3764883717c09a1fd867f560c9a9581" # Sep 19, 2022 update

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.ttf -Ls > Fonts/MaterialIcons.ttf

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons-Regular.codepoints

node bin/generate-material-icons $TEMP_DIR/MaterialIcons-Regular.codepoints\
  --componentName=MaterialIcons\
  --fontFamily='Material Icons'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/MaterialIcons.json\
  > MaterialIcons.js

rm -rf $TEMP_DIR
