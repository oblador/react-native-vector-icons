export const getVersion = async (pkg: string) => {
  const packageJson = await fetch(`https://registry.npmjs.org/${pkg}/latest`).then(
    (res) => res.json() as unknown as { version: string },
  );
  return `^${packageJson.version}`;
};
