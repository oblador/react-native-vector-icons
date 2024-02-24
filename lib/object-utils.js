const pick = (obj, ...keys) =>
  keys
    .flat()
    .filter(key => Object.prototype.hasOwnProperty.call(obj, key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

const omit = (obj, ...keysToOmit) => {
  const keysToOmitSet = new Set(keysToOmit.flat());
  return Object.getOwnPropertyNames(obj)
    .filter(key => !keysToOmitSet.has(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

const getMIStyleFromCodepointsFile = filePath => {
  return filePath
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .replace('MaterialIcons_', '')
    .replace('.codepoints', '')
    .toLowerCase();
};

module.exports = { pick, omit, getMIStyleFromCodepointsFile };
