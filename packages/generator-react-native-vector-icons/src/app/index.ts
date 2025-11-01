/* eslint-disable no-underscore-dangle,import/no-unresolved */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import npmFetch from 'npm-registry-fetch';
import getAuthToken from 'registry-auth-token';
import semver from 'semver';
import Generator, { type BaseOptions } from 'yeoman-generator';

import { generateGlyphmap } from './generateGlyphmap.js';

interface Data {
  name: string;
  packageName: string;
  className: string;
  postScriptName: string;
  fontFileName: string;
  androidName: string;
  dependencies: Record<string, string>;
  upstreamFont?: string | { registry?: string; packageName: string; versionRange: string; versionOnly?: boolean };
  packageJSON?: Record<string, Record<string, string>>;
  versionSuffix?: string;
  customReadme?: boolean;
  customSrc?: string | boolean;
  copyCustomFonts?: boolean;
  source: string;
  customAssets?: boolean;
  commonPackage?: string;
  noGlyphmap?: boolean;
  extraExports: string;
  meta: Record<string, object>;
  buildSteps: {
    preScript?: {
      script: string;
    };
    renameSVGs?: {
      location: string;
      keepPostfix?: string;
    };
    fixSVGPaths?: {
      location: string;
      cleanup?: boolean;
    };
    fontCustom?: {
      location: string;
      cleanup?: boolean;
    };
    glyphmap?: {
      mode: 'css' | 'codepoints';
      location: string | [string, string][];
      prefix?: string;
      cleanup?: boolean;
    };
    copyFont?: {
      location: string | [string, string][];
    };
    fontforgeScript?: {
      script: string;
    };
    postScript?: {
      script: string;
    };
  };
  versions?: { rnvi: string; upstream: string }[];
  versionTable?: string;
}

const { uid, gid } = os.userInfo();

type Arguments = BaseOptions & {
  currentVersion: string;
};

export default class extends Generator<Arguments> {
  data: Data;

  constructor(args: string | string[], opts: Arguments) {
    super(args, opts, { customInstallTask: true });

    this.option('current-version', { type: String, description: 'Current package version' });

    this.data = this._data();
  }

  async writing() {
    this._writeTemplates();
    await this._fixPackageVersion();
    await this._addFontDependencies();
    await this._addDependencies();
  }

  async install() {
    this.spawnSync('pnpm', ['install', '--filter', '.', '--ignore-scripts']);
  }

  end() {
    this._buildSteps();
  }

  _docker(image: string, args: string[], options: string[] = []) {
    const { exitCode } = this.spawnSync(
      'docker',
      [
        'run',
        '--rm',
        `--volume=${process.cwd()}:/usr/src/app`,
        `--volume=${process.cwd()}/../../node_modules:/usr/src/app/node_modules`,
        `--user=${uid}:${gid}`,
        '--env=SOURCE_DATE_EPOCH=1702622477', // TODO: Should we use something more sensible as the date for the fonts
        ...options,
        image,
        ...args,
      ],
      { stdio: 'inherit' },
    );

    if (exitCode !== 0) {
      throw new Error(`${image} exited with exitCode ${exitCode}`);
    }
  }

