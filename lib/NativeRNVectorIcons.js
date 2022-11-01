// @flow
// eslint-disable-next-line import/no-unresolved
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getImageForFont(
    fontName: string,
    glyph: string,
    fontSize: number,
    color: number
  ): Promise<string>;
  getImageForFontSync(
    fontName: string,
    glyph: string,
    fontSize: number,
    color: number
  ): string;
  loadFontWithFileName(fontFileName: string, extension: string): Promise<void>;
}
export default (TurboModuleRegistry.get<Spec>('RNVectorIcons'): ?Spec);
