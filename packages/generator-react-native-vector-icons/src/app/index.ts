import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

import Generator from 'yeoman-generator';

import { generateGlyphmap } from './generateGlyphmap.js';

interface Data {
  name: string,
  packageName: string,
  namespace: string,
  className: string,
  fontName: string,
  fontFile: string,
  packageJSON: Record<string, Record<string, string>>,
  customReadme?: boolean,
  customSrc?: boolean,
  customAssets?: boolean,
  buildSteps: {
    preScript?: {
      script: string,
    },
    fixSVGPaths?: {
      location: string,
      keepPostfix?: string,
    },
    fontCustom?: {
      location: string,
      cleanup?: boolean,
    },
    glyphmap?: {
      mode: 'css' | 'codepoints',
      location: string | [string, string][]
      prefix?: string,
      cleanup?: boolean,
    },
    copyFont?: {
      location: string | [string, string][]
    },
    postScript?: {
      script: string,
    },
  },
}

interface Arguments { }

const { uid, gid } = os.userInfo();

export default class extends Generator<Arguments> {
  data: Data;

  constructor(args: string | string[], opts: Arguments) {
    super(args, opts);

    this.data = this._data();
  }

  writing() {
    this._writeTemplates();
  }

  install() {
    this._writePackageJSON();
    this._buildSteps();
  }

  _docker(image: string, args: string[]) {
    const { status } = spawnSync('docker', [
      'run',
      '--rm',
      `--volume=${process.cwd()}:/project`,
      `--volume=${process.cwd()}/../../node_modules:/project/node_modules`,
      `--user=${uid}:${gid}`,
      image,
      ...args,
    ], { stdio: 'inherit' });

    if (status !== 0) {
      throw new Error(`${image} exited with status ${status}`);
    }
  }

  _writeTemplates() {
    const data = this.data;

    const files: Array<string | [string, string]> = [
      'android/build.gradle',
      'android/gradle.properties',
      'android/src/main/AndroidManifestNew.xml',
      'android/src/main/AndroidManifest.xml',
      [
        'android/src/main/java/com/oblador/vectoricons/namespace/RNVIclassNamePackage.java',
        `android/src/main/java/com/oblador/vectoricons/${data.packageName}/RNVI${data.className}Package.java`,
      ],
      [
        'android/src/main/java/com/oblador/vectoricons/namespace/RNVIclassNameModule.java',
        `android/src/main/java/com/oblador/vectoricons/${data.packageName}/RNVI${data.className}Module.java`,
      ],
      [
        'android/src/main/newarch/RNVIclassNameSpec.java',
        `android/src/main/newarch/RNVI${data.className}Spec.java`,
      ],
      [
        'android/src/main/oldarch/RNVIclassNameSpec.java',
        `android/src/main/oldarch/RNVI${data.className}Spec.java`,
      ],
      'babel.config.js',
      'package.json',
      [
        'rnvi-packageName.podspec',
        `rnvi-${data.packageName}.podspec`,
      ],
      'tsconfig.json',
      'turbo.json',
    ];

    if (!data.customSrc) {
      files.push('src/index.ts');
    }

    if (!data.customReadme) {
      files.push('README.md');
    }

    files.forEach((file) => {
      if (typeof file === 'string') {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          data
        )
      } else {
        const [from, to] = file;

        this.fs.copyTpl(
          this.templatePath(from),
          this.destinationPath(to),
          data
        )
      }
    });
  }

  _writePackageJSON() {
    const data = this.data;

    const packageFile = this.destinationPath('package.json');
    const packageJSON = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
    Object.entries(data.packageJSON).forEach(([key, value]) => {
      packageJSON[key] = { ...packageJSON[key], ...value };
    });

    fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 2));
  }

  _buildSteps() {
    this._preScript();
    this._fixSVGPaths();
    this._buildFontCustom();
    this._buildGlyphmap();
    this._copyFont();
    this._postScript();
  }

  _preScript() {
    const { preScript } = this.data.buildSteps;
    if (!preScript) {
      return;
    }

    const { status } = spawnSync('bash', [
      '-c',
      preScript.script
    ], { stdio: 'inherit' });

    if (status !== 0) {
      throw new Error(`preScript exited with status ${status}`);
    }

  }

  _fixSVGPaths() {
    const { fixSVGPaths } = this.data.buildSteps;
    if (!fixSVGPaths) {
      return;
    }

    fs.mkdirSync('fixedSvg');

    const { status } = spawnSync('../../node_modules/.bin/oslllo-svg-fixer', [
      '-s', fixSVGPaths.location,
      '-d', 'fixedSvg',
    ], { stdio: 'inherit' });

    if (status !== 0) {
      throw new Error(`oslllo-svg-fixer exited with status ${status}`);
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
    const data = this.data;

    const { fontCustom } = this.data.buildSteps;
    if (!fontCustom) {
      return;
    }

    const args = [
      'compile',
      fontCustom.location,
      '--templates', 'css',
      '--name', data.className,
      '--force',
      '--no-hash',
    ];

    this._docker('karel3d/fontcustom', args);

    if (!fs.existsSync('fonts')) {
      fs.mkdirSync('fonts');
    }
    fs.renameSync(`${data.className}/${data.className}.ttf`, `fonts/${data.className}.ttf`);
    fs.renameSync(`${data.className}/${data.className}.css`, `${data.className}.css`);

    fs.rmSync(data.className, { recursive: true });
    fs.rmSync('.fontcustom-manifest.json');

    if (fontCustom.cleanup) {
      fs.rmSync(fontCustom.location, { recursive: true });
    }
  }

  _buildGlyphmap() {
    const data = this.data;

    const { glyphmap } = this.data.buildSteps;
    if (!glyphmap) {
      return;
    }

    let locations: [string, string][] = [];
    if (!glyphmap.location) {
      locations.push([`${data.className}.css`, data.fontFile]);
    } else if (typeof glyphmap.location === 'string') {
      locations.push([glyphmap.location, data.fontFile]);
    } else {
      locations = glyphmap.location;
    }

    if (!fs.existsSync('glyphmaps')) {
      fs.mkdirSync('glyphmaps');
    }

    locations.forEach(([from, to]) => {
      const json = generateGlyphmap(glyphmap.mode, [from], glyphmap.prefix)

      fs.writeFileSync(`glyphmaps/${to}.json`, json);

      if (glyphmap.cleanup) {
        fs.rmSync(from);
      }
    });
  }

  _copyFont() {
    const data = this.data;

    const { copyFont } = this.data.buildSteps;
    if (!copyFont) {
      return;
    }

    let locations: [string, string][] = [];
    if (typeof copyFont.location === 'string') {
      locations.push([copyFont.location, data.fontFile]);
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

    const { status } = spawnSync('bash', [
      '-c',
      postScript.script
    ], { stdio: 'inherit' });

    if (status !== 0) {
      throw new Error(`postScript exited with status ${status}`);
    }

  }
  _data() {
    // TODO: Use zod to vaidate the .yo-rc.json data
    const data = this.config.getAll() as Data;
    if (!data.packageName) {
      throw new Error('packageName is required');
    }

    data.name ||= data.packageName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
    data.namespace ||= data.packageName.replaceAll('-', '_');
    data.className ||= data.packageName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
    data.fontName ||= data.packageName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
    data.fontFile ||= data.packageName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
    data.customReadme ||= false;
    data.customSrc ||= false;
    data.customAssets ||= false;

    return data;
  }
};
