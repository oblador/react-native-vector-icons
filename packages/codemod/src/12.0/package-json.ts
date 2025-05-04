import fs from 'node:fs';

export default () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  const { dependencies } = packageJson;

  if (dependencies['@react-native-vector-icons/common']) {
    dependencies['@react-native-vector-icons/common'] = undefined;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }
};
