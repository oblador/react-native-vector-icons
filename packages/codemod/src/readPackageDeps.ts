import fs from 'node:fs';
import path from 'node:path';

type Result =
  | {
      dependencies: Record<string, string>;
      error: null;
    }
  | {
      dependencies: null;
      error: Error;
    };

export const readPackageDeps = (dir: string): Result => {
  try {
    const packageJsonPath = path.join(dir, 'package.json');
    const { dependencies: pkgDependencies } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {
      dependencies: Record<string, string>;
    };

    return {
      dependencies: pkgDependencies || {},
      error: null,
    };
  } catch (err) {
    return { dependencies: null, error: err as Error };
  }
};
