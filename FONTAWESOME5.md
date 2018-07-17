# FontAwesome 5

FontAwesome 5 is split into three different font files which makes it somewhat
harder to use in some cases. The implemented solution should be fairly
straightforward to use after it has been setup. 
Android and iOS handles fonts differently which is why it could be
easily implemented without any additional setup.

### Table of Content

* [`Setup`](#setup-ios-only)
* [`Usage`](#usage)
* [`Upgrading to Pro`](#upgrading-to-pro)

# Setup (iOS only)

**If you intend to use FontAwesome5 Pro you should upgrade before linking the
project, it's just easier that way**

Using ```react-native link react-native-vector-icons``` should do most of the
work needed but if there is any general problem linking the library, look in
the [`main readme`](README.md) for a solution.

After the library has been successfully linked to your project you need to
setup the fonts in the beginning of your AppDelegate.m.

```objc
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNVectorIconsManager.h>            // <----- ADD THIS LINE

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNVectorIconsManager setupFontAwesome5]; // <----- ADD THIS LINE

  NSURL *jsCodeLocation;
  ...
  React Native setup
  ...
  return YES;
}
```

# Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = (<FontAwesome5 name={'comments'} />);
```

Something special about the FontAwesome5 class is that you can also pass props
to change the style of the icon:

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = (<FontAwesome5 name={'comments'} solid />);
const icon = (<FontAwesome5 name={'git'} brand />);
```

**Valid types**

| Type        | Description |
| --- | --- |
| **brand**   | Uses the Brands font |
| **light**   | Uses the Light font (pro) or Regular (Free) |
| **solid**   | Uses the Solid font |

No specified type indicates Regular font.

So just using icons works pretty much like normal. However, access to the
Button, TabBarItem etc. must be accessed in a certain way due to the split
icon files. The icon set must be specified:

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const regular_icon_btn = (<FontAwesome5.Regular.Button name={'comments'} />);
const solid_icon_btn = (<FontAwesome5.Solid.Button name={'comments'} />);
```

# Upgrading to Pro

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the ```Services``` tab.

Run ```npm run fa5upgrade``` in the ```node_modules/react-native-vector-icons```
folder and enter the token when asked to in order to
upgrade to the Pro version. Note that you need to link and rebuild the app
after this.

## Manually

If the shell script does not work you can install the Pro version manually
by replacing the font files in ```Fonts/```. First you need to download the
Pro pack from the FontAwesome website (use the web version). Then rename
the font files in the ```webfonts/``` folder like this:

* fa-brands-400.ttf > FontAwesome5_Brands.ttf
* fa-light-300.ttf > FontAwesome5_Light.ttf
* fa-regular-400.ttf > FontAwesome5_Regular.ttf
* fa-solid-900.ttf > FontAwesome5_Solid.ttf

Place these in the ```Fonts/``` folder and replace the Free font files in the
process.

Link and rebuild the project.

## Using the Pro version

Should be fairly simple, just include the icon set like this:
```javascript
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const icon = (<FontAwesome5 name={'comments'} light/>);
```
