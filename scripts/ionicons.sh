#!/bin/bash -e

mkdir -p Ioniconstmp
node node_modules/oslllo-svg-fixer/src/cli.js -s node_modules/ionicons/dist/svg -d Ioniconstmp
node bin/generate-ionicons.js
rm -rf Ioniconstmp
rm -rf Ionicons.svg
