import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getImageForFont(fontName: string, glyph: string, fontSize: number, color: number): Promise<string>;

  getImageForFontSync(fontName: string, glyph: string, fontSize: number, color: number): string;

  loadFontWithFileName(fontFileName: string, extension: string, subdirectory?: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('VectorIcons');
