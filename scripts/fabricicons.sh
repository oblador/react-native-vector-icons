#!/bin/bash -e

TEMP=$(mktemp -d -t rnvi)
pushd ${TEMP}
git clone https://github.com/smarppy/fabric-icons.git .
popd

node bin/generate-icon ${TEMP}/css/fabric-icons.css\
  --prefix=.ms-Icon--\
  --componentName=FabricIcons\
  --fontFamily='Fabric MDL2 Assets'\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/FabricIcons.json\
  > FabricIcons.js

mv ${TEMP}/fonts/fabric-icons.ttf Fonts/FabricIcons.ttf

rm -rf ${TEMP}
