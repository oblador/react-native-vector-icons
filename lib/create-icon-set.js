/**
 * @providesModule createIconSet
 * @flow
 */
'use strict';

var pick = require('lodash/pick');
var omit = require('lodash/omit');
var isString = require('lodash/isString');
var isEqual = require('lodash/isEqual');

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
  PixelRatio,
  processColor,
  ToolbarAndroid,
} = React;

var NativeIconAPI = NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule;

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;
var TOOLBAR_ICON_SIZE = 24;
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

  var IconNamePropType = React.PropTypes.oneOf(Object.keys(glyphMap));

  var Icon = React.createClass({
    propTypes: {
      name: IconNamePropType.isRequired,
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
        fontWeight: 'normal',
        fontStyle: 'normal',
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
    var scale = PixelRatio.get();

    return new Promise((resolve, reject) => {
      var cached = imageSourceCache[cacheKey];
      if(typeof cached !== 'undefined') {
        if(!cached || cached instanceof Error ) { reject(cached); }
        return resolve({ uri: cached, scale });
      }
      NativeIconAPI.getImageForFont(fontReference, glyph, size, color, function(err, image) {
        if(typeof err === 'string') {
          err = new Error(err);
        }
        imageSourceCache[cacheKey] = image || err || false;
        if(!err && image) {
          return resolve({ uri: image, scale });
        }
        reject(err);
      });
    });
  };


  var TabBarItemIOS = React.createClass({
    propTypes: {
      iconName: IconNamePropType.isRequired,
      selectedIconName: IconNamePropType,
      iconSize: React.PropTypes.number,
    },

    updateIconSources: function(props) {
      var size = this.props.iconSize || TAB_BAR_ICON_SIZE;
      if(props.iconName) {
        getImageSource(props.iconName, size).then(icon => this.setState({ icon }));
      }
      if(props.selectedIconName) {
        getImageSource(props.selectedIconName, size).then(selectedIcon => this.setState({ selectedIcon }));
      }
    },

    componentWillMount: function() {
      this.updateIconSources(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      var keys = Object.keys(TabBarItemIOS.propTypes);
      if(!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        this.updateIconSources(nextProps);
      }
    },

    render: function() {
      return <TabBarIOS.Item {...this.props} {...this.state} />;
    }
  });

  var IconToolbarAndroid = React.createClass({
    propTypes: {
      navIconName: IconNamePropType,
      overflowIconName: IconNamePropType,
      actions: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        iconName: IconNamePropType,
        iconSize: React.PropTypes.number,
        iconColor: React.PropTypes.string,
        show: React.PropTypes.oneOf(['always', 'ifRoom', 'never']),
        showWithText: React.PropTypes.bool
      })),
      iconSize: React.PropTypes.number,
      iconColor: React.PropTypes.string,
    },

    updateIconSources: function(props) {
      var size = this.props.iconSize || TOOLBAR_ICON_SIZE;
      var color = props.iconColor || props.titleColor;
      if(props.navIconName) {
        getImageSource(props.navIconName, size, color).then(navIcon => this.setState({ navIcon }));
      }
      if(props.overflowIconName) {
        getImageSource(props.overflowIconName, size, color).then(overflowIcon => this.setState({ overflowIcon }));
      }

      Promise.all((props.actions || []).map(action => {
        if (action.iconName) {
          return getImageSource(action.iconName, action.iconSize || size, action.iconColor || color).then(icon => ({
            ...action,
            icon
          }));
        }
        return Promise.resolve(action);
      })).then(actions => this.setState({ actions }));
    },

    componentWillMount: function() {
      this.updateIconSources(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      var keys = Object.keys(IconToolbarAndroid.propTypes);
      if(!isEqual(pick(nextProps, keys), pick(this.props, keys))) {
        var stateToEvict = [];
        if (!nextProps.navIconName) {
          stateToEvict.push('navIcon');
        }
        if (!nextProps.iconName) {
          stateToEvict.push('icon');
        }
        if (this.state && stateToEvict.length) {
          this.replaceState(omit(this.state, stateToEvict), () => this.updateIconSources(nextProps));
        } else {
          this.updateIconSources(nextProps);
        }
      }
    },

    render: function() {
      return <ToolbarAndroid {...this.props} {...this.state} />;
    }
  });

  Icon.Button = IconButton;
  Icon.TabBarItem = TabBarItemIOS;
  Icon.TabBarItemIOS = TabBarItemIOS;
  Icon.ToolbarAndroid = IconToolbarAndroid;
  Icon.getImageSource = getImageSource;

  return Icon;
};

module.exports = createIconSet;
