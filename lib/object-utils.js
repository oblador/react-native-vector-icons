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

module.exports = { pick, omit };
