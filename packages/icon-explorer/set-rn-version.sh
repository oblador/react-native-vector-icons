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
sed -i.bak "s/gradle-[0-9.]*-bin.zip/gradle-$GRADLE_VERSION-bin.zip/" android/gradle/wrapper/gradle-wrapper.properties
rm android/gradle/wrapper/gradle-wrapper.properties.bak

yarn rnx-align-deps --requirements react-native@"$VERSION" --write
LATEST_VERSION="^$(npm info react-native@^0.75 version --json 2>/dev/null | jq -r '.[-1]')"
yarn add react-native@"$LATEST_VERSION" @react-native/babel-preset@"$LATEST_VERSION" @react-native/metro-config@"$LATEST_VERSION"

## align-deps rolls this back, so force the latest
yarn add react-native-test-app@latest

## test-app doesn't bundle but we need it for react-native-owl
sed -i.bak \
  -e 's/task.enabled = false/task.enabled = true/;s/bundleInRelease      : false/bundleInRelease      : true/' \
  ../../node_modules/react-native-test-app/android/app/build.gradle
rm ../../node_modules/react-native-test-app/android/app/build.gradle.bak

yarn --no-immutable

if [ "$ARCH" = "new" ]; then
  echo "newArchEnabled=true" >>android/gradle.properties
fi

if command -v pod &>/dev/null; then
  if [ "$ARCH" = "new" ]; then
    NO_FLIPPER=1 RCT_NEW_ARCH_ENABLED=1 pod install --project-directory=ios
  else
    NO_FLIPPER=1 RCT_NEW_ARCH_ENABLED=0 pod install --project-directory=ios
  fi
fi
