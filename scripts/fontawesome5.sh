#!/bin/sh

echo "Please enter your FontAwesome5 npm token:"

read fa5_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" ${fa5_token}

echo "Creating temporary folder"

TEMP_DIR=`mktemp -d -t rnvi`
echo "Created folder $TEMP_DIR"
pushd ${TEMP_DIR}

echo "Downloading FontAwesome5"

ARCHIVE=$(npm pack @fortawesome/fontawesome-free --silent)
tar -xzf ${ARCHIVE}
mv package free

ARCHIVE=$(npm pack @fortawesome/fontawesome-pro --silent)
tar -xzf ${ARCHIVE}
mv package pro

popd

echo "Creating glyphmaps"

node ./bin/generate-icon \
    ${TEMP_DIR}/free/css/all.css -g glyphmaps/FontAwesome5Free.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa- > /dev/null
node ./bin/generate-icon \
    ${TEMP_DIR}/pro/css/all.css -g glyphmaps/FontAwesome5Pro.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa- > /dev/null

echo "Generating font metadata"

node ./bin/generate-fontawesome5-metadata \
    --path ${TEMP_DIR}/free \
    --output glyphmaps/FontAwesome5Free_meta.json

node ./bin/generate-fontawesome5-metadata \
    --path ${TEMP_DIR}/pro \
    --output glyphmaps/FontAwesome5Pro_meta.json

echo "Copying font files"

cp ${TEMP_DIR}/free/webfonts/fa-brands-400.ttf Fonts/FontAwesome5_Brands.ttf
cp ${TEMP_DIR}/free/webfonts/fa-regular-400.ttf Fonts/FontAwesome5_Regular.ttf
cp ${TEMP_DIR}/free/webfonts/fa-solid-900.ttf Fonts/FontAwesome5_Solid.ttf

echo "Removing temporary files"

rm -r ${TEMP_DIR}

echo "Done"
