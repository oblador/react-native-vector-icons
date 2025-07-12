const TYPE_VALUE = 'value';
const TYPE_ERROR = 'error';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
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
