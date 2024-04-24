# TODO

* Get Detox working on iOS
* Does the function signature for getImageSource for Fontawesome make sense, should we move the style icon earlier as it's not really an optional argument??
* Export the types
* Test the other targets
  * macOS
  * windows
  * web
Expo
* Has own font loading mechanism
* Need to see how this will work

TODO: Fix the links when posting on the issues

# Notes for the migration announcement

Hi All,

We have been working on a major refactor of React Native Vector Icons to move
it to a monorepo structure with individual packages for each font.

The major changes are
* Simple setup - only npm install needed
* Package per font - Only install the fonts you need for smaller bundle sizes
* Typescript support
* All fonts updated
* Font package generator - easily ship new fonts
* codemod for easy migration

We've released alpha version and would love feedback on any issues before we go GA.

Check out the migration guide in MIGRATION.md

*Help Needed!* Can someone help with making installation for OSX and Windows projects fully automated as well.

More detail on all of the changes below

## Simple setup

Significant effort has gone into automating of the entire setup experience. For
a new user adding a font should be as simple as follows:

```sh
npm install @react-native-vector-icons/common @react-native-vector-icons/fontisto
cd ios && pod update
npm android
npm ios
```

```jsx
import Fontisto from '@react-native-vector-icons/fontisto'

const App = () => <Fontisto name="comments" />
```

## Package per font

Each font has it's own npm package, this means you only get the fonts you want
in you final build. For example `@react-native-vector-icons/evil-icons`. They
version numbers for the individual packages will track the upstream versions.
This should provide more stability for your projects in terms of knowing
exactly which glyphs will be supported in the font.

The should have a significant improvement on bundle sizes. For example if you
only need the evil icons font, instead of including 2.8MB of fonts you would
only include 14kB.

## New npm scope

The npm modules are now hosted under `@react-native-vector-icons`.

## Native typescript support and autocompletion

All packages are now written in typescript and export types.

LSP based autocompletion should now be significantly improved, with completion
of icon names, including support for multi style icons like FontAwesome 5 and
6.

## Font updates

All fonts have been updated to the very latest versions. In the future we
intend to have automation via GitHub actions to automatically track upstream
fonts and release new versions.

## Font template generator

We have created a [Yeoman](https://yeoman.io/) generator,
`@react-native-vector-icons/generator-react-native-vector-icons` that you can
use to create packages for your own fonts. We use this to generate all the
internal font packages. See the documentation for more details. We will also
welcome pull requests for new fonts. In the future we'll write some GitHub
actions to auto update and publish based on upstream changes.

## Other changes

Backwards computability with react-vector-icons has been removed.

Icon.Button has been removed.

The following methods have been removed
  * getFontFamily
  * getRawGlyphMap
  * hasIcon
  * getStyledIconSet

Fontawesome 5 & 6 now take an `iconStyle` prop to switch between icon styles like solid, sharp etc.

## Migration

A migration guide can be found in MIGRATION.md. We have created a codemod to
help with the heavy lifting, as well as documenting all the steps.
