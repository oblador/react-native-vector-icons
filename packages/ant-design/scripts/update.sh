#!/bin/bash

set -e

TEMP_DIR=$(mktemp -q -d -t rnvi.XXX)

pushd ${TEMP_DIR}
curl -s -o font.zip -L https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip
unzip -q -j -d font font.zip
popd

generate-icon ${TEMP_DIR}/font/iconfont.css \
  --prefix .icon- \
  --componentName AntDesign \
  --fontFamily anticon \
  --template ../common/templates/separated-icon-set.tpl \
  --glyphmap glyphmaps/AntDesign.json \
  > src/index.tsx

mv ${TEMP_DIR}/font/iconfont.ttf fonts/AntDesign.ttf

rm -rf $TEMP_DIR
