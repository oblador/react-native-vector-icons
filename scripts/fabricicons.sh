#!/bin/bash -e

DIR=fabric-icons
TMP_DIR=${TEMP}/fabric-icons

rm -rf ${TMP_DIR}

pushd ${TEMP}
git clone https://github.com/smarppy/fabric-icons.git ${DIR}
popd

node bin/generate-icon ${TMP_DIR}/css/fabric-icons.css\
  --prefix=.ms-Icon--\
  --componentName=FabricIcons\
  --fontFamily=FabricMDL2Icons\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/FabricIcons.json\
  > FabricIcons.js

mv ${TMP_DIR}/fonts/fabric-icons.ttf Fonts/FabricIcons.ttf

rm -rf ${TMP_DIR}
