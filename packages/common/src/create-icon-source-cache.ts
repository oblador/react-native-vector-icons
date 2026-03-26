export type ImageResult = {
  /**
   * The file URI to the rendered image.
   */
  uri: string;
  /**
   * Image width in dp.
   */
  width: number;
  /**
   * Image height in dp.
   */
  height: number;
  /**
   * Scale factor of the image. Multiply the dp dimensions by this value to get the dimensions in pixels.
   */
  scale: number;
};

export function createIconSourceCache() {
  const cache = new Map<string, ImageResult>();

  const setValue = (key: string, value: ImageResult) => cache.set(key, value);

  const get = (key: string) => cache.get(key);

  return { setValue, get };
}
