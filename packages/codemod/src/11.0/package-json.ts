import fs from 'node:fs';

const getVersion = async (pkg: string) => {
  const packageJson = await fetch(`https://registry.npmjs.org/${pkg}/latest`).then(
    (res) => res.json() as unknown as { version: string },
  );
  return `^${packageJson.version}`;
};

export default async (pkgs: Set<string>) => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const { dependencies } = packageJson;

  pkgs.forEach(async (pkg) => {
    if (!dependencies[pkg]) {
      dependencies[pkg] = await getVersion(pkg);
    }
  });

  if (pkgs.size > 0 && dependencies['react-native-vector-icons']) {
    dependencies['react-native-vector-icons'] = undefined;
    dependencies['@react-native-vector-icons/common'] = await getVersion('@react-native-vector-icons/common');
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }
};
