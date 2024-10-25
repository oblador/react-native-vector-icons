#!/bin/bash

set -e

# This script borrows from the standard resource copy script https://gist.github.com/vonovak/d8f1a37804438f05bae22be1e8cd53c1
# We need two key bits of information
# Project Root - Where the package.json for the RN app lives
# Xcode Build Dir to copy the fonts into - We look for the directory that ends in .app

echo "(RNVI) START_COPY_FONTS"

echo "(RNVI) PWD: $(pwd)"

#############
# Find the fonts we need to copy
#############

# Assume the project root is always two directories above the POD_ROOT
echo "(RNVI) PODS_ROOT: $PODS_ROOT"
PROJECT_ROOT="${PODS_ROOT}/../.."
echo "(RNVI) PROJECT_ROOT: $PROJECT_ROOT"

# Items we need to copy for rsync
RESOURCES_TO_COPY="${PODS_ROOT}/resources-to-copy-${TARGETNAME}.txt"

"$NODE_BINARY" "${PODS_TARGET_SRCROOT}/lib/commonjs/scripts/getFonts.js" "$PROJECT_ROOT"/package.json >"$RESOURCES_TO_COPY"

#############
# Find the destination we copy to
#############

echo "(RNVI) PODS_CONFIGURATION_BUILD_DIR: $PODS_CONFIGURATION_BUILD_DIR"
XCODE_DIR=$(ls -d "$PODS_CONFIGURATION_BUILD_DIR"/*.app)
echo "(RNVI) XCODE_DIR: $XCODE_DIR"
DEST_DIR="${XCODE_DIR}"
echo "(RNVI) DEST_DIR: $DEST_DIR"
echo "(RNVI) INSTALL_DIR: $INSTALL_DIR"
mkdir -p "$DEST_DIR"

#############
# Copy the fonts
#############
echo "(RNVI) Copying the following files to $DEST_DIR"
sed 's/^/(RNVI) /' "$RESOURCES_TO_COPY"

# NOTE: Should we add --delete and remove old fonts automagically? NOt doing it yet as it feels risky
rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "$DEST_DIR"
# TODO: How do we test this is right?
if [[ "${ACTION}" == "install" ]] && [[ "${SKIP_INSTALL}" == "NO" ]]; then
  mkdir -p "${INSTALL_DIR}/react-native-vector-icons"
  rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${INSTALL_DIR}/react-native-vector-icons"
fi

rm -f "$RESOURCES_TO_COPY"

echo "(RNVI) END:RNVI_COPY_FONTS"
