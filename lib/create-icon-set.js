/**
 * @providesModule createIconSet
 * @flow
 */
'use strict';

var pick = require('lodash/object/pick');
var omit = require('lodash/object/omit');
var isString = require('lodash/lang/isString');
var isEqual = require('lodash/lang/isEqual');

var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TabBarIOS,
  requireNativeComponent,
  NativeModules,
  Platform,
  processColor,
} = React;

var NativeIconAPI = NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule;

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;
var DEFAULT_ICON_COLOR = 'black';
var IOS7_BLUE = '#007AFF';
var DEFAULT_BUTTON_ICON_SIZE = 20;
var DEFAULT_BUTTON_ICON_COLOR = 'white';
var DEFAULT_BUTTON_RADIUS = 5;
var DEFAULT_BUTTON_BACKGROUND = IOS7_BLUE;

function createIconSet(glyphMap : Object, fontFamily : string, fontFile : string) : Function {
  var fontReference = fontFamily;
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  if(Platform.OS === 'android' && fontFile) {
    fontReference = fontFile.replace(/\.(otf|ttf)$/, '');
  }

  var Icon = React.createClass({
    propTypes: {
      name: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      size: React.PropTypes.number,
      color: React.PropTypes.string,
    },
    _root: (null:?Object),

    setNativeProps: function(nativeProps) {
      if (this._root == null) {
        throw new Error("Ref must have been set before calling setNativeProps");
      }
      this._root.setNativeProps(nativeProps);
    },

    render: function() {
      var { name, size, color, style, ...props } = this.props;

      var glyph = glyphMap[name] || '?';
      if(typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      size = size || DEFAULT_ICON_SIZE;

      var styleDefaults:Object = {
        fontSize: size,
        color,
      };

      props.style = [styleDefaults, style];
      props.ref = (component) => this._root = component;

      styleDefaults.fontFamily = fontReference;

      return (<Text {...props}>{glyph}{this.props.children}</Text>);
    }
  });

  var styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 8,
    },
    touchable: {
      overflow: 'hidden',
    },
    icon: {
      marginRight: 10,
    },
    text: {
      fontWeight: '600',
      backgroundColor: 'transparent',
    },
  });

  var IconButton = React.createClass({
    getDefaultProps: function() {
      return {
        size: DEFAULT_BUTTON_ICON_SIZE,
        color: DEFAULT_BUTTON_ICON_COLOR,
        backgroundColor: DEFAULT_BUTTON_BACKGROUND,
        borderRadius: DEFAULT_BUTTON_RADIUS,
      };
    },

    render: function() {
      var {
        style,
        iconStyle,
        children,
        ...props
      } = this.props;

      var iconProps = pick(props, Object.keys(Text.propTypes), 'style', 'name', 'size', 'color');
      var touchableProps = pick(props, Object.keys(TouchableHighlight.propTypes));
      props = omit(
        props,
        Object.keys(iconProps),
        Object.keys(touchableProps),
        'iconStyle',
        'borderRadius',
        'backgroundColor'
      );
      iconProps.style = (this.props.iconStyle ? [styles.icon, this.props.iconStyle]: styles.icon);

      var colorStyle = pick(this.props, 'color');
      var blockStyle = pick(this.props, 'backgroundColor', 'borderRadius');

      if(isString(children)) {
        children = (<Text style={[styles.text, colorStyle]}>{children}</Text>);
      }

      return (
        <TouchableHighlight style={[styles.touchable, blockStyle]} {...touchableProps}>
          <View
            style={[styles.container, blockStyle, style]}
            {...props}
          >
            <Icon {...iconProps} />
            {children}
          </View>
        </TouchableHighlight>
      );
    }
  });

  var imageSourceCache = {};

  var getImageSource = function(name : string, size? : number, color? : string) : Promise {
    if(!NativeIconAPI) {
      if(Platform.OS === 'android') {
        throw new Error('RNVectorIconsModule not available, did you properly integrate the module?');
      }
      throw new Error('RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');
    }

    var glyph = glyphMap[name] || '?';
    if(typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }
    size = size || DEFAULT_ICON_SIZE;
    color = color || DEFAULT_ICON_COLOR;

    if(processColor) {
      color = processColor(color);
    }

    var cacheKey = glyph + ':' + size + ':' + color;

    return new Promise((resolve, reject) => {
      var cached = imageSourceCache[cacheKey];
      if(typeof cached !== 'undefined') {
        if(!cached || cached instanceof Error ) { reject(cached); }
        return resolve({ uri: cached });
      }
      NativeIconAPI.getImageForFont(fontReference, glyph, size, color, function(err, image) {
        if(typeof err === 'string') {
          err = new Error(err);
        }
        imageSourceCache[cacheKey] = image || err || false;
        if(!err && image) {
          return resolve({ uri: image });
        }
        reject(err);
      });
    });
  };


  var TabBarItem = React.createClass({
    propTypes: {
      iconName: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      selectedIconName: React.PropTypes.oneOf(Object.keys(glyphMap)),
      iconSize: React.PropTypes.number,
    },

    updateIconSources: function() {
      var size = this.props.iconSize || TAB_BAR_ICON_SIZE;
      if(this.props.iconName) {
        getImageSource(this.props.iconName, size).then(icon => this.setState({ icon }));
      }
      if(this.props.selectedIconName) {
        getImageSource(this.props.selectedIconName, size).then(selectedIcon => this.setState({ selectedIcon }));
      }
    },

    componentWillMount: function() {
      this.updateIconSources();
    },

    componentWillReceiveProps: function(nextProps) {
      var keys = Object.keys(TabBarItem.propTypes);
      if(!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        this.updateIconSources();
      }
    },

    render: function() {
      return <TabBarIOS.Item {...this.props} {...this.state} />;
    }
  });

  Icon.Button = IconButton;
  Icon.TabBarItem = TabBarItem;
  Icon.getImageSource = getImageSource;

  return Icon;
};

module.exports = createIconSet;
