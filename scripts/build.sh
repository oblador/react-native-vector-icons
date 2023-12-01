#!/bin/bash

set -e

# rm -rf {Fonts,AntDesign.js,Entypo.js,EvilIcons.js,FontAwesome.js,Fontisto.js,Foundation.js,Ionicons.js,MaterialIcons.js,MaterialCommunityIcons.js,Octicons.js,Zocial.js,SimpleLineIcons.js,glyphmaps}
# mkdir Fonts glyphmaps

cd packages
for package in *; do
  if [ ! -f "$package/.yo-rc.json" ]; then
    continue
  fi

  cd $package
  yo react-native-vector-icons
  cd -
done
