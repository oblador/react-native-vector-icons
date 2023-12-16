#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { resolveNodeModuleDir } from '@react-native-community/cli-tools';

const rootDir = process.argv[2];
if (!rootDir) {
  throw new Error('Need rootDir as first argument');
}

const getPackageJson = (dir: string) => {
  const packageData = fs.readFileSync(path.join(dir, 'package.json'), 'utf-8');
  const packageJson = JSON.parse(packageData);

  return packageJson;
};

const getVectorIconsPackages = () => {
  const rootPackageJson = getPackageJson(rootDir);
  const dependencies = Object.keys(rootPackageJson.dependencies || {});

  const packageDirs: string[] = [];
  dependencies.forEach((dependency) => {
    const dir = resolveNodeModuleDir(rootDir, dependency);
    const packageJson = getPackageJson(dir);
    if (packageJson.keywords?.includes?.('react-native-vector-icons-icon')) {
      packageDirs.push(dir);
    }
  });
  return packageDirs;
};

const packageDirs = getVectorIconsPackages();
packageDirs.forEach((dir) => console.log(dir));
