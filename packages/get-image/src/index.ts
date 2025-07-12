import { Platform } from 'react-native';

export { ensureNativeModuleAvailable } from './ensure-native-module-available';

const LINKING_ERROR = `
  The package '@react-native-vector-icons/get-image' doesn't seem to be linked. Make sure:
    ${Platform.select({ ios: "- You have run 'pod install'\n", default: '' })}
    - You rebuilt the app after installing the package\n'
    - You are not using Expo Go
  `;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const VectorIconsModule = require('./NativeVectorIcons').default;

const VectorIcons = VectorIconsModule
  ? VectorIconsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

export function getImageForFont(
  fontFamilyName: string,
  glyph: string,
  fontSize: number,
  color: number,
): Promise<string> {
  return VectorIcons.getImageForFont(fontFamilyName, glyph, fontSize, color);
}

export function getImageForFontSync(fontFamilyName: string, glyph: string, fontSize: number, color: number): string {
  return VectorIcons.getImageForFontSync(fontFamilyName, glyph, fontSize, color);
}
