import fs from 'node:fs';
import path from 'node:path';
import { resolveNodeModuleDir } from '@react-native-community/cli-tools';

const getPackageJson = (filename: string) => {
  const packageData = fs.readFileSync(filename, 'utf-8');
  const packageJson = JSON.parse(packageData);

  return packageJson;
};

const getPackageFontDirectories = (packageJsonFilename: string) => {
  const rootPackageJson = getPackageJson(packageJsonFilename);
  const dependencies = Object.keys(rootPackageJson.dependencies || {});

  const packageDirs: string[] = [];
  dependencies.forEach((dependency) => {
    const dir = resolveNodeModuleDir(packageJsonFilename, dependency);
    const packageJson = getPackageJson(`${dir}/package.json`);
    if (packageJson.keywords?.includes?.('react-native-vector-icons-icon')) {
      packageDirs.push(`${dir}/fonts`);
    }
  });

  return packageDirs;
};

const getLocalFontsDir = (packageJsonFilename: string) => {
  const rootPackageJson = getPackageJson(packageJsonFilename);
  const config = rootPackageJson.reactNativeVectorIcons || {};

  return `${path.dirname(packageJsonFilename)}/${config.fontDir || 'rnvi-fonts'}`;
};

const getFonts = (fontDir: string) => {
  if (!fs.existsSync(fontDir)) {
    return [];
  }

  const fonts = fs.readdirSync(fontDir);
  const fontPaths = fonts.map((font) => `${fontDir}/${font}`);

  return fontPaths;
};

export const getFontPaths = (packageJsonFilename: string) => {
  const packageDirs = getPackageFontDirectories(packageJsonFilename);
  packageDirs.push(getLocalFontsDir(packageJsonFilename));
  const fonts = packageDirs.map(getFonts);

  return fonts.flat();
};
