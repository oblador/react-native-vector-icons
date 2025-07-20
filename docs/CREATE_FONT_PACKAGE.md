# Creating a font package

You can create a new font package either via a PR to this repository or by publishing your own font package on NPM.

We use a yeoman generator to fully automate the generation the fonts from a configuration file.

In the future the idea is to automate this to automatically release new fonts in line with upstream.

Below we describe how to create a font in this monorepo, the process for creating your own package would be quite similar.

> **Note**: Before contributing a new font package, please read our [Contributing Guidelines](../CONTRIBUTING.md) and follow the [development workflow](../CONTRIBUTING.md#development-workflow) described there.

## Quick Start

1. **Set up development environment** (see [CONTRIBUTING.md](../CONTRIBUTING.md#development-workflow)):
   ```sh
   pnpm install
   ```

2. **Create font package directory and config**:
   ```sh
   mkdir packages/my-font
   vi packages/my-font/.yo-rc.json
   git add packages/my-font/.yo-rc.json
   ```

3. **Generate the font package**:
   ```sh
   # Generate single font
   pnpm generate my-font
   
   # Or generate all fonts
   pnpm generate
   ```

## Configuration Reference

The `.yo-rc.json` file contains all configuration for the font package generation. Here's the complete structure:

For most fonts you should be able to set the packageName and most other variaables will be derived from them, but you can adjust with the optional propertires when necessary.

### Required Properties

#### packageName
- **Type**: `string`
- **Description**: The name of the node package and directory name
- **Example**: `"material-symbols"`
- **Note**: Currently assumes package will live in `@react-native-vector-icons` namespace

### Optional Properties

#### name
- **Type**: `string`
- **Description**: The name in capitalised sentence from
- **Default**: Title Case of packageName
- **Example**: `"Material Symbols"` (from `material-symbols`)

#### className
- **Type**: `string`
- **Description**: Class name for generated components
- **Default**: PascalCase of packageName
- **Example**: `"MaterialSymbols"` (from `material-symbols`)

#### postScriptName
- **Type**: `string`
- **Description**: PostScript name for the font
- **Default**: Same as className
- **Example**: `"MaterialSymbols"`

#### fontFileName
- **Type**: `string`
- **Description**: Base filename for generated fonts
- **Default**: Same as className
- **Example**: `"MaterialSymbols"`

#### upstreamFont
- **Type**: `string | object`
- **Description**: The upstream font package dependency where the font comes from a node module
- **String format**: `"package-name"` - fetches latest version from npm
- **Object format**:
  ```json
  {
    "packageName": "@fortawesome/fontawesome-free",
    "versionRange": "^6",
    "registry": "https://registry.npmjs.org",
    "versionOnly": false
  }
  ```

#### customSrc
- **Type**: `string | boolean`
- **Description**: Path to custom source template or `true` to skip generation
- **Example**: `"../../../../fontawesome-common/generators/app/templates/src/index.tsx"`

#### customReadme
- **Type**: `boolean`
- **Description**: Skip README.md generation
- **Default**: `false`

#### copyCustomFonts
- **Type**: `boolean`
- **Description**: Copy custom font files instead of generating
- **Default**: `false`

#### commonPackage
- **Type**: `string`
- **Description**: Path to common package for shared functionality
- **Default**: `"common"`
- **Example**: `"fontawesome-common/fontawesome6"`

#### meta
- **Type**: `object`
- **Description**: Metadata for multi-style fonts
- **Example**:
  ```json
  {
    "defaultStyleName": "regular",
    "styleNames": ["regular", "solid", "brand"],
    "styles": {
      "regular": {
        "family": "FontAwesome6Free-Regular",
        "name": "FontAwesome6_Regular.ttf",
        "weight": 400
      }
    }
  }
  ```

#### versions
- **Type**: `array`
- **Description**: Version history tracking. Updated when a new upstream font version is released.
- **Example**:
  ```json
  [
    { "rnvi": "12.0.0", "upstream": "4.29.2" },
    { "rnvi": "12.0.1", "upstream": "4.30.0" }
  ]
  ```

### Build Steps

The `buildSteps` object defines the font generation pipeline. Steps are executed in this order:

#### preScript
Execute shell commands before font generation
```json
{
  "preScript": {
    "script": "mkdir -p fonts\ncurl https://example.com/font.ttf > fonts/font.ttf"
  }
}
```

#### renameSVGs
Rename and filter SVG files
```json
{
  "renameSVGs": {
    "location": "../../node_modules/@primer/octicons/build/svg",
    "keepPostfix": "-16"
  }
}
```
- **location**: Source directory containing SVGs
- **keepPostfix**: Only keep files ending with this postfix, remove it from output

#### fixSVGPaths
Fix SVG path issues using oslllo-svg-fixer
```json
{
  "fixSVGPaths": {
    "location": "../../node_modules/ionicons/dist/svg",
    "cleanup": true
  }
}
```
- **location**: Source directory or `"renamedSVGs"` if after renameSVGs
- **cleanup**: Remove source directory after processing

#### fontCustom
Generate font TTF from SVGs using FontCustom
```json
{
  "fontCustom": {
    "location": "fixedSvg",
    "cleanup": true
  }
}
```
- **location**: Directory containing SVG files
- **cleanup**: Remove source directory after processing

#### fontforgeScript
Run FontForge script for font post-processing
```json
{
  "fontforgeScript": {
    "script": "correct-direction.py"
  }
}
```
- **script**: Script name in the generator's fontforge directory

#### glyphmap
Generate icon mapping files
```json
{
  "glyphmap": {
    "mode": "css",
    "location": "FontAwesome.css",
    "prefix": ".fa-",
    "cleanup": true
  }
}
```
- **mode**: `"css"` or `"codepoints"`
- **location**: Source file or array of `[source, output]` pairs
- **prefix**: CSS class prefix (css mode only)
- **cleanup**: Remove source files after processing

#### copyFont
Copy existing font files
```json
{
  "copyFont": {
    "location": "../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf"
  }
}
```
- **location**: Source file path or array of `[source, output]` pairs

#### postScript
Execute shell commands after font generation
```json
{
  "postScript": {
    "script": "node ../scripts/generate-metadata.js"
  }
}
```

## Configuration Examples

### SVG to Font Generation (Feather Icons)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "feather",
    "upstreamFont": "feather-icons",
    "buildSteps": {
      "fontCustom": {
        "location": "node_modules/feather-icons/dist/icons"
      },
      "glyphmap": {
        "mode": "css",
        "cleanup": true
      }
    },
    "versions": [{ "rnvi": "12.0.0", "upstream": "4.29.2" }]
  }
}
```

### CSS-based Font (FontAwesome)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "fontawesome",
    "postScriptName": "FontAwesome",
    "fontFileName": "FontAwesome",
    "className": "FontAwesome",
    "upstreamFont": "font-awesome",
    "buildSteps": {
      "glyphmap": {
        "location": "../../node_modules/font-awesome/css/font-awesome.css",
        "mode": "css",
        "prefix": ".fa-"
      },
      "copyFont": {
        "location": "../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf"
      }
    },
    "versions": [{ "rnvi": "12.0.0", "upstream": "4.7.0" }]
  }
}
```

### Codepoints-based Font (Material Icons)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "material-icons",
    "postScriptName": "MaterialIcons-Regular",
    "buildSteps": {
      "preScript": {
        "script": "mkdir -p fonts\nREF='f7bd4f25f3764883717c09a1fd867f560c9a9581'\ncurl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.codepoints -Ls > MaterialIcons-Regular.codepoints\ncurl https://raw.githubusercontent.com/google/material-design-icons/$REF/font/MaterialIcons-Regular.ttf -Ls > fonts/MaterialIcons.ttf"
      },
      "glyphmap": {
        "location": "MaterialIcons-Regular.codepoints",
        "mode": "codepoints",
        "prefix": ".mdi-",
        "cleanup": true
      }
    },
    "versions": [{ "rnvi": "12.0.0", "upstream": "0.0.1" }]
  }
}
```

### Multi-style Font (FontAwesome 6)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "fontawesome6",
    "className": "FontAwesome6",
    "commonPackage": "fontawesome-common/fontawesome6",
    "customSrc": "../../../../fontawesome-common/generators/app/templates/src/index.tsx",
    "customReadme": true,
    "upstreamFont": {
      "packageName": "@fortawesome/fontawesome-free",
      "versionRange": "^6"
    },
    "meta": {
      "defaultStyleName": "regular",
      "styleNames": ["regular", "solid", "brand"],
      "styles": {
        "regular": {
          "family": "FontAwesome6Free-Regular",
          "name": "FontAwesome6_Regular.ttf",
          "weight": 400
        },
        "solid": {
          "family": "FontAwesome6Free-Solid",
          "name": "FontAwesome6_Solid.ttf",
          "weight": 900
        },
        "brand": {
          "family": "FontAwesome6Brands-Regular",
          "name": "FontAwesome6_Brands.ttf",
          "weight": 400
        }
      }
    },
    "buildSteps": {
      "glyphmap": {
        "location": "node_modules/@fortawesome/fontawesome-free/css/all.css",
        "mode": "css",
        "prefix": ".fa-"
      },
      "copyFont": {
        "location": [
          ["node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf", "FontAwesome6_Brands"],
          ["node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf", "FontAwesome6_Regular"],
          ["node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf", "FontAwesome6_Solid"]
        ]
      },
      "postScript": {
        "script": "node ../fontawesome-common/scripts/generate-fontawesome-metadata --path node_modules/@fortawesome/fontawesome-free --output glyphmaps/FontAwesome6_meta.json"
      }
    },
    "versions": [{ "rnvi": "12.0.0", "upstream": "6.7.2" }]
  }
}
```

