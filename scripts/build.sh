#!/bin/bash

set -e

cd packages

for package in *; do
  if [ ! -f "$package/.yo-rc.json" ]; then
    continue
  fi

  cd $package

  rm -rf *

  # For font awesome feels a bit hack
  if [ -f .rnvi-git-restore ]; then
    git restore bin src scripts README.md
  fi

  yo react-native-vector-icons --force

  cd -
done
