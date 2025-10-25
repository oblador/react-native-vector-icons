import type { Collection, JSCodeshift } from 'jscodeshift';

const imports: [string, string][] = [
  ['react-native-vector-icons/AntDesign', '@react-native-vector-icons/ant-design'],
  ['react-native-vector-icons/Entypo', '@react-native-vector-icons/entypo'],
  ['react-native-vector-icons/EvilIcons', '@react-native-vector-icons/evil-icons'],
  ['react-native-vector-icons/Feather', '@react-native-vector-icons/feather'],
  ['react-native-vector-icons/FontAwesome5', '@react-native-vector-icons/fontawesome5'],
  ['react-native-vector-icons/FontAwesome5Pro', '@react-native-vector-icons/fontawesome5-pro'],
  ['react-native-vector-icons/FontAwesome6', '@react-native-vector-icons/fontawesome6'],
  ['react-native-vector-icons/FontAwesome6Pro', '@react-native-vector-icons/fontawesome6-pro'],
  ['react-native-vector-icons/FontAwesome', '@react-native-vector-icons/fontawesome'],
  ['react-native-vector-icons/Fontisto', '@react-native-vector-icons/fontisto'],
  ['react-native-vector-icons/Foundation', '@react-native-vector-icons/foundation'],
  ['react-native-vector-icons/Ionicons', '@react-native-vector-icons/ionicons'],
  ['react-native-vector-icons/MaterialCommunityIcons', '@react-native-vector-icons/material-design-icons'],
  ['react-native-vector-icons/MaterialIcons', '@react-native-vector-icons/material-icons'],
  ['react-native-vector-icons/Octicons', '@react-native-vector-icons/octicons'],
  ['react-native-vector-icons/SimpleLineIcons', '@react-native-vector-icons/SimpleLineIcons'],
  ['react-native-vector-icons/Zocial', '@react-native-vector-icons/zocial'],
];

export default (j: JSCodeshift, root: Collection, r: (msg: string) => void) => {
  const pkgs = new Set<string>();

  root
    .find(j.ImportDeclaration)
    .forEach((path) => {
      imports.forEach(([from, to]) => {
        if (path.node.source.value === from) {
          path.node.source.value = to;

          pkgs.add(to);
        }
      });
    })
    .toSource();

  // biome-ignore lint/suspicious/useIterableCallbackReturn: biome bug??
  pkgs.forEach((pkg) => r(`DEP_FOUND: ${pkg}`));
};
