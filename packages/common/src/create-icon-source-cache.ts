type ValueData = { uri: string; scale: number };

export function createIconSourceCache() {
  const cache = new Map<string, ValueData>();

  const setValue = (key: string, value: ValueData) => cache.set(key, value);

  const get = (key: string) => cache.get(key);

  return { setValue, get };
}
