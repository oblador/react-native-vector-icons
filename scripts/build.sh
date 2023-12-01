#!/bin/bash

set -e

# rm -rf {Fonts,AntDesign.js,Entypo.js,EvilIcons.js,FontAwesome.js,Fontisto.js,Foundation.js,Ionicons.js,MaterialIcons.js,MaterialCommunityIcons.js,Octicons.js,Zocial.js,SimpleLineIcons.js,glyphmaps}
# mkdir Fonts glyphmaps
# ./scripts/antdesign.sh
# ./scripts/entypo.sh
# ./scripts/evilicons.sh
# ./scripts/fontawesome.sh
# ./scripts/fontawesome5.sh
# ./scripts/fontisto.sh
# ./scripts/foundation.sh
# ./scripts/ionicons.sh
# ./scripts/materialicons.sh
# ./scripts/materialcommunityicons.sh
# ./scripts/octicons.sh
# ./scripts/zocial.sh
# ./scripts/simplelineicons.sh

yo react-native-vector-icons ant-design --force
yo react-native-vector-icons entypo --force
yo react-native-vector-icons evil-icons --force
yo react-native-vector-icons feather --force
yo react-native-vector-icons fontawesome --force --name "Font Awesome" --className FontAwesome --fontName FontAwesome
yo react-native-vector-icons fontawesome5 --force --name "Font Awesome 5" --className FontAwesome5 --fontName FontAwesome5
yo react-native-vector-icons fontawesome6 --force --name "Font Awesome 6" --className FontAwesome6 --fontName FontAwesome6
yo react-native-vector-icons fontisto --force
yo react-native-vector-icons foundation --force --fontName "fontcustom"
yo react-native-vector-icons ionicons --force
yo react-native-vector-icons material-symbols --force
yo react-native-vector-icons material-design-icons --force --fontName "Material Design Icons"
yo react-native-vector-icons octicons --force
yo react-native-vector-icons simple-line-icons --force --className SimpleLineIcons --fontName simple-line-icons
yo react-native-vector-icons zocial --force --fontname zocial
