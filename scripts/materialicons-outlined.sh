#!/bin/bash -e

# Material icons is currently published on npm and the published
# artifacts are >500MB unpacked. Until that is fixed we'll download
# them directly from the git repo.

TEMP_DIR=`mktemp -d -t rnvi`
REF="63c5cb306073a9ecdfd3579f0f696746ab6305f6" # v4.0.0

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIconsOutlined-Regular.otf -Ls > Fonts/MaterialIconsOutlined.otf

curl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIconsOutlined-Regular.codepoints -Ls > $TEMP_DIR/MaterialIconsOutlined-Regular.codepoints

fontforge -c "import fontforge; from sys import argv; f = fontforge.open(argv[1]); f.generate(argv[2])" Fonts/MaterialIconsOutlined.otf Fonts/MaterialIconsOutlined.ttf

node bin/generate-material-icons $TEMP_DIR/MaterialIconsOutlined-Regular.codepoints\
  --componentName=MaterialIconsOutlined\
  --fontFamily='Material Icons Outlined'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/MaterialIconsOutlined.json\
  > MaterialIconsOutlined.js

rm -rf $TEMP_DIR
