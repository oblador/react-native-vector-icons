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
icon files and it **only works on Android for now** (iOS defaults to
Regular font).
The icon set must be specified:

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const regular_icon_btn = (<FontAwesome5.Regular.Button name={'comments'} />);
const solid_icon_btn = (<FontAwesome5.Solid.Button name={'comments'} />);
```

# Upgrading to Pro

Upgrading to the Pro version requires some manual work since you need to be
logged in to download the files. Note that these steps should be performed
before linking the library in order to avoid any side-effects.

## How-To

1. First you need to download the font files by logging into your account,
going to 'Downloads' and downloading the 'Font Awesome Pro for Desktop'
package.
2. Unzip the downloaded archive.
3. a) Automatic installation
    * Included in the ```bin/```
3. b) Manual installation
    * Move the font files into the ```Fonts/``` folder of this library and rename
      them:
        * ```Font Awesome 5 Brands-Regular-400.otf``` > ```FontAwesome5_Brands.otf```
        * ```Font Awesome 5 Pro-Light-300.otf``` > ```FontAwesome5_Light.otf```
        * ```Font Awesome 5 Pro-Regular-400.otf``` > ```FontAwesome5_Regular.otf```
        * ```Font Awesome 5 Pro-Solid-900.otf``` > ```FontAwesome5_Solid.otf```
4. Link the library using ```react-native link react-native-vector-icons```
or any manual method described in the [`main readme`](README.md).

## Upgrading after linking the free fonts
If you have already linked the library you should unlink the library before
upgrading and relinking. This is done by running ```react-native unlink
react-native-vector-icons``` and should work without issues.

## Using the Pro version

Should be fairly simple, just include the icon set like this:
```javascript
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const icon = (<FontAwesome5 name={'comments'} light/>);
```
