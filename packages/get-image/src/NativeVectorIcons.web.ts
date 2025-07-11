import type { Spec } from './NativeVectorIcons';

const webImpl: Spec = {
  async getImageForFont() {
    throw new Error('getImageForFont is not available for web');
  },
  getImageForFontSync() {
    throw new Error('getImageForFontSync is not available for web');
  },
};

export default webImpl;
