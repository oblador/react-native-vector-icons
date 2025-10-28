import type { API, FileInfo } from 'jscodeshift';

import { addNewFontImport } from './newFontImports';

const importsMap: Record<string, string> = {
  '@expo/vector-icons/AntDesign': '@react-native-vector-icons/ant-design',
  '@expo/vector-icons/Entypo': '@react-native-vector-icons/entypo',
  '@expo/vector-icons/EvilIcons': '@react-native-vector-icons/evil-icons',
  '@expo/vector-icons/Feather': '@react-native-vector-icons/feather',
  '@expo/vector-icons/FontAwesome5': '@react-native-vector-icons/fontawesome5',
  '@expo/vector-icons/FontAwesome5Pro': '@react-native-vector-icons/fontawesome5-pro',
  '@expo/vector-icons/FontAwesome6': '@react-native-vector-icons/fontawesome6',
  '@expo/vector-icons/FontAwesome6Pro': '@react-native-vector-icons/fontawesome6-pro',
  '@expo/vector-icons/FontAwesome': '@react-native-vector-icons/fontawesome',
  '@expo/vector-icons/Fontisto': '@react-native-vector-icons/fontisto',
  '@expo/vector-icons/Foundation': '@react-native-vector-icons/foundation',
  '@expo/vector-icons/Ionicons': '@react-native-vector-icons/ionicons',
  '@expo/vector-icons/MaterialCommunityIcons': '@react-native-vector-icons/material-design-icons',
  '@expo/vector-icons/MaterialIcons': '@react-native-vector-icons/material-icons',
  '@expo/vector-icons/Octicons': '@react-native-vector-icons/octicons',
  '@expo/vector-icons/SimpleLineIcons': '@react-native-vector-icons/simple-line-icons',
  '@expo/vector-icons/Zocial': '@react-native-vector-icons/zocial',
  // non-icon-family imports
  '@expo/vector-icons/createIconSetFromIcoMoon': '@react-native-vector-icons/icomoon',
  '@expo/vector-icons/createIconSetFromFontello': '@react-native-vector-icons/fontello',
};

// prefer transforms to default imports as they are easier to get right than named imports
export default function transform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const newFontImports = new Set<string>();

  // Transform import statements from @expo/vector-icons
  root.find(j.ImportDeclaration).forEach((path) => {
    const { source } = path.value;

    // Handle named imports: import { Ionicons, MaterialIcons } from '@expo/vector-icons'
    if (source.type === 'StringLiteral' && source.value === '@expo/vector-icons') {
      const { specifiers } = path.value;

      if (specifiers) {
        const newImports = specifiers
          .map((spec) => {
            if (spec.type === 'ImportSpecifier') {
              const fontName = spec.imported.name;

              // Find the correct mapping for this font
              const oldName = `@expo/vector-icons/${fontName}`;
              const newFontPath = importsMap[oldName];
              if (!newFontPath) {
                throw new Error(`No mapping found for ${oldName}. Migrate this import manually.`);
              }

              newFontImports.add(newFontPath);

              return j.importDeclaration([j.importDefaultSpecifier(j.identifier(fontName))], j.literal(newFontPath));
            }
            return null;
          })
          .filter(Boolean);

        // Replace the original import with new imports
        if (newImports.length > 0) {
          j(path).replaceWith(newImports);
        }
      }
    }

    // Handle default imports: import Ionicons from '@expo/vector-icons/Ionicons'
    // or 'import Ionicons from '@expo/vector-icons/build/Ionicons'
    if (
      source.type === 'StringLiteral' &&
      typeof source.value === 'string' &&
      source.value.startsWith('@expo/vector-icons/')
    ) {
      const importPath = source.value.replace('/build/', '/');
      const newFontPath = importsMap[importPath];
      if (!newFontPath) {
        throw new Error(`No mapping found for ${source.value}. Migrate this import manually.`);
      }
      newFontImports.add(newFontPath);

      // Replace with new import
      source.value = newFontPath;
    }
  });

  if (newFontImports.size > 0) {
    addNewFontImport(Array.from(newFontImports));
  }

  return newFontImports.size > 0 ? root.toSource() : undefined;
}
