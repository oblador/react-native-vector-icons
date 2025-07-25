#!/usr/bin/env bash

set -e

ARCH=$1
if [ -z "$ARCH" ]; then
  echo "Please provide a new or old arch"
  exit 1
fi

VERSION=$2
if [ -z "$VERSION" ]; then
  echo "Please provide a valid RN version"
  exit 1
fi

echo "Switching to $VERSION (arch: $ARCH)"

pnpm rnx-align-deps --requirements react-native@"$VERSION" --write

pnpm add --ignore-scripts react-native@"^$VERSION.0"

# align-deps rolls this back, so force the latest
pnpm add --ignore-scripts react-native-test-app@latest

pnpm install --frozen-lockfile --ignore-scripts --filter .

# We don't package them so remove them
rm -rf ../get-image/android/generated
rm -rf ../get-image/ios/generated

# Make react-native-owl work in monorepo
mkdir -p node_modules
cd node_modules
ln -nfs ../../../node_modules/@johnf/react-native-owl react-native-owl
ln -nfs ../../../node_modules/react-native react-native
cd -

if [ "$ARCH" = "new" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i.bak -e 's/fabric_enabled:.*/fabric_enabled: true/' ios/Podfile
  else
    echo "newArchEnabled=true" >>android/gradle.properties
  fi
else
  if [ "$(uname)" == "Darwin" ]; then
    sed -i.bak -e 's/fabric_enabled:.*/fabric_enabled: false/' ios/Podfile
  else
    echo "newArchEnabled=false" >>android/gradle.properties
  fi
fi

if [ "$(uname)" == "Darwin" ]; then
  pnpm run build:owl:ios
  pod update --project-directory=ios
else
  pnpm run build:owl:android
fi