### SVG Processing with Fixes (Ionicons)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "ionicons",
    "upstreamFont": "ionicons",
    "buildSteps": {
      "fixSVGPaths": {
        "location": "../../node_modules/ionicons/dist/svg"
      },
      "fontCustom": {
        "location": "fixedSvg",
        "cleanup": true
      },
      "fontforgeScript": {
        "script": "correct-direction.py"
      },
      "glyphmap": {
        "mode": "css",
        "cleanup": true
      }
    },
    "versions": [{ "rnvi": "12.0.0", "upstream": "7.4.0" }, { "rnvi": "12.0.1", "upstream": "8.0.8" }]
  }
}
```

### Custom Font Package (Fontello)
```json
{
  "generator-react-native-vector-icons": {
    "packageName": "fontello",
    "customReadme": true,
    "customSrc": true,
    "copyCustomFonts": true
  }
}
```

## Build Process

1. **Install Dependencies**: The generator installs upstream font packages
2. **Template Generation**: Creates package.json, TypeScript files, Android/iOS config
3. **Build Steps Execution**: Runs configured build steps in order
4. **Font Generation**: Uses FontCustom in Docker container if needed
5. **Glyph Mapping**: Generates JSON mapping files for icons

## Testing Your Font Package

After generating your font package, test it in the example app:

```sh
# Start the example app (see CONTRIBUTING.md for details)
pnpm run example start
pnpm run example android  # or ios
```

## Development Workflow

For ongoing development and testing:

1. **Make template changes** to `packages/generator-react-native-vector-icons/src/app/templates/`
2. **Regenerate fonts**:
   ```sh
   pnpm generate my-font
   ```
3. **Test changes** in the IconExplorer app
4. **Run linting and tests** (see [CONTRIBUTING.md](../CONTRIBUTING.md#linting-and-tests)):
   ```sh
   pnpm run lint
   pnpm run test
   ```

## Submitting Your Font Package

When ready to contribute your font package:

1. **Follow commit conventions** described in [CONTRIBUTING.md](../CONTRIBUTING.md#commit-message-convention)
2. **Create a pull request** following the [PR guidelines](../CONTRIBUTING.md#sending-a-pull-request)
3. **Include documentation** updates if needed
4. **Ensure all tests pass** in CI

## Font Versioning

Font package versions are independent of upstream font versions. We track the mapping in each font's README.md file as described in [CONTRIBUTING.md](../CONTRIBUTING.md#font-versioning).

## Manual Generator Execution

If needed, you can run the generator manually:

```sh
cd packages/my-font
npx yo react-native-vector-icons --current-version=1.0.0
```

> **Note**: The `pnpm generate` command is the preferred method as it handles version management automatically.
