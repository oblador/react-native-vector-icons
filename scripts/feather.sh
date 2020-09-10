#!/bin/bash -e

# Feather temporary assets output directory
FEATHER_DIR="Feather"
FEATHER_JS="Feather.js"

check_nodejs() {
  NODE=`which node`
  if [[ ! -x "${NODE}" ]]; then return 1; fi
}

check_docker() {
  DOCKER=`which docker`
  if [[ ! -x "${DOCKER}" ]]; then return 1; fi
}

print() {
  printf "\e[0m${1}"
}

success() {
  printf "\e[32m${1}\n"
}

fail() {
  printf "\e[31m${1}\n"
}

run_generation() {
  yarn

  print "Cleaning older installations..."
  rm -rf ${FEATHER_DIR} || true
  if [ -d "${FEATHER_DIR}" ]; then show_error "Can't remove Feather temp directory."; fi
  success "OK"

  print "Using docker rfbezerra/svg-to-ttf to generate font..."
  ${DOCKER} run --rm -v "${PWD}:/fonts" rfbezerra/svg-to-ttf -n Feather -u $(id -u) -o "${FEATHER_DIR}" \
    -i "node_modules/feather-icons/dist/icons"
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
  print "$1 not found in your PATH.\n"
  print "To generate this font, its necessary to use a helper utility named FontCustom with NodeJS.\n"
  print "Go to https://github.com/oblador/react-native-vector-icons/blob/master/BUILDING_FEATHER.md and follow the instructions.\n"
  exit 1
}

show_error() {
  fail "Oh no, something goes wrong."
  if [ ! -z "$1" ]; then fail "${1}"; fi
  fail "Check your installation and try again."
  exit 1
}

check_docker || show_help "Docker"
check_nodejs || show_help "NodeJS"

set +e
run_generation
set -e

success "If you see this message, everything is OK."
