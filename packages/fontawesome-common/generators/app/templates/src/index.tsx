/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */
import React, { type FC } from 'react';

import { Platform, type TextStyle } from 'react-native';

import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  type IconProps,
  createIconSet as commonCreateIconSet,
} from '@react-native-vector-icons/common';

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

<% meta.styleNames.forEach((styleName) => { -%>
type <%= styleName %>IconProps = IconProps<keyof typeof <%= styleName %>GM>;
<% }) -%>
type Props =
<% meta.styleNames.forEach((styleName) => { -%>
  | ({ iconStyle?: '<%= styleName %>' } & <%= styleName %>IconProps)
<% }) -%>
  | ({ iconStyle?: never } & <%= meta.defaultStyleName %>IconProps);

type ValueData = { uri: string; scale: number };
type GetImageSourceSyncIconFunc<GM> = (name: GM, size?: number, color?: TextStyle['color']) => ValueData | undefined;
type GetImageSourceIconFunc<GM> = (
  name: GM,
  size?: number,
  color?: TextStyle['color'],
) => Promise<ValueData | undefined>;

type Icons = {
<% meta.styleNames.sort().forEach((styleName) => { -%>
  <%= styleName %>: FC<<%= styleName %>IconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof <%= styleName %>GM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof <%= styleName %>GM>;
  };
<% }) -%>
};

const Icons: Icons = {
<% Object.entries(meta.styles).forEach(([styleName, { family, name, weight }]) => { -%>
  // biome-ignore format: We want these to be consistent and we are fine with multiline for all
  <%= styleName %>: commonCreateIconSet(
    <%= styleName %>GM,
    '<%= family %>',
    '<%= name %>',
    fontStyle('<%= weight %>'),
  ),
<% }) -%>
};

const Icon = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }

  if (!glyphValidator(name as string, iconStyle)) {
    console.warn(
      `noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome6`,
    );

    return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }

  switch (iconStyle) {
<% meta.styleNames.forEach((styleName) => { -%>
    case '<%= styleName %>':
      return <Icons.<%= styleName %> {...props} />;
<% }) -%>
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for <%= className %>`);
      return <Icons.<%= meta.defaultStyleName %> {...(props as <%= meta.defaultStyleName %>IconProps)} />;
  }
};

type GetImageSourceFunc = {
<% meta.styleNames.forEach((styleName) => { -%>
  (
    iconStyle: '<%= styleName %>',
    name: keyof typeof <%= styleName %>GM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.<%= styleName %>)['getImageSource']>;
<% }) -%>
};
const getImageSource: GetImageSourceFunc = (
  iconStyle,
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
) => {
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
  (
    iconStyle: '<%= styleName %>',
    name: keyof typeof <%= styleName %>GM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.<%= styleName %>)['getImageSourceSync']>;
<% }) -%>
};
const getImageSourceSync: GetImageSourceSyncFunc = (
  iconStyle,
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
) => {
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
