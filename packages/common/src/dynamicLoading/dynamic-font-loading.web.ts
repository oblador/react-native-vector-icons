/**
 * dynamic font loading isn't supported on web
 * */
import type { DynamicLoader, FontSource } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadFontAsync = async (_fontFamily: string, _fontSource: FontSource): Promise<void> => undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isLoaded = (_fontFamily: string) => true;

export const dynamicLoader: DynamicLoader = {
  isLoaded,
  loadFontAsync,
};
