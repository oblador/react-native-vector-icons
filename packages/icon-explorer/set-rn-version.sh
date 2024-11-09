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

rm -rf android/app/build/ android/.gradle/
killall java 2>/dev/null || true

echo "Switching to $VERSION (arch: $ARCH)"

case $VERSION in
0.73)
  GRADLE_VERSION=8.3-bin
  ;;

0.74)
  GRADLE_VERSION=8.6-bin
  ;;

0.75)
  GRADLE_VERSION=8.8-bin
  ;;

0.77)
  GRADLE_VERSION=8.10.2-all
  ;;

*)
  echo "Unsupported version $VERSION"
  exit 1
  ;;
esac

echo "Setting gradle version to $GRADLE_VERSION"
sed -i.bak "s/gradle-.*.zip/gradle-$GRADLE_VERSION.zip/" android/gradle/wrapper/gradle-wrapper.properties
rm android/gradle/wrapper/gradle-wrapper.properties.bak

yarn rnx-align-deps --requirements react-native@"$VERSION" --write
RN_VERSION="^$(npm info react-native@^"$VERSION" version --json 2>/dev/null | jq -r '.[-1]')"
yarn add react-native@"$RN_VERSION"

## align-deps rolls this back, so force the latest
yarn add react-native-test-app@latest

## test-app doesn't bundle but we need it for react-native-owl
sed -i.bak \
  -e 's/task.enabled = false/task.enabled = true/;s/bundleInRelease      : false/bundleInRelease      : true/' \
  ../../node_modules/react-native-test-app/android/app/build.gradle
rm ../../node_modules/react-native-test-app/android/app/build.gradle.bak

yarn --no-immutable

mkdir -p node_modules
cd node_modules
ln -nfs ../../../node_modules/@johnf/react-native-owl react-native-owl
ln -nfs ../../../node_modules/react-native react-native
cd -

if [ "$ARCH" = "new" ]; then
  echo "newArchEnabled=true" >>android/gradle.properties
else
  echo "newArchEnabled=false" >>android/gradle.properties
fi
