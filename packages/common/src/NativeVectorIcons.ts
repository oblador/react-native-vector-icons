import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getImageForFont(fontFamilyName: string, glyph: string, fontSize: number, color: number): Promise<string>;

  getImageForFontSync(fontFamilyName: string, glyph: string, fontSize: number, color: number): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('VectorIcons');
