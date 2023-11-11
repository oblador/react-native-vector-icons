# Notes for the migration doc we'll need to write

* deprecated flow types
* Native typescript support
* Removed old react-vector-icons compatibility
* Same support policy as react-native current + 2 (start with 0.73)
* We should try and make the font packages not care about react native versions
* preference for package.json or standalong config files for tooling
* Use loadfont on ios so plist.info doesn't have to be changed
* Should we subdir the fonts - would mean changing loadfont API
* We could do the same on android which to be honest might simplyfy things like a google font library
