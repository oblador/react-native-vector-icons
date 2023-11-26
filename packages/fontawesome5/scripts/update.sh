#!/bin/bash

set -e

echo "Creating temporary folder"

TEMP_DIR=`mktemp -d -t rnvi.XXXX`
echo "Created folder $TEMP_DIR"
pushd ${TEMP_DIR}

# So the npm commands work with workspaces
touch package.json

echo "Please enter your FontAwesome5 npm token:"

read fa5_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" ${fa5_token}

echo "Downloading FontAwesome5"

ARCHIVE=$(npm pack @fortawesome/fontawesome-free@^5 --silent 2> /dev/null)
tar -xzf ${ARCHIVE}
mv package free

ARCHIVE=$(npm pack @fortawesome/fontawesome-pro@^5 --silent 2> /dev/null)
tar -xzf ${ARCHIVE}
mv package pro

popd

echo "Creating glyphmaps"

generate-icon ${TEMP_DIR}/free/css/all.css \
  --prefix .fa- \
  --componentName FontAwesome5 \
  --fontFamily fontawesome5 \
  --glyphmap glyphmaps/FontAwesome5Free.json \
   > /dev/null

generate-icon ${TEMP_DIR}/pro/css/all.css \
  --prefix .fa- \
  --componentName FontAwesome5 \
  --fontFamily fontawesome5 \
  --glyphmap glyphmaps/FontAwesome5Pro.json \
   > /dev/null

echo "Generating font metadata"

node ./scripts/generate-fontawesome5-metadata \
    --path ${TEMP_DIR}/free \
    --output glyphmaps/FontAwesome5Free_meta.json

node ./scripts/generate-fontawesome5-metadata \
    --path ${TEMP_DIR}/pro \
    --output glyphmaps/FontAwesome5Pro_meta.json

echo "Copying font files"

cp ${TEMP_DIR}/free/webfonts/fa-brands-400.ttf fonts/FontAwesome5_Brands.ttf
cp ${TEMP_DIR}/free/webfonts/fa-regular-400.ttf fonts/FontAwesome5_Regular.ttf
cp ${TEMP_DIR}/free/webfonts/fa-solid-900.ttf fonts/FontAwesome5_Solid.ttf

echo "Removing temporary files"

rm -r ${TEMP_DIR}

echo "Done"
