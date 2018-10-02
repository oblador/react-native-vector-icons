#!/bin/sh

TEMP=$(mktemp -d -t rnvi)
pushd ${TEMP}
curl -o font.zip -L https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip
unzip -j -d font font.zip
popd

node bin/generate-icon ${TEMP}/font/iconfont.css\
   --prefix=.icon-\
   --componentName=AntDesign\
   --fontFamily=anticon\
   --template=templates/separated-icon-set.tpl\
   --glyphmap=glyphmaps/AntDesign.json\
   > AntDesign.js

mv ${TEMP}/font/iconfont.ttf Fonts/AntDesign.ttf

rm -r ${TEMP}

