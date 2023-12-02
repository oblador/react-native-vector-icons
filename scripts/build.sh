#!/bin/bash

set -e

cd packages

for package in *; do
  if [ ! -f "$package/.yo-rc.json" ]; then
    continue
  fi

  cd $package
  rm -rf *
  yo react-native-vector-icons --force
  cd -
done
