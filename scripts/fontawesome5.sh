#!/bin/sh

echo "Please enter your FontAwesome5 npm token:"

read fa5_token

echo "Setting up npm config"

npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" $fa5_token

echo "Installing FontAwesome5"

npm install @fortawesome/fontawesome-free --no-shrinkwrap
npm install @fortawesome/fontawesome-pro --no-shrinkwrap

echo "Creating glyphmaps"

mkdir -p temp

node ./bin/generate-icon \
    ./node_modules/@fortawesome/fontawesome-free/css/all.css -g temp/free_all.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa-
node ./bin/generate-icon \
    ./node_modules/@fortawesome/fontawesome-pro/css/all.css -g temp/pro_all.json \
     --componentName FontAwesome5 --fontFamily fontawesome5 -p .fa-

node ./bin/generate-fa5-glyphmap > glyphmaps/FontAwesome5.json

rm -r temp

echo "Copying font files"

cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf Fonts/FontAwesome5_Brands.ttf
cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf Fonts/FontAwesome5_Regular.ttf
cp ./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf Fonts/FontAwesome5_Solid.ttf

echo "Done"
