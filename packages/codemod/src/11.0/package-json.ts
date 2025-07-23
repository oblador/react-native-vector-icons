import fs from 'node:fs';

import { getVersion } from '../getVersion';

export default async (pkgs: Set<string>) => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const { dependencies } = packageJson;

  const versionPromises = Array.from(pkgs).map(async (pkg) => {
    if (!dependencies[pkg]) {
      dependencies[pkg] = await getVersion(pkg);
    }
  });

  await Promise.all(versionPromises);

  if (pkgs.size > 0 && dependencies['react-native-vector-icons']) {
    dependencies['react-native-vector-icons'] = undefined;
    dependencies['@react-native-vector-icons/common'] = await getVersion('@react-native-vector-icons/common');
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }
};
