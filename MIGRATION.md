# Approach
* Auto call load font on ios so no changes are needed to Info.plist
* Use gradle to auto copy files on android
* For fontawesome I've switch to using an iconType as typing was much simpler (instead of a solid prop)

# Questions
* I have removed the following - what should I put back?
  * Flow types - Suspect no one cares
  * react-vector-icons compatibility - it's ancient now
  * Icon.Button - DOes anyone really use this?
  * fallbackFamily - Is it worth the complexity? Is it better to show no icon than a wrong icon? Maybe with a console warning?
* Support policy - same as react-native - current - 2 (start with 0.73)
* cofnig preference for tooling like eslint - package.json or standalong config files?
* Use loadfont on ios so plist.info doesn't have to be changed
* Should we also use native code to load the font on Android so that weights are magical and we don't care about font names
* Should we subdir the fonts on ios - would mean changing loadfont API
* Should we continue to expose
  * loadFont
  * hasIcon
  * getRawGlyphmap
  * getFOntFamily?
* Why do we make the text non-selectable?
* There are some really old fonts should we still support them?
  * antdesign - now at version 6 but no ttf - should we use new SVG approach
* Do we keep the old default entry points for FA6 and friends or just use { }
* loadFont
  * Should we have a better API for fontawesome6
  * should we error if font missing back to javascript

# Notes for the migration doc we'll need to write
* Native typescript support
* Removed ancient react-vector-icons compatibility
* Major upgrade for antdesign
* Things to undo
  * Remove any fonts from Info.plist
  * Remove font assets from react-native.config.js
  * Remove any frons from android and ios directories

# TODO
* Fix duplication in upgrade scripts for fontawesome
* Support fontello
* Support icomoon
* Should we leave upstream names on the icons
