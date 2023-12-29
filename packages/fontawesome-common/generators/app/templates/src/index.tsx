/**
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */
import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet as commonCreateIconSet, type IconProps, DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from '@react-native-vector-icons/common';

<% meta.styleNames.forEach((styleName) => { -%>
import <%= styleName %>GM from '@react-native-vector-icons/<%= packageName %>/glyphmaps/<%= className %>_<%= styleName %>.json';
<% }) -%>

import metadata from '@react-native-vector-icons/<%= packageName %>/glyphmaps/<%- className %>_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

<% meta.styleNames.forEach((styleName) => { -%>
type <%= styleName %>IconProps = IconProps<keyof typeof <%= styleName %>GM>;
<% }) -%>
type Props =
<% meta.styleNames.forEach((styleName) => { -%>
  | ({ iconStyle?: '<%= styleName %>' } & <%= styleName %>IconProps)
<% }) -%>
  | ({ iconStyle?: never } & <%= meta.defaultStyleName %>IconProps);

const Icons = {
<% Object.entries(meta.styles).forEach(([styleName, { family, name, weight }]) => { -%>
  <%= styleName %>: commonCreateIconSet(<%= styleName %>GM, '<%= family %>', '<%= name %>', fontStyle('<%= weight %>')),
<% }) -%>
};

const Icon = (props: Props) => {
  if (!props.iconStyle) {
    return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }

  if (!glyphValidator(props.name as string, props.iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(props.name)} does not exist for '${props.iconStyle}' icon type for FontAwesome6`);

    return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }

  switch (props.iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
    case '<%= styleName %>':
      return <Icons.<%= styleName %> {...props} />;
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for <%= className %>`);
      return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }
};

type GetImageSourceFunc = {
<% meta.styleNames.forEach((styleName) => { -%>
  (name: keyof typeof <%= styleName %>GM, size: number, color: TextStyle['color'], iconStyle: '<%= styleName %>'): ReturnType<typeof Icons.<%= styleName %>['getImageSource']>;
<% }) -%>
  (name: keyof typeof <%= meta.defaultStyleName %>GM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.<%= meta.defaultStyleName %>['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = '<%= meta.defaultStyleName %>') => {
  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
    case '<%= styleName %>':
      return Icons.<%= styleName %>.getImageSource(name as keyof typeof <%= styleName %>GM, size, color);
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return Icons.<%= meta.defaultStyleName %>.getImageSource(name as keyof typeof <%= meta.defaultStyleName %>GM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
<% meta.styleNames.forEach((styleName) => { -%>
  (name: keyof typeof <%= styleName %>GM, size: number, color: TextStyle['color'], iconStyle: '<%= styleName %>'): ReturnType<typeof Icons.<%= styleName %>['getImageSourceSync']>;
<% }) -%>
  (name: keyof typeof <%= meta.defaultStyleName %>GM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.<%= meta.defaultStyleName %>['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
    case '<%= styleName %>':
      return Icons.<%= styleName %>.getImageSourceSync(name as keyof typeof <%= styleName %>GM, size, color);
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return Icons.<%= meta.defaultStyleName %>.getImageSourceSync(name as keyof typeof <%= meta.defaultStyleName %>GM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
