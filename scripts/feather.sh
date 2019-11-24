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

check_parallel() {
  PARALLEL=`which parallel`
  if [[ ! -x "${PARALLEL}" ]]; then return 1; fi
}

check_inkscape() {
  INKSCAPE=`which inkscape`
  if [[ ! -x "${INKSCAPE}" ]]; then return 1; fi
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

  if [[ -z "${XVFB}" ]]; then
    print "Xvfb not informed, trying to find\n"
    OSNAME=`uname -s`
    if [[ ${OSNAME} == 'Linux' ]]; then XVFB=`which Xvfb`;
    elif [[ ${OSNAME} == 'Darwin' ]]; then XVFB='/usr/X11/bin/Xvfb';
    fi
  fi

  TEMP_DIR=`mktemp -d`
  print "Using ${TEMP_DIR} as temporary directory\n"
  cp node_modules/feather-icons/dist/icons/* "$TEMP_DIR"
  CMD="${PARALLEL} --bar ${INKSCAPE} -f {} --verb=EditSelectAll --verb=StrokeToPath --verb=FileSave --verb=FileQuit ::: ${TEMP_DIR}/*.svg"

  if [[ -x "${XVFB}" ]]; then
    print "Using Xvfb located in ${XVFB}\n"
    # this part is borrow from xfvb-run from linux
    SERVERNUM=2019
    AUTHFILE=$(mktemp -p "$TEMP_DIR" Xauthority.XXXXXX)
    XVFBARGS="-screen 0 640x480x24"
    LISTENTCP="-nolisten tcp"
    XAUTHORITY=$AUTHFILE ${XVFB} ":$SERVERNUM" $XVFBARGS $LISTENTCP >> /dev/null 2>&1 &
    XVFBPID=$! && DISPLAY=":$SERVERNUM" ${CMD} && kill ${XVFBPID}
  else
    print "Xvfb not located\n"
    ${CMD}
  fi

  print "Cleaning older installations..."
  rm -rf ${FEATHER_DIR} || true
  if [ -d "${FEATHER_DIR}" ]; then show_error "Can't remove Feather temp directory."; fi
  success "OK"

  print "Generating assets based on Feather specified in package.json..."
  ${FONT_CUSTOM} compile ${TEMP_DIR}\
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
  mv "${FEATHER_DIR}/Feather.ttf" "Fonts/Feather.ttf" && rm -rf ${TEMP_DIR} && rm -rf ${FEATHER_DIR}
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

check_nodejs || show_help "NodeJS"
check_font_custom || show_help "FontCustom"
check_inkscape || show_help "Inkscape"
check_parallel || show_help "GNU Parallel"

set +e
run_generation
set -e

success "If you see this message, everything is OK."