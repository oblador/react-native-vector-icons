# TODO
* Check why `fallbackFamily` was introduced
* Explore better android font loading
* Subdir fonts on ios
* Remove
  * loadFont - search github then killas external
* Think about <Text selectable>
* FOntawesome5/6
  * Have a common package
  * Have stand and pro packages
  * Fix duplication in upgrade scripts for fontawesome
* loadfont - console.ogo for missing fonts
* Support fontello
* Support icomoon
* MIgration using js-codeshift
* Can we use react-native-config for assets
* Build script in common to make the fonts dumber
ios
* Can the common code load the fonts
Expo
* Has own font loading mechanism
* Need to see how this will work
* Can we ditch babel.config.json

# Notes for the migration doc we'll need to write
* Native typescript support
* Removed ancient react-vector-icons compatibility
* Major upgrade for antdesign
* materialcommunityicons now material-design-icons
* Things to undo
  * Remove any fonts from Info.plist
  * Remove font assets from react-native.config.js
  * Remove any frons from android and ios directories


