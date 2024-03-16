const TYPE_VALUE = 'value';
const TYPE_ERROR = 'error';

type ValueData = { uri: string; scale: number };

type Value = { type: typeof TYPE_VALUE; data: ValueData } | { type: typeof TYPE_ERROR; data: Error };

export default function createIconSourceCache() {
  const cache = new Map<string, Value>();

  const setValue = (key: string, value: ValueData) => cache.set(key, { type: TYPE_VALUE, data: value });

  const setError = (key: string, error: Error) => cache.set(key, { type: TYPE_ERROR, data: error });

  const has = (key: string) => cache.has(key);

  const get = (key: string) => {
    const value = cache.get(key);
    if (!value) {
      return undefined;
    }

    const { type, data } = value;
    if (type === TYPE_ERROR) {
      throw data;
    }
    return data;
  };

  return { setValue, setError, has, get };
}