  _writeTemplates() {
    const { data } = this;

    const files: Array<string | [string, string]> = [
      'package.json',
      'tsconfig.json',
      'tsconfig.build.json',
      'babel.config.js',
      'android/build.gradle',
      'android/src/main/AndroidManifestNew.xml',
      'android/src/main/AndroidManifest.xml',
    ];
    files.push(['android/src/main/java/Package.kt', `android/src/main/java/VectorIcons${data.className}Package.kt`]);

    files.push(['font.podspec', `react-native-vector-icons-${data.packageName}.podspec`]);

    if (data.customSrc === true) {
      // Do nothing
    } else if (data.customSrc) {
      files.push([data.customSrc, data.customSrc.endsWith('.tsx') ? 'src/index.tsx' : 'src/index.ts']);
    } else {
      files.push('src/index.ts');
    }

    if (!data.customReadme) {
      files.push('README.md');
    }

    files.forEach((file) => {
      if (typeof file === 'string') {
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), data);
      } else {
        const [from, to] = file;

        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), data);
      }
    });
  }

  async _fixPackageVersion() {
    this.fs.extendJSON(this.destinationPath('package.json'), { version: this.options.currentVersion });
  }

  async _addFontDependencies() {
    const { data } = this;

    if (!data.upstreamFont) {
      return;
    }

    if (typeof data.upstreamFont === 'string') {
      const packageInfo = (await npmFetch.json(`https://registry.npmjs.org/${data.upstreamFont}/latest`)) as {
        version: string;
      };
      await this.addDevDependencies({ [data.upstreamFont]: packageInfo.version });

      return;
    }

    if (data.upstreamFont?.versionOnly) {
      return;
    }

    const packageName = typeof data.upstreamFont === 'object' ? data.upstreamFont.packageName : data.upstreamFont;
    let version = this.options.currentVersion;

    const versionOnly = data.upstreamFont.versionOnly || false;
    if (versionOnly) {
      return;
    }

    const registry = data.upstreamFont.registry ?? 'https://registry.npmjs.org';
    const versionRange = data.upstreamFont.versionRange || '*';
    const authToken = getAuthToken(registry.replace(/^https?:/, ''));

    const packageInfo = await npmFetch.json(`${registry}/${packageName}`, {
      forceAuth: { _authToken: authToken?.token },
    });
    const versions = Object.keys(packageInfo.versions as string[]);
    const possibleVersion = semver.maxSatisfying(versions, versionRange);
    if (!possibleVersion) {
      throw new Error(`Invalid upstreamFont ${data.upstreamFont}: no matching version`);
    }
    version = possibleVersion;

    await this.addDevDependencies({ [packageName]: version });
  }

  async _addDependencies() {
    const { data } = this;

    if (!data.dependencies) {
      return;
    }

    Object.entries(data.dependencies).forEach(async ([depName, depVersion]) => {
      await this.addDependencies({ [depName]: depVersion as string });
    });
  }

  _buildSteps() {
    this._preScript();
    this._renameSVGs();
    this._fixSVGPaths();
    this._buildFontCustom();
    this._buildGlyphmap();
    this._copyFont();
    this._fontForgeScript();
    this._postScript();
  }

  _preScript() {
    const { preScript } = this.data.buildSteps;
    if (!preScript) {
      return;
    }

    const { exitCode } = this.spawnSync('bash', ['-c', preScript.script], { stdio: 'inherit' });

    if (exitCode !== 0) {
      throw new Error(`preScript exited with exitCode ${exitCode}`);
    }
  }

  _renameSVGs() {
    const { renameSVGs } = this.data.buildSteps;
    if (!renameSVGs) {
      return;
    }
    const { keepPostfix, location } = renameSVGs;

    fs.mkdirSync('renamedSVGs');

    if (keepPostfix) {
      const files = fs.readdirSync(location);
      files.forEach((file) => {
        if (file.endsWith(`${keepPostfix}.svg`)) {
          // Delete files that do not end with -16.svg
          fs.copyFileSync(path.join(location, file), path.join('renamedSVGs', file.replace(keepPostfix, '')));
        }
      });
    }
  }

  _fixSVGPaths() {
    const { fixSVGPaths } = this.data.buildSteps;
    if (!fixSVGPaths) {
      return;
    }

    fs.mkdirSync('fixedSvg');

    const location = fixSVGPaths.cleanup ? 'renamedSVGs' : fixSVGPaths.location;

    const { exitCode } = this.spawnSync(
      '../../node_modules/.bin/oslllo-svg-fixer',
      ['-s', location, '-d', 'fixedSvg'],
      { stdio: 'inherit' },
    );

    if (exitCode !== 0) {
      throw new Error(`oslllo-svg-fixer exited with exitCode ${exitCode}`);
    }

    if (fixSVGPaths.cleanup) {
      fs.rmSync('renamedSVgs', { recursive: true });
    }
  }

  _buildFontCustom() {
    const { data } = this;

    const { fontCustom } = this.data.buildSteps;
    if (!fontCustom) {
      return;
    }

    const args = [
      'compile',
      fontCustom.location,
      '--templates',
      'css',
      '--name',
      data.className,
      '--force',
      '--no-hash',
    ];

    this._docker('johnf/fontcustom', args);

    if (!fs.existsSync('fonts')) {
      fs.mkdirSync('fonts');
    }
    fs.renameSync(`${data.className}/${data.className}.ttf`, `fonts/${data.className}.ttf`);
    fs.renameSync(`${data.className}/${data.className}.css`, `${data.className}.css`);

    fs.rmSync(data.className, { recursive: true });

    if (fontCustom.cleanup) {
      fs.rmSync(fontCustom.location, { recursive: true });
    }
  }

  _fontForgeScript() {
    const { data } = this;

    const { fontforgeScript } = this.data.buildSteps;
    if (!fontforgeScript) {
      return;
    }

    const options = [
      '--entrypoint=/usr/local/bin/fontforge',
      `--volume=${process.cwd()}/../../node_modules/generator-react-native-vector-icons/generators/app/fontforge/${fontforgeScript.script}:/script.py`,
    ];

    const args = ['-script', '/script.py', `fonts/${data.className}.ttf`];

    this._docker('johnf/fontcustom', args, options);
  }

  _buildGlyphmap() {
    const { data } = this;

    const { glyphmap } = this.data.buildSteps;
    if (!glyphmap) {
      return;
    }

    let locations: [string, string][] = [];
    if (!glyphmap.location) {
      locations.push([`${data.className}.css`, data.fontFileName]);
    } else if (typeof glyphmap.location === 'string') {
      locations.push([glyphmap.location, data.className]);
    } else {
      locations = glyphmap.location;
    }

    if (!fs.existsSync('glyphmaps')) {
      fs.mkdirSync('glyphmaps');
    }

    locations.forEach(([from, to]) => {
      const json = generateGlyphmap(glyphmap.mode, from, glyphmap.prefix);

      fs.writeFileSync(`glyphmaps/${to}.json`, json);

      if (glyphmap.cleanup) {
        fs.rmSync(from);
      }
    });
  }

  _copyFont() {
    const { data } = this;

    const { copyFont } = this.data.buildSteps;
    if (!copyFont) {
      return;
    }

    if (!fs.existsSync('fonts')) {
      fs.mkdirSync('fonts');
    }

    let locations: [string, string][] = [];
    if (typeof copyFont.location === 'string') {
      locations.push([copyFont.location, data.fontFileName]);
    } else {
      locations = copyFont.location;
    }

    locations.forEach(([from, to]) => {
      if (from.endsWith('.ttf')) {
        fs.cpSync(from, `fonts/${to}.ttf`);

        return;
      }

      if (from.endsWith('.woff2')) {
        const { exitCode } = this.spawnSync('woff2_decompress', [from], { stdio: 'inherit' });

        if (exitCode !== 0) {
          throw new Error(`woff2_decompress exited with exitCode ${exitCode}`);
        }

        fs.renameSync(from.replace(/\.woff2$/, '.ttf'), `fonts/${to}.ttf`);

        return;
      }

      throw new Error(`Unsupported font format: ${from}`);
    });
  }

  _postScript() {
    const { postScript } = this.data.buildSteps;
    if (!postScript) {
      return;
    }

    const { exitCode } = this.spawnSync('bash', ['-c', postScript.script], { stdio: 'inherit' });

    if (exitCode !== 0) {
      throw new Error(`postScript exited with exitCode ${exitCode}`);
    }
  }

  _data() {
    // TODO: Use zod to vaidate the .yo-rc.json data
    const data = this.config.getAll() as unknown as Data;
    // ant-design
    if (!data.packageName) {
      throw new Error('packageName is required');
    }

    // Ant Design
    data.name ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(' ');
    // AntDesign
    data.className ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');
    // AntDesign
    data.postScriptName ||= data.className;
    data.fontFileName ||= data.className;
    // ant_design
    data.androidName = data.packageName.replaceAll('-', '_');

    data.buildSteps ||= {};
    data.customReadme ||= false;
    data.customAssets ||= false;
    data.copyCustomFonts ||= false;
    data.commonPackage ||= 'common';
    data.source = './src/index.ts';
    if (typeof data.customSrc === 'string') {
      data.source = data.customSrc.endsWith('.tsx') ? './src/index.tsx' : './src/index.ts';
    }

    if (data.versions) {
      const versionTable: string[] = [];
      data.versions.forEach((version) => {
        versionTable.push(`| > ${version.rnvi} | ${version.upstream} |`);
      });

      data.versionTable = versionTable.join('\n');
    }

    const extraExports = [];
    if (!data.noGlyphmap) {
      extraExports.push('"./glyphmaps/*.json": "./glyphmaps/*.json"');
    }

    if (!data.copyCustomFonts) {
      extraExports.push('"./fonts/*.ttf": "./fonts/*.ttf"');
    }

    data.extraExports = extraExports.length === 0 ? '' : `,\n    ${extraExports.join(',\n    ')}`;

    return data;
  }
}
