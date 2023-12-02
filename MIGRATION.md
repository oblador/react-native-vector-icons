# Approach
* Auto call load font on ios so no changes are needed to Info.plist
* Use gradle to auto copy files on android
* For fontawesome switch to using an iconType as typing is much simpler (instead of a solid prop)

# Questions
* I have removed the following - what should I put back?
  * Flow types - Suspect no one cares
  * react-vector-icons compatibility - it's ancient now
  * Icon.Button - DOes anyone really use this?
  * fallbackFamily - Is it worth the complexity? Is it better to show no icon than a wrong icon? Maybe with a console warning?
* Support policy - same as react-native - current - 2 (start with 0.73)
* cofnig preference for tooling like eslint - package.json or standalong config files?
* We could take a similar font loading approach on android
  * Don't care about names anymore
  * Easier for things like fontawesome with multiple weights
* Should we subdir the fonts on ios - would mean changing loadfont API
* Should we continue to expose
  * loadFont
  * hasIcon
  * getRawGlyphmap
  * getFOntFamily?
* Why do we make the text non-selectable?
* Do we keep the old default entry points for FA6 and friends or just use { }
* loadFont
  * Should we have a better API for fontawesome6
  * should we error if font missing back to javascript

# Notes for the migration doc we'll need to write
* Native typescript support
* Removed ancient react-vector-icons compatibility
* Major upgrade for antdesign
* materialcommunityicons now material-design-icons
* Things to undo
  * Remove any fonts from Info.plist
  * Remove font assets from react-native.config.js
  * Remove any frons from android and ios directories

# TODO
* Fix duplication in upgrade scripts for fontawesome
* Support fontello
* Support icomoon
