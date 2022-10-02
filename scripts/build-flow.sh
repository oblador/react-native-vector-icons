#!/bin/bash -e

rm -rf AntDesign.js.flow Entypo.js.flow EvilIcons.js.flow Feather.js.flow \
    FontAwesome.js.flow \
    Foundation.js.flow Ionicons.js.flow MaterialCommunityIcons.js.flow \
    MaterialIcons.js.flow Octicons.js.flow SimpleLineIcons.js.flow \
    Zocial.js.flow

node bin/generate-flow AntDesign Entypo EvilIcons Feather FontAwesome \
    Fontisto Foundation Ionicons \
    MaterialCommunityIcons MaterialIcons Octicons SimpleLineIcons Zocial

cp *.js.flow dist/
