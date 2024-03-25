const path = require('node:path');

const getWorkspaces = require('get-yarn-workspaces');

const workspaces = getWorkspaces(__dirname).filter(
  (workspace) =>
    !workspace.match(
      /\/(generator-react-native-vector-icons|icon-explorer|codemod|directory|fontcustom-docker)$/,
    ),
);
console.log(workspaces);

const { makeMetroConfig } = require("@rnx-kit/metro-config");
module.exports = makeMetroConfig({
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    ...workspaces,
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
