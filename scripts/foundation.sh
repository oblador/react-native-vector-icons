#!/bin/bash -e

TEMP=$(mktemp -d -t rnvi.XXXXXX)
pushd ${TEMP}
curl -o font.zip -L https://zurb.com/playground/uploads/upload/upload/288/foundation-icons.zip
unzip -j -d font font.zip
popd

node bin/generate-icon ${TEMP}/font/foundation-icons.css \
  --prefix=.fi-\
  --componentName=Foundation\
  --fontFamily=fontcustom\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Foundation.json\
  > Foundation.js

cp ${TEMP}/font/foundation-icons.ttf Fonts/Foundation.ttf