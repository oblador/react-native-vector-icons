import React, {
  Component,
  PropTypes,
} from 'react';

import {
  NativeModules,
  Platform,
  PixelRatio,
  processColor,
  requireNativeComponent,
  Text,
} from 'react-native';

const NativeIconAPI = NativeModules && (NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule);

const DEFAULT_ICON_SIZE = 12;
const DEFAULT_ICON_COLOR = 'black';

import createIconButtonComponent from './icon-button';
import createTabBarItemIOSComponent from './tab-bar-item-ios';
import createToolbarAndroidComponent from './toolbar-android';

export default function createIconSet(glyphMap, fontFamily, fontFile) {
  let fontReference = fontFamily;
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  if (Platform.OS === 'android' && fontFile) {
    fontReference = fontFile.replace(/\.(otf|ttf)$/, '');
  }

  const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));

  class Icon extends Component {
    static propTypes = {
      name: IconNamePropType.isRequired,
      size: PropTypes.number,
      color: PropTypes.string,
    };

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false,
    };

    setNativeProps(nativeProps) {
      if (this._root) {
        this._root.setNativeProps(nativeProps);
      }
    }

    render() {
      const { name, size, color, style, ...props } = this.props;

      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const styleDefaults = {
        fontSize: size,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color,
      };

      props.style = [styleDefaults, style];
      props.ref = (component) => {
        this._root = component;
      };

      styleDefaults.fontFamily = fontReference;

      return (<Text {...props}>{glyph}{this.props.children}</Text>);
    }
  }

  let imageSourceCache = {};

  function getImageSource(name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) {
    if (!NativeIconAPI) {
      if (Platform.OS === 'android') {
        throw new Error('RNVectorIconsModule not available, did you properly integrate the module?');
      }
      throw new Error('RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');
    }

    let glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }

    const proessedColor = processColor(color);
    const cacheKey = glyph + ':' + size + ':' + proessedColor;
    const scale = PixelRatio.get();

    return new Promise((resolve, reject) => {
      const cached = imageSourceCache[cacheKey];
      if (typeof cached !== 'undefined') {
        if (!cached || cached instanceof Error ) { reject(cached); }
        resolve({ uri: cached, scale });
      } else {
        NativeIconAPI.getImageForFont(fontReference, glyph, size, proessedColor, (err, image) => {
          const error = (typeof err === 'string' ? new Error(err) : err);
          imageSourceCache[cacheKey] = image || error || false;
          if (!error && image) {
            resolve({ uri: image, scale });
          } else {
            reject(error);
          }
        });
      }
    });
  }

  Icon.Button = createIconButtonComponent(Icon);
  Icon.TabBarItem = Icon.TabBarItemIOS = createTabBarItemIOSComponent(IconNamePropType, getImageSource);
  Icon.ToolbarAndroid = createToolbarAndroidComponent(IconNamePropType, getImageSource);
  Icon.getImageSource = getImageSource;

  return Icon;
}
