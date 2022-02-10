const TYPE_VALUE = 'value';
const TYPE_ERROR = 'error';

export default function createIconSourceCache() {
  const cache = new Map();

  const setValue = (key, value) =>
    cache.set(key, { type: TYPE_VALUE, data: value });

  const setError = (key, error) =>
    cache.set(key, { type: TYPE_ERROR, data: error });

  const has = key => cache.has(key);

  const get = key => {
    if (!cache.has(key)) {
      return undefined;
    }
    const { type, data } = cache.get(key);
    if (type === TYPE_ERROR) {
      throw data;
    }
    return data;
  };

  return { setValue, setError, has, get };
}
