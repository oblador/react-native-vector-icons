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
  dependencies: Record<string, string>;
  upstreamFont?: string | { registry?: string; packageName: string; versionRange: string; versionOnly?: boolean };
  packageJSON?: Record<string, Record<string, string>>;
  versionSuffix?: string;
  customReadme?: boolean;
  customSrc?: string | boolean;
  source: string;
  customAssets?: boolean;
  commonPackage?: string;
  meta: Record<string, object>;
  buildSteps: {
    preScript?: {
      script: string;
    };
    fixSVGPaths?: {
      location: string;
      keepPostfix?: string;
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
}

const { uid, gid } = os.userInfo();

type Arguments = BaseOptions & {
  currentVersion: string;
};

export default class extends Generator<Arguments> {
  data: Data;

  constructor(args: string | string[], opts: Arguments) {
    super(args, opts);

    this.option('current-version', { type: String, description: 'Current package version' });

    this.data = this._data();
  }

  writing() {
    this._writeTemplates();
  }

  install() {
    return this._writePackageJSON();
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
    ];

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

  async _writePackageJSON() {
    const { data } = this;

    const packageFile = this.destinationPath('package.json');
    const packageJSON = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

    let packageName = '';
    let version: string;
    let versionOnly = false;
    if (typeof data.upstreamFont === 'object') {
      const registry = data.upstreamFont.registry ?? 'https://registry.npmjs.org';
      packageName = data.upstreamFont.packageName;
      const versionRange = data.upstreamFont.versionRange || '*';
      versionOnly = data.upstreamFont.versionOnly || false;
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
    } else if (typeof data.upstreamFont === 'string') {
      const packageInfo = await npmFetch.json(`https://registry.npmjs.org/${data.upstreamFont}/latest`);
      version = packageInfo.version as string;
      packageName = data.upstreamFont;
    } else {
      version = '0.0.1';
    }

    const { currentVersion } = this.options;
    let versionSuffix = '';
    if (currentVersion && data.versionSuffix && currentVersion.match(data.versionSuffix)) {
      const preRelease = currentVersion.split(data.versionSuffix)[1];
      versionSuffix = `${data.versionSuffix}${preRelease}`;
    } else {
      versionSuffix = data.versionSuffix ? `${data.versionSuffix}.1` : '';
    }

    packageJSON.version = `${version}${versionSuffix}`;

    const commonPackageFile = this.destinationPath('../common/package.json');
    const commonPackageJSON = JSON.parse(fs.readFileSync(commonPackageFile, 'utf8'));

    packageJSON.dependencies['@react-native-vector-icons/common'] = `^${commonPackageJSON.version}`;

    if (data.dependencies) {
      Object.entries(data.dependencies).forEach(([depName, depVersion]) => {
        if (!depName.startsWith('@react-native-vector-icons')) {
          packageJSON.dependencies[depName] = depVersion;

          return;
        }

        const dep = depName.split('/')[1];

        const depFile = this.destinationPath(`../${dep}/package.json`);
        const depJSON = JSON.parse(fs.readFileSync(depFile, 'utf8'));

        packageJSON.dependencies[depName] = `^${depJSON.version}`;
      });
    }

    if (!versionOnly && packageName) {
      packageJSON.devDependencies[packageName] = version;
    }

    fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 2));
  }

  _buildSteps() {
    this._preScript();
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

  _fixSVGPaths() {
    const { fixSVGPaths } = this.data.buildSteps;
    if (!fixSVGPaths) {
      return;
    }

    fs.mkdirSync('fixedSvg');

    const { exitCode } = this.spawnSync(
      '../../node_modules/.bin/oslllo-svg-fixer',
      ['-s', fixSVGPaths.location, '-d', 'fixedSvg'],
      { stdio: 'inherit' },
    );

    if (exitCode !== 0) {
      throw new Error(`oslllo-svg-fixer exited with exitCode ${exitCode}`);
    }

    const { keepPostfix } = fixSVGPaths;
    if (keepPostfix) {
      const files = fs.readdirSync('fixedSvg');
      files.forEach((file) => {
        if (!file.endsWith(`${keepPostfix}.svg`)) {
          // Delete files that do not end with -16.svg
          fs.unlinkSync(path.join('fixedSvg', file));

          return;
        }
        const newName = file.replace(keepPostfix, '');
        fs.renameSync(path.join('fixedSvg', file), path.join('fixedSvg', newName));
      });
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

    let locations: [string, string][] = [];
    if (typeof copyFont.location === 'string') {
      locations.push([copyFont.location, data.fontFileName]);
    } else {
      locations = copyFont.location;
    }

    locations.forEach(([from, to]) => fs.cpSync(from, `fonts/${to}.ttf`));
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
    if (!data.packageName) {
      throw new Error('packageName is required');
    }

    data.name ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(' ');
    data.buildSteps ||= {};
    data.className ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');
    data.postScriptName ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');
    data.fontFileName ||= data.packageName
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('');
    data.customReadme ||= false;
    data.customAssets ||= false;
    data.commonPackage ||= 'common';
    data.source = './src/index.ts';
    if (typeof data.customSrc === 'string') {
      data.source = data.customSrc.endsWith('.tsx') ? './src/index.tsx' : './src/index.ts';
    }

    return data;
  }
}
