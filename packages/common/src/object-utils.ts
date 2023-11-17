export const pick = (obj: Record<string, any>, ...keys: string[]) =>
  keys
    .flat()
    .filter((key) => Object.prototype.hasOwnProperty.call(obj, key))
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<string, object | undefined>
    );

export const omit = (obj: Record<string, any>, ...keysToOmit: string[]) => {
  const keysToOmitSet = new Set(keysToOmit.flat());

  return Object.getOwnPropertyNames(obj)
    .filter((key) => !keysToOmitSet.has(key))
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<string, object | undefined>
    );
};
