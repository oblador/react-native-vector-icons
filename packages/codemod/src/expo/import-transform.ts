import type { API, FileInfo, Options } from 'jscodeshift';

import iconStyleTransform from '../11.0/icon-style-transform';
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
export default function transform(fileInfo: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const useStatic = options.useStatic === true;

  const newFontImports = new Set<string>();
  const createIconSetLocalNames = new Set<string>();

  const noStaticPackages = new Set(['@react-native-vector-icons/icomoon', '@react-native-vector-icons/fontello']);

  const resolveImportPath = (basePath: string): string => {
    if (useStatic && !noStaticPackages.has(basePath)) {
      return `${basePath}/static`;
    }
    return basePath;
  };

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
              const importedName = String(spec.imported.name);
              const localName = String(spec.local?.name ?? importedName);

              // Find the correct mapping for this font
              const oldName = `@expo/vector-icons/${importedName}`;
              const newFontPath = importsMap[oldName];
              if (!newFontPath) {
                throw new Error(`No mapping found for ${oldName}. Migrate this import manually.`);
              }

              newFontImports.add(newFontPath);

              if (oldName.includes('createIconSet')) {
                createIconSetLocalNames.add(localName);
              }

              return j.importDeclaration(
                [j.importDefaultSpecifier(j.identifier(localName))],
                j.literal(resolveImportPath(newFontPath)),
              );
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

      if (importPath.includes('createIconSet')) {
        const localName = path.value.specifiers?.[0]?.local?.name;
        if (localName) {
          createIconSetLocalNames.add(String(localName));
        }
      }

      // Replace with new import
      source.value = resolveImportPath(newFontPath);
    }
  });

  // Transform FontAwesome boolean style props to iconStyle="..."
  iconStyleTransform(j, root);

  // Transform createIconSetFromFontello/IcoMoon call signatures:
  // (config, fontName, fontSource) → (config, { fontSource })
  root.find(j.CallExpression).forEach((callPath) => {
    if (
      callPath.node.callee.type === 'Identifier' &&
      createIconSetLocalNames.has(callPath.node.callee.name) &&
      callPath.node.arguments.length === 3
    ) {
      const config = callPath.node.arguments[0];
      const fontSource = callPath.node.arguments[2];
      callPath.node.arguments = [
        // biome-ignore lint/style/noNonNullAssertion: length === 3 is checked above
        config!,
        // biome-ignore lint/suspicious/noExplicitAny: jscodeshift property builder types are too loose
        j.objectExpression([j.property('init', j.identifier('fontSource'), fontSource as any)]),
      ];
    }
  });

  if (newFontImports.size > 0) {
    addNewFontImport(Array.from(newFontImports));
  }

  return newFontImports.size > 0 ? root.toSource() : undefined;
}
