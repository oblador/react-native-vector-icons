#!/bin/bash

set -e

cd packages

for package in *; do
  if [ ! -f "$package/.yo-rc.json" ]; then
    continue
  fi

  echo
  echo "######################"
  echo "Building $package"
  echo "######################"
  echo

  cd $package

  rm -rf *

  if [ "$(jq -r '."generator-react-native-vector-icons".customReadme' .yo-rc.json)" == "true" ]; then
    git restore README.md > /dev/null || true
  fi

  if [ "$(jq -r '."generator-react-native-vector-icons".customSrc' .yo-rc.json)" == "true" ]; then
    git restore src > /dev/null || true
  fi

  yo react-native-vector-icons --force

  cd -
done

cd -
yarn
