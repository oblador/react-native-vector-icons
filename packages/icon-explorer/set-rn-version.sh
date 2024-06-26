#!/usr/bin/env bash

set -e

PLATFORM=$1
if [ -z "$PLATFORM" ]; then
  echo "Please provide a valid platform: ios|android"
  exit 1
fi

VERSION=$2
if [ -z "$VERSION" ]; then
  echo "Please provide a valid RN version"
  exit 1
fi

LATEST=0.73
case "$VERSION" in
0.73)
  TAG=0.73
  ;;
0.*)
  TAG="${VERSION}-stable"
  ;;
*)
  echo "Invalid RN tag: $VERSION"
  exit 1
  ;;
esac

rm -rf android/app/build/ android/.gradle/
killall java 2>/dev/null || true

echo "Switching to $VERSION"

if [ "$VERSION" = "0.71" ]; then
  GRADLE_VERSION=7.5.1
fi

if [ "$VERSION" = "0.72" ]; then
  GRADLE_VERSION=8.0.1
fi

if [ "$PLATFORM" = "android" -a -n "$GRADLE_VERSION" ]; then
  echo "Setting gradle version to $GRADLE_VERSION"
  sed -i'' -e "s/8.7/$GRADLE_VERSION/" android/gradle/wrapper/gradle-wrapper.properties
fi

yarn rnx-align-deps --requirements react-native@$VERSION --write

yarn add react-native-test-app@latest

yarn --no-immutable
