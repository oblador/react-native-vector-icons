#!/usr/bin/env bash

set -e

VERSION=$1
if [ -z $VERSION ]; then
  echo "Pass version as first argument"
  exit 1
fi

mkdir fa
cd fa

# So the npm commands work with workspaces
touch package.json

npm config set '@fortawesome:registry' https://npm.fontawesome.com/
if [ -z "$(npm config get | grep '//npm.fontawesome.com/:_authToken')" ]; then
  echo -n 'Please enter your FontAwesome npm token: '
  read fa_token
  npm config set '//npm.fontawesome.com/:_authToken' ${fa_token}
fi

ARCHIVE=$(npm pack @fortawesome/fontawesome-pro@^$VERSION --silent 2> /dev/null)
tar -xzf ${ARCHIVE}
mv package pro
