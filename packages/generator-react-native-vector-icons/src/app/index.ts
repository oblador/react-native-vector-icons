import Generator from 'yeoman-generator';

interface TemplateData {
  packageName: string,
  name?: string,
  shortName?: string,
  className?: string,
  fontName?: string,
}

export default class extends Generator {
  _templateData () {
    const templateData = this.config.getAll() as TemplateData;
    if (!templateData.packageName) {
      throw new Error('packageName is required');
    }

    //   name: name || iconName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
    //   iconName,
    //   shortName: shortName || iconName.replace(/-/g, '_'),
    //   className: className || iconName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(''),
    //   fontName: fontName || iconName.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(''),
    // };
    return templateData;
  }

  writing() {
    const templateData = this._templateData();

    const files: Array<string | [string, string]> = [
      'README.md',
      'android/build.gradle',
      'android/gradle.properties',
      'android/src/main/AndroidManifestNew.xml',
      'android/src/main/AndroidManifest.xml',
      [
        'android/src/main/java/com/oblador/vectoricons/shortName/ClassNameVectorIconsPackage.java',
        `android/src/main/java/com/oblador/vectoricons/${templateData.packageName}/${templateData.className}VectorIconsPackage.java`,
      ],
      'package.json',
      [
        'rnvi-shortName.podspec',
        `rnvi-${templateData.shortName}.podspec`,
      ],
      'src/index.ts',
      'tsconfig.json',
    ];

    files.forEach((file) => {
      if (typeof file === 'string') {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(`packages/${templateData.packageName}/${file}`),
          templateData
        )
      } else {
        const [from, to] = file;

        this.fs.copyTpl(
          this.templatePath(from),
          this.destinationPath(`packages/${templateData.packageName}/${to}`),
          templateData
        )
      }
    });

  }

  install() {
  }
};
