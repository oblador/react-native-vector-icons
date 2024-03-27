#!/usr/bin/env bash

set -e

TAG=$1

if [ -z "$TAG" ]; then
  echo "Please provide a valid RN tag"
  exit 1
fi

case "$TAG" in
  latest)
    VERSION=0.73
    ;;
  *-stable)
    VERSION=${TAG//-stable/}
    ;;
  *)
    echo "Invalid RN tag: $TAG"
    exit 1
    ;;
esac

rm -rf android/app/build/ android/.gradle/
killall java 2>/dev/null || true

if [ "$TAG" = "latest" ]; then
  echo "No need to switch we are always set up for latest"
  exit 0
fi

echo "Switching to $VERSION"

yarn add "react-native@$TAG"

if [ "$VERSION" = "0.70" ]; then
  GRADLE_VERSION=7.5.1
fi

if [ "$VERSION" = "0.71" ]; then
  GRADLE_VERSION=7.5.1
fi

if [ "$VERSION" = "0.72" ]; then
  GRADLE_VERSION=8.0.1
fi

if [ -n "$GRADLE_VERSION" ]; then
  echo "Setting gradle version to $GRADLE_VERSION"
  sed -i "s/8.6/$GRADLE_VERSION/" android/gradle/wrapper/gradle-wrapper.properties
fi

yarn rnx-align-deps --write
