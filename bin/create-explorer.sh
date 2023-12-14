#!/usr/bin/env bash

set -e

VERSION=$1
if [ -z "$VERSION" ]
then
  echo "Pass the RN version you want as the first argument"
  exit 1
fi

ARCH=$2
if [ -z "$ARCH" ]
then
  echo "Pass the architecture you want as the second argument: old or new"
  exit 1
fi

TEAM=$3
if [ -z "$TEAM" ]
then
  echo "Pass the apple account team"
  exit 1
fi

# Temp || true for https://github.com/facebook/react-native/issues/39832
npx react-native@latest init --version $VERSION IconExplorer --directory Examples/IconExplorer-$VERSION-$ARCH || true

cd Examples/IconExplorer-$VERSION-$ARCH

RCT_NEW_ARCH_ENABLED=0
if [ "$ARCH" == "new" ]; then
  sed -i '' 's/newArchEnabled=false/newArchEnabled=true/' android/gradle.properties
  RCT_NEW_ARCH_ENABLED=1
fi
export RCT_NEW_ARCH_ENABLED

# Temp for https://github.com/facebook/react-native/issues/39832
echo "gem 'activesupport', '>= 6.1.7.3', '< 7.1.0'" >> Gemfile

# Remove unneeded files
rm -f App.ts*

# Copy the source
cp -r ../IconExplorer/{src,index.osx.js,index.windows.js,osx,windows} .

# Update base files
sed "s#import App from './App';#import App from './src/App';#" index.js > index.js.tmp && mv index.js.tmp index.js

sed '$i\
\
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"\
\
' android/app/build.gradle > android/app/build.gradle.tmp && mv android/app/build.gradle.tmp android/app/build.gradle

PLIST="
  <key>UIAppFonts</key>
  <array>
    <string>AntDesign.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>FontAwesome5_Brands.ttf</string>
    <string>FontAwesome5_Regular.ttf</string>
    <string>FontAwesome5_Solid.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Zocial.ttf</string>
    <string>Fontisto.ttf</string>
  </array>
"
echo "$PLIST" | tail -r > /tmp/plist.info

tail -r ios/IconExplorer/Info.plist | sed -e "2r /tmp/plist.info" | tail -r > ios/IconExplorer/Info.plist.tmp && mv ios/IconExplorer/Info.plist.tmp ios/IconExplorer/Info.plist
rm /tmp/plist.info

cat package.json  | jq '.dependencies["react-native-vector-icons"] = "file:../../"' > package.json.tmp && mv package.json.tmp package.json
cat package.json  | jq '.scripts.postinstall = "DESTINATION=node_modules/react-native-vector-icons LIB_FILE=`cd ../.. && echo \\`pwd\\`/\\`npm pack\\`` && (rm -rf $DESTINATION || true) && mkdir $DESTINATION && tar -xvzf $LIB_FILE -C $DESTINATION --strip-components 1 && rm $LIB_FILE"' > package.json.tmp && mv package.json.tmp package.json

yarn add \
  @react-navigation/native \
  @react-navigation/native-stack \
  ramda \
  react-native-animatable \
  react-native-safe-area-context \
  react-native-screens
bundle update

cd ios
pod update
sed -e "/CURRENT_PROJECT_VERSION/i\\
      DEVELOPMENT_TEAM = ${TEAM};\
" IconExplorer.xcodeproj/project.pbxproj > pbx && mv pbx IconExplorer.xcodeproj/project.pbxproj
