#!/usr/bin/env bash

set -e

VERSION=$1
if [ -z "$VERSION" ]; then
  echo "Please provide a valid RN version"
  exit 1
fi

TAG="${VERSION}-stable"

rm -rf android/app/build/ android/.gradle/
killall java 2>/dev/null || true

echo "Switching to $VERSION"

case $VERSION in
0.71)
  GRADLE_VERSION=7.5.1
  ;;

0.72)
  GRADLE_VERSION=8.0.1
  ;;

0.73)
  GRADLE_VERSION=8.3
  ;;

0.74)
  GRADLE_VERSION=8.6
  ;;

0.75)
  GRADLE_VERSION=8.8
  ;;

*)
  echo "Unsupported version $VERSION"
  exit 1
  ;;
esac

echo "Setting gradle version to $GRADLE_VERSION"
sed -i'' -e "s/gradle-[0-9.]*-bin.zip/gradle-$GRADLE_VERSION-bin.zip/" android/gradle/wrapper/gradle-wrapper.properties

yarn rnx-align-deps --requirements react-native@$VERSION --write

yarn add react-native-test-app@latest

yarn --no-immutable
