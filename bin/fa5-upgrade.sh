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

echo "Downloading FontAwesome5 Pro"

npm pack @fortawesome/fontawesome-pro
tar -xzf fortawesome-fontawesome-pro*
mv package pro

popd

echo "Copying font files"

mkdir -p assets/fonts

cp $TEMP_DIR/pro/webfonts/fa-brands-400.ttf assets/fonts/FontAwesome5_Pro_Brands.ttf
cp $TEMP_DIR/pro/webfonts/fa-light-300.ttf assets/fonts/FontAwesome5_Pro_Light.ttf
cp $TEMP_DIR/pro/webfonts/fa-regular-400.ttf assets/fonts/FontAwesome5_Pro_Regular.ttf
cp $TEMP_DIR/pro/webfonts/fa-solid-900.ttf assets/fonts/FontAwesome5_Pro_Solid.ttf

echo "Modifying package.json"

add-font-assets

echo "Linking project"

react-native link

echo "Done"
