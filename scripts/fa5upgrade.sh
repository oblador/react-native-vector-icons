#!/bin/sh

echo "Please enter your FontAwesome5 npm token:"

read fa5_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" $fa5_token

echo "Installing FontAwesome5 Pro"

npm install @fortawesome/fontawesome-pro --no-shrinkwrap

echo "Unlinking project"

react-native unlink react-native-vector-icons

echo "Copying font files"

cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf Fonts/FontAwesome5_Brands.ttf
cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf Fonts/FontAwesome5_Regular.ttf
cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf Fonts/FontAwesome5_Solid.ttf

echo "Linking project"

react-native link react-native-vector-icons

echo "Done"
