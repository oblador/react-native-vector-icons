# Creating a font package

You can create a new font package either via a PR to this repository or by publishing your own font package on NPM.

We use a yeoman generator to fully automate the generation the fonts from a configuration file.

In the future the idea is to automate this to automatically release new fonts in line with upstream.

Below we describe how to create a font in this monorepo, the process for creating your own package would be quite similar.

## Create the yeoman config

Create and start editing the config file
```sh
mkdir packages/material-symbols
vi packages/material-symbols/.yo-rc.json
git add packages/material-symbols/.yo-rc.json
```

## Base file

The basics of the ```.yo-rc.json``` are

```json
{
  "generator-react-native-vector-icons": {
    "packageName": "material-symbols",
    "upstreamFont": "@ant-design/icons-svg",
    "versionSuffix": "-alpha",
    "buildSteps": {
      "fixSVGPaths": {
        "location": "../../node_modules/@ant-design/icons-svg/inline-namespaced-svg/outlined"
      },
      "fontCustom": {
        "location": "fixedSvg",
        "cleanup": true
      },
      "glyphmap": {
        "mode": "css",
        "cleanup": true
      }
    }
  }
}
```

## Configuration Description

### packageName

This is the name of the node package and it should match the directory name.

NOTE: it currently assumes it will live in @react-native-vector-icons namespace)

