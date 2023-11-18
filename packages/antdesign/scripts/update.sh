#!/bin/env bash

set -e

TEMP=$(mktemp -q -d -t rnvi.XXX)

pushd ${TEMP}
# curl -s -o font.zip -L https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip
curl -s -o font.zip -L file:///home/johnf/Downloads/iconfont-3.x.zip
unzip -q -j -d font font.zip
popd

generate-icon ${TEMP}/font/iconfont.css\
   --prefix=.icon-\
   --componentName=AntDesign\
   --fontFamily=anticon\
   --template=../common/templates/separated-icon-set.tpl\
   --glyphmap=glyphmaps/AntDesign.json\
   > index.tsx

mv ${TEMP}/font/iconfont.ttf fonts/AntDesign.ttf
