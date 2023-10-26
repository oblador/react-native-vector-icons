import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
} from './create-icon-set';

export default function createMultiStyleIconSet(styles, optionsInput = {}) {
  const styleNames = Object.keys(styles);

  if (styleNames.length === 0) {
    throw new Error('You need to add at least one style');
  }

  const options = {
    defaultStyle: styleNames[0],
    fallbackFamily: () => styleNames[0],
    glyphValidator: () => true,
    ...optionsInput,
  };

  const iconSets = styleNames.reduce((acc, name) => {
    const style = styles[name];

    acc[name] = createIconSet(
      style.glyphMap || {},
      style.fontFamily || '',
      style.fontFile || '',
      style.fontStyle || {}
    );

    return acc;
  }, {});

  function styleFromProps(props) {
    return Object.keys(props).reduce(
      (result, propName) =>
        styleNames.indexOf(propName) !== -1 && props[propName] === true
          ? propName
          : result,
      options.defaultStyle
    );
  }

  function getIconSetForProps(props) {
    const { name } = props;
    const style = styleFromProps(props);

    if (options.glyphValidator(name, style)) return iconSets[style];

    const family = options.fallbackFamily(name);

    if (styleNames.indexOf(family) === -1) {
      return options.defaultStyle;
    }

    return iconSets[family];
  }

  function selectIconClass(iconSet, iconClass) {
    return iconClass.length > 0 ? iconSet[iconClass] : iconSet;
  }

  function reduceProps(props) {
    return Object.keys(props).reduce((acc, prop) => {
      if (styleNames.indexOf(prop) === -1) {
        acc[prop] = props[prop];
      }

      return acc;
    }, {});
  }

  function getStyledIconSet(style, name = '') {
    if (styleNames.indexOf(style) === -1) {
      return iconSets[options.defaultStyle];
    }

    return !name
      ? iconSets[styleFromProps({ [style]: true })]
      : getIconSetForProps({ name, [style]: true });
  }

  function getImageSource(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    style = options.defaultStyle
  ) {
    return getStyledIconSet(style, name).getImageSource(name, size, color);
  }

  function getImageSourceSync(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    style = options.defaultStyle
  ) {
    return getStyledIconSet(style, name).getImageSourceSync(name, size, color);
  }

  function getFontFamily(style = options.defaultStyle) {
    return getStyledIconSet(style).getFontFamily();
  }

  function getRawGlyphMap(style = options.defaultStyle) {
    return getStyledIconSet(style).getRawGlyphMap();
  }

  function hasIcon(name, style = options.defaultStyle) {
    return options.glyphValidator(name, style);
  }

  function createStyledIconClass(selectClass = '') {
    class IconClass extends PureComponent {
      static propTypes = styleNames.reduce((acc, name) => {
        acc[name] = PropTypes.bool;
        return acc;
      }, {});

      static defaultProps = styleNames.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, {});

      render() {
        const selectedIconSet = getIconSetForProps(this.props);
        const SelectedIconClass = selectIconClass(selectedIconSet, selectClass);
        const props = reduceProps(this.props);

        return <SelectedIconClass {...props} />;
      }
    }

    return IconClass;
  }

  const Icon = createStyledIconClass();
  Icon.Button = createStyledIconClass('Button');
  Icon.getStyledIconSet = getStyledIconSet;
  Icon.getImageSource = getImageSource;
  Icon.getImageSourceSync = getImageSourceSync;
  Icon.getFontFamily = getFontFamily;
  Icon.getRawGlyphMap = getRawGlyphMap;
  Icon.hasIcon = hasIcon;

  return Icon;
}
