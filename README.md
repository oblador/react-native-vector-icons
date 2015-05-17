# Vector Icons for React Native

**Choose from 2801 icons or use your own.**

100% JavaScript = easy to extend, style and integrate into your project.

## Installation

`$ npm install react-native-vector-icons --save`

If you want to use any of the bundled icons, you need to add the icon fonts to your XCode project. Just follow these steps:

* Right click on you project in XCode and select **Add files to xxx**. 
* Browse to `node_modules/react-native-vector-icons` and select the folder `Fonts` (or just the ones you want). 
* Edit `Info.plist` and add a property called **Fonts provided by application** (if you haven't added one already) and type in the files you just added. It will look something like this:

![XCode screenshot](https://cloud.githubusercontent.com/assets/378279/7667535/0e1fd13a-fc0c-11e4-9220-18d5c095a7be.png)

*Note: you need to recompile your project after adding new fonts.*

## Usage
You can either use one of the bundled icons or roll your own custom font. Currently available options for bundled icon sets are:

* [`Entypo`](http://entypo.com) by Daniel Bruce (**411** icons) 
* [`EvilIcons`](http://evil-icons.io) by Alexander Madyankin & Roman Shamin (v1.7.6, **68** icons) 
* [`FontAwesome`](http://fortawesome.github.io/Font-Awesome/icons/) by Dave Gandy (v4.3, **519** icons) 
* [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0, **283** icons)
* [`Ionicons`](http://ionicons.com/) by Ben Sperry (v2.0.1, **734** icons)
* [`MaterialDesign`](http://zavoloklom.github.io/material-design-iconic-font/icons.html) by Google, Inc. & Sergey Kupletsky (v1.1.1, **744** icons)
* [`Zocial`](http://zocial.smcllns.com/) by Sam Collins (v1.0, **42** icons)

```js
var Icon = require('FontAwesome');
var myIcon = (<Icon name="rocket" size={30} color="#900" style={styles.icon} />)
```

### Sizing

Either use the `size` attribute or a style with `fontSize`, defaults to 12. Sets the height of the icon, width depends on the icon aspect ratio, but will most likely be the same. 

### Color
Either use the `color` attribute or a style with `color`, defaults to black. 

### Style
Most [style properties](http://facebook.github.io/react-native/docs/style.html) will work as expected, you might find it useful to play around with these:

* `backgroundColor`
* `borderWidth`
* `borderColor`
* `borderRadius`
* `padding`
* `margin`
* `color`
* `fontSize`
* `flexDirection`
* `justifyContent`
* `alignItems`

By combining some of these you can create for example: 

![type](https://cloud.githubusercontent.com/assets/378279/7667570/33817554-fc0d-11e4-9ad7-4eb60139cfb7.png)
![star](https://cloud.githubusercontent.com/assets/378279/7667569/3010dd7e-fc0d-11e4-9696-cb721fe8e98d.png)

### Nesting
It's possible to nest the icons, any child content will appear after the icon, see the button example below. 

### Custom Fonts

#### `createIconSet(glyphMap, fontFamily)`
Returns your own custom font based on the `glyphMap` where the key is the icon name and the value is either a UTF-8 character or it's character code. `fontFamily` is the name of the font **NOT** the filename. Open the font in Font Book.app or similar to learn the name.

```js
var createIconSet = require('createIconSet');
var glyphMap = { 'icon-name': 1234, test: '∆' };
var Icon = createIconSet(glyphMap, 'FontName');
```

#### `createIconSetFromFontello(config[, fontFamily])`
Convenience method to create a custom font based on a [fontello](http://fontello.com) config file. Don't forget to import the font as described above and drop the `config.json` somewhere convenient in your project. 

```js
var require('createIconSetFromFontello');
var fontelloConfig = require('./config.json');
var Icon = createIconSetFromFontello(fontelloConfig);
```

## Examples

### IconExplorer
Try the `IconExplorer` project in `Examples/IconExplorer` folder, there you can also search for any icon. 

![Screenshot of IconExplorer](https://cloud.githubusercontent.com/assets/378279/7668482/06d4487c-fc3c-11e4-899c-041789a32362.png)


### Basic Example
```js
var React = require('react-native');
var Icon = require('Ionicons');

var ExampleView = React.createClass({
  render: function() {
    return <Icon name="person" size={30} color="#4F8EF7" />;
  }
};
```

### Button
By nesting a `<Text>` element and assigning padding and background color you can achieve a button like appearance. To register taps, just wrap it with a [`Touchable*`](http://facebook.github.io/react-native/docs/touchableopacity.html) component. 

![buttons](https://cloud.githubusercontent.com/assets/378279/7667568/2e9021b2-fc0d-11e4-8e68-cf91c329a6f4.png)

```js
var Icon = require('FontAwesome')

var styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#3b5998',
  },
  text: {
    marginLeft: 10,
    color: 'white',
    fontWeight: '600',
  },
});
var button = (
  <Icon name="facebook" style={styles.icon}>
    <Text style={styles.text}>Login with Facebook</Text>
  </Icon>
);
```

## Generating your own icon set from a CSS file

If you already have a icon font with associated CSS file then you can easily generate a icon set with the `generate-icon` script. 

### Example usage: 

```
./node_modules/.bin/generate-icon path/to/styles.css --componentName=MyIcon --fontFamily=myicon > Components/MyIcon.js
```

### Options

Any flags not listed below, like `--componentName` and `--fontFamily`, will be passed on to the template. 

#### `-p`, `--prefix`
CSS selector prefix [default: ".icon-"]

#### `-t`, `--template`
Template in lodash format [default: "./template/iconSet.tpl"]

For default template please provide `--componentName` and `--fontFamily`.

#### `-o`, `--output`
Save output to file, defaults to STDOUT

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
