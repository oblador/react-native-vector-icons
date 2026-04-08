/**
 * Downloads FontAwesome Pro fonts and places them in rnvi-fonts/ for testing.
 * Renames files to match the fontFileName expected by the library.
 * Requires a FontAwesome npm token (https://fontawesome.com/account).
 *
 * Usage: tsx scripts/fetch-pro-fonts.ts
 */

import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const root = join(__dirname, '..');
const packagesDir = join(root, '..', '..', 'packages');

function ensureAuthToken(): Promise<void> {
  const config = execSync('npm config get', { encoding: 'utf8' });
  if (config.includes('//npm.fontawesome.com/:_authToken')) {
    return Promise.resolve();
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question('Please enter your FontAwesome npm token: ', (token) => {
      rl.close();
      execSync(`npm config set '//npm.fontawesome.com/:_authToken' '${token.trim()}'`);
      resolve();
    }),
  );
}

/**
 * Read the PostScript name from a .ttf file using fontTools (python3).
 */
function getPostScriptName(ttfPath: string): string | null {
  try {
    const result = execSync(
      `python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('${ttfPath}')
for r in font['name'].names:
    if r.nameID == 6 and r.platformID == 3:
        print(r.toUnicode())
        break
"`,
      { encoding: 'utf8' },
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}

interface StyleMeta {
  family: string;
  name: string;
  weight: number;
}

/**
 * Build a mapping from PostScript name -> expected fontFileName
 * by reading the .yo-rc.json of the target package.
 */
function buildPostScriptToFileNameMap(packageName: string): Record<string, string> {
  const yoRcPath = join(packagesDir, packageName, '.yo-rc.json');
  const yoRc = JSON.parse(readFileSync(yoRcPath, 'utf8'));
  const styles: Record<string, StyleMeta> = yoRc['generator-react-native-vector-icons'].meta.styles;

  const map: Record<string, string> = {};
  for (const { family, name } of Object.values(styles)) {
    // family is the PostScript name (e.g. "FontAwesome6Pro-Solid")
    map[family] = name;
  }
  return map;
}

function fetchAndExtract(version: number, packageName: string, dest: string): void {
  const tmp = mkdtempSync(join(tmpdir(), `fa-pro-v${version}-`));
  try {
    console.log(`Fetching @fortawesome/fontawesome-pro@^${version}...`);
    execSync(`npm config set '@fortawesome:registry' https://npm.fontawesome.com/`);
    const archive = execSync(`npm pack @fortawesome/fontawesome-pro@^${version} --silent`, {
      cwd: tmp,
      encoding: 'utf8',
    }).trim();
    execSync(`tar -xzf ${archive} --strip-components=1`, { cwd: tmp });

    const psNameToFileName = buildPostScriptToFileNameMap(packageName);
    const webfonts = join(tmp, 'webfonts');
    const destPath = join(root, dest);
    mkdirSync(destPath, { recursive: true });

    const fonts = readdirSync(webfonts).filter((f) => f.endsWith('.ttf'));
    for (const font of fonts) {
      const srcPath = join(webfonts, font);
      const psName = getPostScriptName(srcPath);
      if (!psName) {
        console.log(`  skipping ${font} (could not read PostScript name)`);
        continue;
      }

      const targetName = psNameToFileName[psName];
      if (!targetName) {
        console.log(`  skipping ${font} (${psName} not in ${packageName})`);
        continue;
      }

      cpSync(srcPath, join(destPath, targetName));
      console.log(`  ${font} -> ${dest}/${targetName}`);
    }
  } finally {
    rmSync(tmp, { recursive: true });
  }
}

async function main() {
  await ensureAuthToken();
  fetchAndExtract(5, 'fontawesome5-pro', 'rnvi-fonts/fontawesome5-pro');
  fetchAndExtract(6, 'fontawesome6-pro', 'rnvi-fonts/fontawesome6-pro');
  console.log('Done.');
}

main();
