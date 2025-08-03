// eslint-disable-next-line import/no-extraneous-dependencies
import React, { forwardRef, type Ref, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Platform, Text, type TextProps, type TextStyle } from 'react-native';

import createIconSourceCache from './create-icon-source-cache';
import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './defaults';
import { dynamicLoader } from './dynamicLoading/dynamic-font-loading';
import { isDynamicLoadingEnabled } from './dynamicLoading/dynamic-loading-setting';
import type { FontSource } from './dynamicLoading/types';
import { getImageSource as getImageSourceImpl, getImageSourceSync as getImageSourceSyncImpl } from './get-image-source';

type ValueData = { uri: string; scale: number };
type GetImageSourceSyncIconFunc<GM> = (name: GM, size?: number, color?: TextStyle['color']) => ValueData | undefined;
type GetImageSourceIconFunc<GM> = (
  name: GM,
  size?: number,
  color?: TextStyle['color'],
) => Promise<ValueData | undefined>;

export type IconProps<T> = TextProps & {
  name: T;
  size?: number;
  color?: TextStyle['color'];
  innerRef?: Ref<Text>;
};

export type IconComponent<GM extends Record<string, number>> = React.FC<
  TextProps & {
    name: keyof GM;
    size?: number;
    color?: TextStyle['color'];
    innerRef?: Ref<Text>;
  } & React.RefAttributes<Text>
> & {
  getImageSource: GetImageSourceIconFunc<keyof GM>;
  getImageSourceSync: GetImageSourceSyncIconFunc<keyof GM>;
};

export type CreateIconSetOptions = {
  postScriptName: string;
  fontFileName: string;
  fontSource?: FontSource;
  fontStyle?: TextProps['style'];
};

export function createIconSet<GM extends Record<string, number>>(
  glyphMap: GM,
  postScriptName: string,
  fontFileName: string,
  fontStyle?: TextProps['style'],
): IconComponent<GM>;
export function createIconSet<GM extends Record<string, number>>(
  glyphMap: GM,
  options: CreateIconSetOptions,
): IconComponent<GM>;
export function createIconSet<GM extends Record<string, number>>(
  glyphMap: GM,
  postScriptNameOrOptions: string | CreateIconSetOptions,
  fontFileNameParam?: string,
  fontStyleParam?: TextProps['style'],
): IconComponent<GM> {
  const { postScriptName, fontFileName, fontStyle } =
    typeof postScriptNameOrOptions === 'string'
      ? {
          postScriptName: postScriptNameOrOptions,
          fontFileName: fontFileNameParam,
          fontStyle: fontStyleParam,
        }
      : postScriptNameOrOptions;

  const fontBasename = fontFileName ? fontFileName.replace(/\.(otf|ttf)$/, '') : postScriptName;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFileName}#${postScriptName}`,
    android: fontBasename,
    default: postScriptName,
  });

  const styleOverrides: TextProps['style'] = {
    fontFamily: fontReference,
    fontWeight: 'normal',
    fontStyle: 'normal',
  };

  const resolveGlyph = (name: keyof GM) => {
    const glyph = glyphMap[name];

    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }

    return '?';
  };

  const Icon = ({
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    style,
    children,
    allowFontScaling = false,
    innerRef,
    ...props
  }: IconProps<keyof GM>) => {
    const [isFontLoaded, setIsFontLoaded] = React.useState(
      isDynamicLoadingEnabled() ? dynamicLoader.isLoaded(fontReference) : true,
    );
    const glyph = isFontLoaded && name ? resolveGlyph(name) : '';

    // biome-ignore lint/correctness/useExhaustiveDependencies: the dependencies never change
    useEffect(() => {
      let isMounted = true;

      if (
        !isFontLoaded &&
        typeof postScriptNameOrOptions === 'object' &&
        typeof postScriptNameOrOptions.fontSource !== 'undefined'
      ) {
        dynamicLoader.loadFontAsync(fontReference, postScriptNameOrOptions.fontSource).finally(() => {
          if (isMounted) {
            setIsFontLoaded(true);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, []);

    const styleDefaults = {
      fontSize: size,
      color,
    };

    const newProps: TextProps = {
      ...props,
      style: [styleDefaults, style, styleOverrides, fontStyle || {}],
      allowFontScaling,
    };

    return (
      <Text ref={innerRef} selectable={false} {...newProps}>
        {glyph}
        {children}
      </Text>
    );
  };

  const WrappedIcon = forwardRef<Text, IconProps<keyof typeof glyphMap>>((props, ref) => (
    <Icon innerRef={ref} {...props} />
  ));
  WrappedIcon.displayName = `Icon(${postScriptName})`;

  const imageSourceCache = createIconSourceCache();

  const getImageSource: GetImageSourceIconFunc<keyof GM> = async (name, size, color) => {
    if (typeof postScriptNameOrOptions === 'object' && typeof postScriptNameOrOptions.fontSource !== 'undefined') {
      await dynamicLoader.loadFontAsync(fontReference, postScriptNameOrOptions.fontSource);
    }
    return getImageSourceImpl(imageSourceCache, fontReference, resolveGlyph(name), size, color);
  };

  const getImageSourceSync: GetImageSourceSyncIconFunc<keyof GM> = (name, size, color) =>
    getImageSourceSyncImpl(imageSourceCache, fontReference, resolveGlyph(name), size, color);

  const IconNamespace = Object.assign(WrappedIcon, {
    getImageSource,
    getImageSourceSync,
  });

  return IconNamespace;
}
