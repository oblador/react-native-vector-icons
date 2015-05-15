# Vector Icons for React Native

## Installation

`$ npm install react-native-vector-icons --save`


## Usage

Generate your custom icon font at [fontello](http://fontello.com). 
Add icon fonts to your project and remember to add it under "Fonts provided by application" in your `Info.plist`. 

```
var fontelloConfig = require('./config.json');
var { createIconSetFromFontello } = require('react-native-vector-icons');
var Icon = createIconSetFromFontello(fontelloConfig);

<Icon name="facebook" size={30} style={{ padding: 5, color: '#fff', backgroundColor: '#3b5998' }} />
```
