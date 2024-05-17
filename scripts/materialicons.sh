#!/bin/bash -e

# Material icons is currently published on npm and the published
# artifacts are >500MB unpacked. Until that is fixed we'll download
# them directly from the git repo.

TEMP_DIR=`mktemp -d -t rnvi`
REF="f7bd4f25f3764883717c09a1fd867f560c9a9581" # Sep 19, 2022 update
BASE_MATERIAL_ICONS_URL="https://raw.githubusercontent.com/google/material-design-icons/$REF/font"

echo "Downloading MaterialIcons fonts"
curl $BASE_MATERIAL_ICONS_URL/MaterialIcons-Regular.ttf -Ls > Fonts/MaterialIcons_Regular.ttf
curl $BASE_MATERIAL_ICONS_URL/MaterialIcons-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons_Regular.codepoints

curl $BASE_MATERIAL_ICONS_URL/MaterialIconsOutlined-Regular.otf -Ls > Fonts/MaterialIcons_Outlined.otf
curl $BASE_MATERIAL_ICONS_URL/MaterialIconsOutlined-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons_Outlined.codepoints

curl $BASE_MATERIAL_ICONS_URL/MaterialIconsRound-Regular.otf -Ls > Fonts/MaterialIcons_Round.otf
curl $BASE_MATERIAL_ICONS_URL/MaterialIconsRound-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons_Round.codepoints

curl $BASE_MATERIAL_ICONS_URL/MaterialIconsSharp-Regular.otf -Ls > Fonts/MaterialIcons_Sharp.otf
curl $BASE_MATERIAL_ICONS_URL/MaterialIconsSharp-Regular.codepoints -Ls > $TEMP_DIR/MaterialIcons_Sharp.codepoints

echo "Creating glyphmaps"
node bin/generate-material-icons $TEMP_DIR/MaterialIcons_Regular.codepoints \
  --addCodepoints=$TEMP_DIR/MaterialIcons_Outlined.codepoints \
  --addCodepoints=$TEMP_DIR/MaterialIcons_Round.codepoints \
  --addCodepoints=$TEMP_DIR/MaterialIcons_Sharp.codepoints \
  --componentName=MaterialIcons \
  --fontFamily='Material Icons' \
  --glyphmap=glyphmaps/MaterialIcons.json > /dev/null

echo "Generating metadata"
node bin/generate-material-icons-metadata \
  --path $TEMP_DIR/MaterialIcons_Regular.codepoints \
    $TEMP_DIR/MaterialIcons_Outlined.codepoints \
    $TEMP_DIR/MaterialIcons_Round.codepoints \
    $TEMP_DIR/MaterialIcons_Sharp.codepoints \
  --output glyphmaps/MaterialIcons_meta.json

rm -rf $TEMP_DIR
