export const title = 'Getting Started';
export const description = 'Installation and setup guide for React Native Vector Icons';

export const body = `
Install and configure React Native Vector Icons for your platform.

## Installation

Install the packages for the icon sets you want to use. Each icon family is published as its own package under the \`@react-native-vector-icons\` scope.

\`\`\`sh
npm install @react-native-vector-icons/lucide @react-native-vector-icons/ionicons
\`\`\`

Then follow the setup instructions for your target platform below.
`.trim();

export const afterTabs = `
## Font Location Customisation

For fonts like FontAwesome Pro, Fontello, and Icomoon where you provide the fonts yourself, the default location for font files is \`rnvi-fonts\` in the same directory as your \`package.json\`. This can be customised by setting the \`fontDir\` property:

\`\`\`json
{
  "reactNativeVectorIcons": {
    "fontDir": "src/rnvi-fonts"
  }
}
\`\`\`
`.trim();

const expoSetup = `
Icon packages from \`@react-native-vector-icons\` work out of the box with Expo, across all platforms. No additional configuration is required.

> [!WARNING]
> **Avoid manual font duplication:** do not add fonts from \`node_modules/@react-native-vector-icons/some-font\` to the \`expo-font\` plugin configuration unless you have a specific advanced use case.
`.trim();

const reactNativeSetup = `
### Android

Rebuild your app. No extra steps are needed for Android.

### iOS

> [!TIP]
> You will need to follow these instructions any time you add a new font.

1. Run the plist update script to register your icon fonts:

\`\`\`sh
npx rnvi-update-plist package.json ios/AppName/Info.plist
\`\`\`

2. Open \`ios/Info.plist\` and verify that **UIAppFonts** contains the expected entries:

\`\`\`xml
<key>UIAppFonts</key>
<array>
  <string>Lucide.ttf</string>
  <string>Octicons.ttf</string>
</array>
\`\`\`

3. Install CocoaPods and rebuild:

\`\`\`sh
cd ios && pod install
\`\`\`

4. Rebuild your app.

### macOS

macOS support needs more work. See details in [issue #1624](https://github.com/oblador/react-native-vector-icons/issues/1624).

### Windows

1. Copy the needed fonts from \`node_modules/@react-native-vector-icons/*/fonts/*.ttf\` to \`windows/<Project>/Assets/*\`.
2. Open your solution in Visual Studio, right-click on Assets, select Add Assets, then select your fonts, save and quit Visual Studio.
3. Rebuild your project.
`.trim();

const webSetup = `
To use icons on the web with \`react-native-web\`, make the icon fonts available via \`@font-face\` declarations. Add the font families you use to your CSS:

\`\`\`css
@font-face {
  src: url(path/to/fonts/Lucide.ttf);
  font-family: "Lucide";
}

@font-face {
  src: url(path/to/fonts/Ionicons.ttf);
  font-family: "Ionicons";
}
\`\`\`

> [!TIP]
> You can debug missing font families by checking the developer console in your browser.
`.trim();

const viteSetup = `
Vite handles font file imports automatically — no extra configuration needed. Import the TTF file and inject it as a \`@font-face\` declaration:

\`\`\`js
import iconFont from '@react-native-vector-icons/lucide/fonts/Lucide.ttf';

const style = document.createElement('style');
style.textContent = \\\`@font-face {
  src: url(\\\${iconFont});
  font-family: Lucide;
}\\\`;
document.head.appendChild(style);
\`\`\`
`.trim();

const webpackSetup = `
Webpack 5 handles font files natively via asset modules. Add a rule to your webpack config:

\`\`\`js
{
  test: /\\.ttf$/,
  type: 'asset/resource',
}
\`\`\`

Then import the font file and inject it as a stylesheet:

\`\`\`js
import iconFont from '@react-native-vector-icons/lucide/fonts/Lucide.ttf';

const iconFontStyles = \\\`@font-face {
  src: url(\\\${iconFont});
  font-family: Lucide;
}\\\`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(iconFontStyles));
document.head.appendChild(style);
\`\`\`
`.trim();

export const tabs = {
  'Platform Setup': [
    { label: 'Expo', content: expoSetup },
    { label: 'React Native', content: reactNativeSetup },
    {
      label: 'Web',
      content: webSetup,
      subtabs: {
        title: 'Bundler Configuration',
        sections: [
          { label: 'Vite', content: viteSetup },
          { label: 'Webpack 5', content: webpackSetup },
        ],
      },
    },
  ],
};
