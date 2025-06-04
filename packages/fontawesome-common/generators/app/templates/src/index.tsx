/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */
import type { ComponentProps } from 'react';
import { Platform, type TextStyle } from 'react-native';

import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE, createIconSet } from '@react-native-vector-icons/common';

<% upperDefaultStyleName = meta.defaultStyleName.charAt(0).toUpperCase() + meta.defaultStyleName.slice(1) -%>
<% meta.styleNames.sort().forEach((styleName) => { -%>
import <%= styleName %>GM from '../glyphmaps/<%= className %>_<%= styleName %>.json';
<% }) -%>

import metadata from '../glyphmaps/<%- className %>_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

<% Object.entries(meta.styles).forEach(([styleName, { family, name, weight }]) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
// biome-ignore format: We want these to be consistent and we are fine with single for all
const <%= upperStyleName %>Icon = createIconSet(<%= styleName %>GM, '<%= family %>', '<%= name %>', fontStyle('<%= weight %>'));
<% }) -%>

type Props =
<% Object.entries(meta.styles).forEach(([styleName, { family, name, weight }]) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
  | ({ iconStyle: '<%= styleName %>' } & ComponentProps<typeof <%= upperStyleName %>Icon>)
<% }) -%>
  | ({ iconStyle?: never } & ComponentProps<typeof <%= upperDefaultStyleName %>Icon>);

const Icon = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    if (!glyphValidator(name, 'regular')) {
      console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for 'regular' icon type for <%= className %>`);
    }
    return <<%= upperDefaultStyleName %>Icon {...props} />;
  }

  if (!glyphValidator(name, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for <%= className %>`);

    return <<%= upperDefaultStyleName %>Icon {...(props as ComponentProps<typeof <%= upperDefaultStyleName %>Icon>)} />;
  }

  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
    case '<%= styleName %>':
      return <<%= upperStyleName %>Icon {...props} />;
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return <<%= upperDefaultStyleName %>Icon {...(props as ComponentProps<typeof <%= upperDefaultStyleName %>Icon>)} />;
  }
};

type GetImageSourceFunc = {
<% meta.styleNames.forEach((styleName) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
  (
    iconStyle: '<%= styleName %>',
    name: ComponentProps<typeof <%= upperStyleName %>Icon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof <%= upperStyleName %>Icon)['getImageSource']>;
<% }) -%>
};
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSource: GetImageSourceFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
    case '<%= styleName %>':
      return <%= upperStyleName %>Icon.getImageSource(name as keyof typeof <%= styleName %>GM, size, color);
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return <%= upperDefaultStyleName %>Icon.getImageSource(name as keyof typeof <%= meta.defaultStyleName %>GM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
<% meta.styleNames.forEach((styleName) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
  (
    iconStyle: '<%= styleName %>',
    name: ComponentProps<typeof <%= upperStyleName %>Icon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof <%= upperStyleName %>Icon)['getImageSourceSync']>;
<% }) -%>
};
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSourceSync: GetImageSourceSyncFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
<% upperStyleName = styleName.charAt(0).toUpperCase() + styleName.slice(1) -%>
    case '<%= styleName %>':
      return <%= upperStyleName %>Icon.getImageSourceSync(name as keyof typeof <%= styleName %>GM, size, color);
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return <%= upperDefaultStyleName %>Icon.getImageSourceSync(name as keyof typeof <%= meta.defaultStyleName %>GM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
