#!/bin/bash -e

rm -rf {Fonts,AntDesign.js,Entypo.js,EvilIcons.js,FontAwesome.js,Fontisto.js,Foundation.js,Ionicons.js,MaterialIcons.js,MaterialCommunityIcons.js,Octicons.js,Zocial.js,SimpleLineIcons.js,glyphmaps}
mkdir Fonts glyphmaps
./scripts/antdesign.sh
./scripts/entypo.sh
./scripts/evilicons.sh
./scripts/fontawesome.sh
./scripts/fontawesome5.sh
./scripts/fontisto.sh
./scripts/foundation.sh
./scripts/ionicons.sh
./scripts/materialicons.sh
./scripts/materialcommunityicons.sh
./scripts/octicons.sh
./scripts/zocial.sh
./scripts/simplelineicons.sh
