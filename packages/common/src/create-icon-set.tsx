import React, { forwardRef, type Ref, useEffect } from 'react';
import { Platform, Text, type TextProps, type TextStyle } from 'react-native';

import { createIconSourceCache, type ImageResult } from './create-icon-source-cache';
import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './defaults';
import { dynamicLoader } from './dynamicLoading/dynamic-font-loading';
import { isDynamicLoadingEnabled } from './dynamicLoading/dynamic-loading-setting';
import type { FontSource } from './dynamicLoading/types';
import {
  type GetImageSourceOptions,
  getImageSource as getImageSourceImpl,
  getImageSourceSync as getImageSourceSyncImpl,
} from './get-image-source';

type GetImageSourceSyncIconFunc<GM> = {
  (name: GM, options: GetImageSourceOptions): ImageResult;
  (name: GM, size?: number, color?: TextStyle['color']): ImageResult;
};
type GetImageSourceIconFunc<GM> = {
  (name: GM, options: GetImageSourceOptions): Promise<ImageResult>;
  (name: GM, size?: number, color?: TextStyle['color']): Promise<ImageResult>;
};

export type IconProps<T> = TextProps & {
  name: T;
  size?: number;
  color?: TextStyle['color'];
  innerRef?: Ref<Text>;
};

type GlyphMap = Record<string, number | string>;

export type IconComponent<GM extends GlyphMap> = React.FC<
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

export function createIconSet<GM extends GlyphMap>(
  glyphMap: GM,
  postScriptName: string,
  fontFileName: string,
  fontStyle?: TextProps['style'],
): IconComponent<GM>;
export function createIconSet<GM extends GlyphMap>(glyphMap: GM, options: CreateIconSetOptions): IconComponent<GM>;
export function createIconSet<GM extends GlyphMap>(
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

  const fontSource = typeof postScriptNameOrOptions === 'object' && postScriptNameOrOptions?.fontSource;

  const resolveGlyph = (name: keyof GM): string => {
    const glyph = glyphMap[name] || '?';

    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }

    return glyph;
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
    const canUseDynamicLoading = !!fontSource && isDynamicLoadingEnabled();
    const [isFontLoaded, setIsFontLoaded] = React.useState(
      canUseDynamicLoading ? dynamicLoader.isLoaded(fontReference) : true,
    );
    const glyph = isFontLoaded && name ? resolveGlyph(name) : '';

    const shouldLoadFontDynamically = !isFontLoaded && canUseDynamicLoading;
    // biome-ignore lint/correctness/useExhaustiveDependencies: the dependencies never change
    useEffect(() => {
      let isMounted = true;

      if (shouldLoadFontDynamically) {
        dynamicLoader.loadFontAsync(fontReference, fontSource).finally(() => {
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
      style: [styleDefaults, style, styleOverrides, fontStyle],
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

  const getImageSource: GetImageSourceIconFunc<keyof GM> = async (
    name: keyof GM,
    sizeOrOptions?: number | GetImageSourceOptions,
    color?: TextStyle['color'],
  ) => {
    const canUseDynamicLoading = !!fontSource && isDynamicLoadingEnabled();
    if (canUseDynamicLoading && !dynamicLoader.isLoaded(fontReference)) {
      await dynamicLoader.loadFontAsync(fontReference, fontSource);
    }
    const options = typeof sizeOrOptions === 'object' ? sizeOrOptions : { size: sizeOrOptions, color };
    return getImageSourceImpl(imageSourceCache, fontReference, resolveGlyph(name), options);
  };

  const getImageSourceSync: GetImageSourceSyncIconFunc<keyof GM> = (
    name: keyof GM,
    sizeOrOptions?: number | GetImageSourceOptions,
    color?: TextStyle['color'],
  ) => {
    const options = typeof sizeOrOptions === 'object' ? sizeOrOptions : { size: sizeOrOptions, color };
    return getImageSourceSyncImpl(imageSourceCache, fontReference, resolveGlyph(name), options);
  };

  const IconNamespace = Object.assign(WrappedIcon, {
    getImageSource,
    getImageSourceSync,
  });

  return IconNamespace;
}
