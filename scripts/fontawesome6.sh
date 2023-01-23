#!/bin/bash

echo "Please enter your FontAwesome6 npm token:"

read fa6_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" ${fa6_token}

echo "Creating temporary folder"

TEMP_DIR=`mktemp -d -t rnvi.XXXXXX`
echo "Created folder $TEMP_DIR"
pushd ${TEMP_DIR}

echo "Downloading FontAwesome6"

ARCHIVE=$(npm pack @fortawesome/fontawesome-free --silent)
tar -xzf ${ARCHIVE}
mv package free

ARCHIVE=$(npm pack @fortawesome/fontawesome-pro --silent)
tar -xzf ${ARCHIVE}
mv package pro

popd

echo "Creating glyphmaps"

node ./bin/generate-icon \
    ${TEMP_DIR}/free/css/all.css -g glyphmaps/FontAwesome6Free.json \
     --componentName FontAwesome6 --fontFamily fontawesome6 -p .fa- > /dev/null
node ./bin/generate-icon \
    ${TEMP_DIR}/pro/css/all.css -g glyphmaps/FontAwesome6Pro.json \
     --componentName FontAwesome6 --fontFamily fontawesome6 -p .fa- > /dev/null

echo "Generating font metadata"

node ./bin/generate-fontawesome6-metadata \
    --path ${TEMP_DIR}/free \
    --output glyphmaps/FontAwesome6Free_meta.json

node ./bin/generate-fontawesome6-metadata \
    --path ${TEMP_DIR}/pro \
    --output glyphmaps/FontAwesome6Pro_meta.json

echo "Copying font files"

cp ${TEMP_DIR}/free/webfonts/fa-brands-400.ttf Fonts/FontAwesome6_Brands.ttf
cp ${TEMP_DIR}/free/webfonts/fa-regular-400.ttf Fonts/FontAwesome6_Regular.ttf
cp ${TEMP_DIR}/free/webfonts/fa-solid-900.ttf Fonts/FontAwesome6_Solid.ttf

echo "Removing temporary files"

rm -r ${TEMP_DIR}

echo "Done"
