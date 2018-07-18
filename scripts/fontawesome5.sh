#!/bin/sh

echo "Please enter your FontAwesome5 npm token:"

read fa5_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" $fa5_token

echo "Creating temporary folder"

TEMP_DIR=`mktemp -d -t rnvi`
echo "Created folder $TEMP_DIR"
pushd $TEMP_DIR

echo "Downloading FontAwesome5"

npm pack @fortawesome/fontawesome-free
tar -xzf fortawesome-fontawesome-free*
mv package free

npm pack @fortawesome/fontawesome-pro
tar -xzf fortawesome-fontawesome-pro*
mv package pro

popd

echo "Creating glyphmaps"

node ./bin/generate-icon \
    $TEMP_DIR/free/css/all.css -g glyphmaps/FontAwesome5Free.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa-
node ./bin/generate-icon \
    $TEMP_DIR/pro/css/all.css -g glyphmaps/FontAwesome5Pro.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa-

echo "Copying font files"

cp $TEMP_DIR/free/webfonts/fa-brands-400.ttf Fonts/FontAwesome5_Brands.ttf
cp $TEMP_DIR/free/webfonts/fa-regular-400.ttf Fonts/FontAwesome5_Regular.ttf
cp $TEMP_DIR/free/webfonts/fa-solid-900.ttf Fonts/FontAwesome5_Solid.ttf

echo "Removing temporary files"

rm -r $TEMP_DIR

echo "Done"
