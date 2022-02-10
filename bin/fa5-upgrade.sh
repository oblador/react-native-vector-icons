#!/bin/sh

TEMP_DIR_PATH=""
FONTAWESOME_PRO_DIR_NAME=""
DEST_DIR_PATH=${1:-"assets/fonts"}
PROJECT_NAME="react-native-vector-icons"
FONT_NAME="Font Awesome Pro"

setup_npm_config()
{
  # always returns successfull zero code
  if [ "$(npm config get @fortawesome:registry)" = "undefined" ]; then
    npm config set "@fortawesome:registry" https://npm.fontawesome.com/
  fi

  local npm_token=""
  echo "Please enter your $FONT_NAME npm token:";
  read npm_token
  npm config set "//npm.fontawesome.com/:_authToken" "${npm_token}"
}

create_tmp_directory()
{
  local tmp_dir="$(mktemp -d -t 'rnvi.XXXXXX')"
  retval=$?
  if [ "$retval" != 0 ]; then
     echo "[FAIL] Can't create temporary directory";
     return 1;
  fi

  if [ -z "$tmp_dir" ]; then
    echo "[FAIL] Generated temporary directory name is empty";
    return 1;
  fi

  TEMP_DIR_PATH="$tmp_dir"
}

download_and_unpack_fontawesome_pro()
{
  local archive_file_name="$(npm pack @fortawesome/fontawesome-pro --silent)"
  retval=$?
  if [ "$retval" != 0 ]; then
     echo "[FAIL] Can't download [$archive_file_name] archive";
     return 1;
  fi

  tar -xzf "$archive_file_name"
  retval=$?
  if [ "$retval" != 0 ]; then
     echo "[FAIL] Can't unpack [$archive_file_name] archive";
     return 1;
  fi

  local font_dir_name="package"
  if [ ! -d "$font_dir_name" ]; then
    echo "[FAIL] Archive doesn't contain [$font_dir_name] required directory";
    return 1;
  fi

  FONTAWESOME_PRO_DIR_NAME="$font_dir_name"
}

copy_ttf_fonts_to_dest_dir()
{
  mkdir -p "$DEST_DIR_PATH"
  retval=$?
  if [ "$retval" != 0 ]; then
     echo "[FAIL] Can't create [$DEST_DIR_PATH] directory";
     return 1;
  fi

  local font_dir_path="$TEMP_DIR_PATH/$FONTAWESOME_PRO_DIR_NAME/webfonts"

  cp "$font_dir_path/fa-brands-400.ttf" "$DEST_DIR_PATH/FontAwesome5_Pro_Brands.ttf" &&
  cp "$font_dir_path/fa-light-300.ttf" "$DEST_DIR_PATH/FontAwesome5_Pro_Light.ttf" &&
  cp "$font_dir_path/fa-regular-400.ttf" "$DEST_DIR_PATH/FontAwesome5_Pro_Regular.ttf" &&
  cp "$font_dir_path/fa-solid-900.ttf" "$DEST_DIR_PATH/FontAwesome5_Pro_Solid.ttf"

  retval=$?
  if [ "$retval" != 0 ]; then
     echo "[FAIL] Can't copy ttf fonts to [$DEST_DIR_PATH] directory";
     return 1;
  fi
}

create_rn_config()
{
  if [ -f "./react-native.config.js" ]; then
    echo "You already have a react-native-config.js file, make sure you have the new fonts added to the dependencies!";
    return 1;
  else
    echo "module.exports = { assets: [ '${DEST_DIR_PATH}' ] };" > react-native.config.js;
  fi
}

react_native_link_project()
{
  react-native link
}

if setup_npm_config; then
  echo "[SUCCESS] Set up npm config";
else
  exit 1;
fi

if create_tmp_directory; then
  echo "[SUCCESS] Temporary directory [$TEMP_DIR_PATH] was created";
else
  exit 1;
fi

cd "$TEMP_DIR_PATH"
if download_and_unpack_fontawesome_pro; then
  echo "[SUCCESS] $FONT_NAME was unpacked to [$TEMP_DIR_PATH/$FONTAWESOME_PRO_DIR_NAME] directory";
else
  exit 1;
fi
cd - > /dev/null

if copy_ttf_fonts_to_dest_dir; then
  echo "[SUCCESS] Copied $FONT_NAME to [$DEST_DIR_PATH] directory";
else
  exit 1;
fi

if create_rn_config; then
  echo "[SUCCESS] Created react-native.config.js";
else
  echo "[INFO] Didn't create react-native.config.js, it already exists. Make sure '${DEST_DIR_PATH}' is part of the 'assets' array!";
fi

if react_native_link_project; then
  echo "[SUCCESS] Linked $PROJECT_NAME to React Native";
else
  exit 1;
fi

echo "[SUCCESS] $FONT_NAME was successfully upgraded"
echo "Note: [$TEMP_DIR_PATH] was created. Delete it manually or it will be deleted automatically on next reboot"
