import React, { forwardRef, type Ref, useEffect } from 'react';

import { PixelRatio, Platform, Text, type TextProps, type TextStyle, processColor } from 'react-native';

import NativeIconAPI from './NativeVectorIcons';
import createIconSourceCache from './create-icon-source-cache';
import { dynamicLoader } from './dynamicLoading/dynamic-font-loading';
import { isDynamicLoadingEnabled } from './dynamicLoading/dynamic-loading-setting';
import type { FontSource } from './dynamicLoading/types';
import ensureNativeModuleAvailable from './ensure-native-module-available';

export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = 'black';

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

type IconComponent<GM extends Record<string, number>> = React.FC<
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
      ? { postScriptName: postScriptNameOrOptions, fontFileName: fontFileNameParam, fontStyle: fontStyleParam }
      : postScriptNameOrOptions;

  const fontBasename = fontFileName ? fontFileName.replace(/\.(otf|ttf)$/, '') : postScriptName;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFileName}#${postScriptName}`,
    android: fontBasename,
    web: fontBasename,
    default: postScriptName,
  });

  const resolveGlyph = (name: keyof GM) => {
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

    const styleOverrides: TextProps['style'] = {
      fontFamily: fontReference,
      fontWeight: 'normal',
      fontStyle: 'normal',
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
  WrappedIcon.displayName = 'Icon';

  const imageSourceCache = createIconSourceCache();

  const getImageSourceSync = (
    name: keyof GM,
    size = DEFAULT_ICON_SIZE,
    color: TextStyle['color'] = DEFAULT_ICON_COLOR,
  ) => {
    ensureNativeModuleAvailable();

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;

    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }

    try {
      const imagePath = NativeIconAPI.getImageForFontSync(
        fontReference,
        glyph,
        size,
        processedColor as number, // FIXME what if a non existant colour was passed in?
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error as Error);
      throw error;
    }
  };

  const getImageSource = async (
    name: keyof GM,
    size = DEFAULT_ICON_SIZE,
    color: TextStyle['color'] = DEFAULT_ICON_COLOR,
  ) => {
    ensureNativeModuleAvailable();

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;

    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }

    try {
      const imagePath = await NativeIconAPI.getImageForFont(
        fontReference,
        glyph,
        size,
        processedColor as number, // FIXME what if a non existant colour was passed in?
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error as Error);
      throw error;
    }
  };

  const IconNamespace = Object.assign(WrappedIcon, {
    getImageSource,
    getImageSourceSync,
  });

  return IconNamespace;
}
