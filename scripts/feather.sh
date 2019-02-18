#!/bin/bash -e

# Feather temporary assets output directory
FEATHER_DIR="Feather"
FEATHER_JS="Feather.js"

check_font_custom() {
  FONT_CUSTOM=`which fontcustom`
  if [[ ! -x "${FONT_CUSTOM}" ]]; then return 1; fi
}

check_nodejs() {
  NODE=`which node`
  if [[ ! -x "${NODE}" ]]; then return 1; fi
}

print() {
  echo -ne "\e[0m${1}"
}

success() {
  echo -e "\e[32m${1}"
}

fail() {
  echo -e "\e[31m${1}"
}

run_generation() {
  yarn

  print "Cleaning older installations..."
  rm -rf ${FEATHER_DIR} || true
  if [ -d "${FEATHER_DIR}" ]; then show_error "Can't remove Feather temp directory."; fi
  success "OK"

  print "Generating assets based on Feather specified in package.json..."
  ${FONT_CUSTOM} compile node_modules/feather-icons/dist/icons\
    --font-name=Feather\
    --output=${FEATHER_DIR}\
    --quiet\
    --force\
    --no-hash
  if [ ! -f "${FEATHER_DIR}/Feather.css" ]; then show_error "Can't generate assets."; fi
  success "OK"

  print "Generating JS file mapping..."
  ${NODE} bin/generate-icon ${FEATHER_DIR}/Feather.css\
    --prefix=.icon-\
    --componentName=Feather\
    --fontFamily=Feather\
    --template=templates/separated-icon-set.tpl\
    --glyphmap=glyphmaps/Feather.json > Feather.js
  if [ ! -s "${FEATHER_JS}" ]; then show_error "Feather.js not generated or zero sized."; fi
  success "OK"

  print "Moving TTF font to right path..."
  mv "${FEATHER_DIR}/Feather.ttf" "Fonts/Feather.ttf" && rm -rf ${FEATHER_DIR}
  if [ -d "${FEATHER_DIR}" ]; then show_error "Can't remove Feather temp directory."; fi
  success "OK"
}

show_help() {
  echo "$1 not found in your PATH."
  echo "To generate this font, its necessary to use a helper utility named FontCustom with NodeJS."
  echo "Go to https://github.com/oblador/react-native-vector-icons/blob/master/BUILDING_FEATHER.md and follow the instructions."
  exit 1
}

show_error() {
  fail "Oh no, something goes wrong."
  if [ ! -z "$1" ]; then fail "${1}"; fi
  fail "Check your installation and try again."
  exit 1
}

check_nodejs || show_help "NodeJS"
check_font_custom || show_help "FontCustom"

set +e
run_generation
set -e

success "If you see this message, everything is OK."
