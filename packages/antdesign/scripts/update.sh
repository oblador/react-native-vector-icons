#!/bin/env bash

set -e

TEMP=$(mktemp -q -d -t rnvi.XXX)

pushd ${TEMP}
curl -s -o font.zip -L https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip
unzip -q -j -d font font.zip
popd

node bin/generate-icon ${TEMP}/font/iconfont.css\
   --prefix=.icon-\
   --componentName=AntDesign\
   --fontFamily=anticon\
   --template=templates/separated-icon-set.tpl\
   --glyphmap=glyphmaps/AntDesign.json\
   > AntDesign.js

mv ${TEMP}/font/iconfont.ttf Fonts/AntDesign.ttf
