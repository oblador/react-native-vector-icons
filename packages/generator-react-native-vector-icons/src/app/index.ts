import fs from 'node:fs';
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
  dependencies: Record<string, string>,
  buildSteps: {
    fontCustom?: {
      location: string,
    },
    glyphmap?: {
      mode: 'css' | 'codepoints',
      location: string,
      cleanup?: boolean,
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
      'README.md',
      [
        'rnvi-packageName.podspec',
        `rnvi-${data.packageName}.podspec`,
      ],
      'src/index.ts',
      'tsconfig.json',
      'turbo.json',
    ];

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

    packageJSON.dependencies = { ...packageJSON.dependencies, ...data.dependencies };

    fs.writeFileSync(packageFile, JSON.stringify(packageJSON, null, 2));
  }

  _buildSteps() {
    this._buildFontCustom();

    this._buildGlyphmap();
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

    fs.renameSync(`${data.className}/${data.className}.ttf`, `fonts/${data.className}.ttf`);
    fs.renameSync(`${data.className}/${data.className}.css`, `${data.className}.css`);

    fs.rmSync(data.className, { recursive: true });
    fs.rmSync('.fontcustom-manifest.json');
  }

  _buildGlyphmap() {
    const data = this.data;

    const { glyphmap } = this.data.buildSteps;
    if (!glyphmap) {
      return;
    }

    const json = generateGlyphmap(glyphmap.mode, [glyphmap.location]);

    fs.writeFileSync(`glyphmaps/${data.fontFile}.json`, json);

    if (glyphmap.cleanup) {
      fs.rmSync(glyphmap.location);
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

    return data;
  }
};
