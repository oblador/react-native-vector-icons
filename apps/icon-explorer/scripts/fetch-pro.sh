#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PACKAGES_DIR="$(cd "$APP_DIR/../../packages" && pwd)"

cd "$APP_DIR"

cleanup() {
  rm -rf "$APP_DIR/package" "$APP_DIR/fontawesome-pro.tar.gz"
}
trap cleanup EXIT

PRO_URL=$(pnpm view @fortawesome/fontawesome-pro dist.tarball)

curl \
  -L \
  --fail \
  --output "fontawesome-pro.tar.gz" \
  -H "Authorization: Bearer $FONTAWESOME_PACKAGE_TOKEN" \
  --silent \
  "$PRO_URL"

# Extract woff2 font files from the tarball
tar -xzf fontawesome-pro.tar.gz --wildcards 'package/webfonts/*.woff2'

# Build a set of expected font filenames from package configs
declare -A EXPECTED_FONTS
for config in "$PACKAGES_DIR"/fontawesome-pro-*/.yo-rc.json; do
  read -r FONT_FILE PKG_NAME < <(jq -r '.["generator-react-native-vector-icons"] | "\(.fontFileName) \(.packageName)"' "$config")
  [[ "$FONT_FILE" == "null" || "$PKG_NAME" == "null" ]] && continue
  EXPECTED_FONTS["$FONT_FILE"]="$PKG_NAME"
done

# Build a set of available font filenames from the tarball
declare -A AVAILABLE_FONTS
for woff2 in package/webfonts/*.woff2; do
  BASENAME="$(basename "$woff2" .woff2)"
  AVAILABLE_FONTS["$BASENAME"]=1
done

# Check for missing fonts (expected by a package but not in the tarball)
for FONT_FILE in "${!EXPECTED_FONTS[@]}"; do
  if [[ -z "${AVAILABLE_FONTS[$FONT_FILE]}" ]]; then
    echo "WARNING: Missing font in tarball: ${FONT_FILE}.woff2 (needed by ${EXPECTED_FONTS[$FONT_FILE]})" >&2
  fi
done

# Check for extra fonts (in the tarball but no matching package)
declare -A KNOWN_EXTRAS=(["fa-v4compatibility"]=1)
for FONT_FILE in "${!AVAILABLE_FONTS[@]}"; do
  if [[ -z "${EXPECTED_FONTS[$FONT_FILE]}" ]] && [[ -z "${KNOWN_EXTRAS[$FONT_FILE]}" ]]; then
    echo "WARNING: Extra font in tarball with no matching package: ${FONT_FILE}.woff2" >&2
  fi
done

# Extract and convert matched fonts
for FONT_FILE in "${!EXPECTED_FONTS[@]}"; do
  PKG_NAME="${EXPECTED_FONTS[$FONT_FILE]}"

  WOFF2_FILE="package/webfonts/${FONT_FILE}.woff2"
  [ -f "$WOFF2_FILE" ] || continue

  mkdir -p "rnvi-fonts/${PKG_NAME}"
  woff2_decompress "$WOFF2_FILE"
  mv "package/webfonts/${FONT_FILE}.ttf" "rnvi-fonts/${PKG_NAME}/"
done
