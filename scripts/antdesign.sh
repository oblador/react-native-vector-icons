#!/bin/bash -e

node bin/generate-icon node_modules/@bodhiveggie/antd-icons/fonts/iconfont.css\
  --prefix=.icon-\
  --componentName=AntDesign\
  --fontFamily=AntDesign\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/AntDesign.json\
  > AntDesign.js
cp node_modules/@bodhiveggie/antd-icons/fonts/iconfont.ttf Fonts/AntDesign.ttf
