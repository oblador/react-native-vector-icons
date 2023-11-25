# Notes for the migration doc we'll need to write

* Is it OK to ditch the flow types?
* Native typescript support
* Removed ancient react-vector-icons compatibility
* Same support policy as react-native current + 2 (start with 0.73)
* We should try and make the font packages not care about react native versions
* preference for package.json or standalong config files for tooling
* Use loadfont on ios so plist.info doesn't have to be changed
* Should we also use native code to load the font on Android so that weights are magical and we don't care about font names
* Should we subdir the fonts - would mean changing loadfont API
* Should we keep Button
* Should we continue to expose
  * loadFont
  * hasIcon
  * getRawGlyphmap
  * getFOntFamily?
* Why do we make the text non-selectable?
* Deprecate antdesign?
* Should we simplify multistyle instead of solid light etc props we use icontType="solid" much simpler for typescript
* Is fallbackFamily worth the complexity? Is it better to show no icon than a wrong icon? Maybe with a console warning?
* I've simplified create multi significantly to make the types work more easily, we could probably go back the other way but will need someone to help with type magic
* Do we keep the old default entry points for FA6 and friends or just use { }
* loadFont
  * Should we have a better API for fontawesome6
  * should we error if font missing back to javascript
