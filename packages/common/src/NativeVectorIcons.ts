import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getImageForFont(fontFamilyName: string, glyph: string, fontSize: number, color: number): Promise<string>;

  getImageForFontSync(fontFamilyName: string, glyph: string, fontSize: number, color: number): string;
}

// TODO: We should return some defaults if this doesn't exist because we aren't linked now that we are optional
export default TurboModuleRegistry.get<Spec>('VectorIcons') || {
  // @ts-expect-error: don't care about unused name
  getImageForFont: async (fontFamilyName: string, glyph: string, fontSize: number, color: number) => '', // eslint-disable-line @typescript-eslint/no-unused-vars
  // @ts-expect-error: don't care about unused name
  getImageForFontSync: (fontFamilyName: string, glyph: string, fontSize: number, color: number) => '', // eslint-disable-line @typescript-eslint/no-unused-vars
};
