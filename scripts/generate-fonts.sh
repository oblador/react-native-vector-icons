#!/bin/bash

set -e

cd packages

IGNORE_ERRORS=false
PACKAGE_ARGS=()

for arg in "$@"; do
  if [ "$arg" = "--ignore-errors" ]; then
    IGNORE_ERRORS=true
  else
    PACKAGE_ARGS+=("$arg")
  fi
done

if [ ${#PACKAGE_ARGS[@]} -gt 0 ]; then
  PACKAGES=("${PACKAGE_ARGS[@]}")
else
  PACKAGES=(./*)
fi

for package in "${PACKAGES[@]}"; do
  if [ ! -f "$package/.yo-rc.json" ]; then
    continue
  fi

  echo
  echo "######################"
  echo "Building $package"
  echo "######################"
  echo

  cd "$package"

  if [ -n "$DIFF" ]; then
    mkdir -p "diffenator/$package"
    mkdir -p "/tmp/$package/before"
    cp fonts/*.ttf "/tmp/$package/before"
  fi

  CURRENT_VERSION=$([ -f package.json ] && jq -r '.version' package.json || echo "0.0.1")

  # Remove everything except node_modules and dotfiles (.yo-rc.json etc)
  find . -maxdepth 1 ! -name '.' ! -name 'node_modules' ! -name '.*' -exec rm -rf {} +
  git restore CHANGELOG.md &>/dev/null || true

  if [ "$(jq -r '."generator-react-native-vector-icons".customReadme' .yo-rc.json)" == "true" ]; then
    git restore README.md >/dev/null || true
  fi

  if [ "$(jq -r '."generator-react-native-vector-icons".customSrc' .yo-rc.json)" == "true" ]; then
    git restore src >/dev/null || true
  fi

  if ! yo react-native-vector-icons --force --skip-install --current-version="$CURRENT_VERSION"; then
    echo
    echo "❌ Generator failed for $package"
    echo "Hint: re-run with: pnpm run generate -- --ignore-errors"
    echo
    if [ "$IGNORE_ERRORS" = true ]; then
      echo "⚠️  Continuing because --ignore-errors was provided."
      echo
      cd -
      continue
    fi

    cd -
    exit 1
  fi

  if [ -n "$DIFF" ]; then
    mkdir -p "/tmp/$package/after"
    cp fonts/*.ttf "/tmp/$package/after"
    for font in "/tmp/$package/before/"*.ttf; do
      fontname=$(basename "$font")
      mkdir -p "diffenator/$package/$fontname"
      diffenator3 --no-tables --no-kerns --no-words --html --output "../../diffenator/$package/$fontname" "/tmp/$package/before/$fontname" "/tmp/$package/after/$fontname"
      open "../../diffenator/$package/$fontname/diffenator.html"
    done
  fi

  cd -
done

cd -
pnpm install
