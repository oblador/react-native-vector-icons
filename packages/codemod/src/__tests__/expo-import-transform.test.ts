import type { API, FileInfo, Options } from 'jscodeshift';
import jscodeshift from 'jscodeshift';

import transform from '../expo/import-transform';

// Mock newFontImports to avoid file system side effects
jest.mock('../expo/newFontImports', () => ({
  addNewFontImport: jest.fn(),
}));

function applyTransform(source: string, options: Options = {}): string | undefined {
  const fileInfo: FileInfo = {
    path: 'test.tsx',
    source,
  };
  const api: API = {
    jscodeshift: jscodeshift.withParser('tsx'),
    j: jscodeshift.withParser('tsx'),
    stats: () => {},
    report: () => {},
  };
  return transform(fileInfo, api, options);
}

describe('expo import-transform', () => {
  describe('named imports from @expo/vector-icons', () => {
    it('splits named imports into multiple default imports', () => {
      const input = `import { Ionicons, MaterialIcons } from '@expo/vector-icons';`;
      const output = applyTransform(input);
      expect(output).toContain('import Ionicons from "@react-native-vector-icons/ionicons"');
      expect(output).toContain('import MaterialIcons from "@react-native-vector-icons/material-icons"');
    });

    it('appends /static when useStatic is true', () => {
      const input = `import { Ionicons, MaterialIcons } from '@expo/vector-icons';`;
      const output = applyTransform(input, { useStatic: true });
      expect(output).toContain('import Ionicons from "@react-native-vector-icons/ionicons/static"');
      expect(output).toContain('import MaterialIcons from "@react-native-vector-icons/material-icons/static"');
    });
  });

  describe('default imports from @expo/vector-icons/<Family>', () => {
    it('transforms a default import from a specific family', () => {
      const input = `import Ionicons from '@expo/vector-icons/Ionicons';`;
      const output = applyTransform(input);
      expect(output).toBe('import Ionicons from "@react-native-vector-icons/ionicons";');
    });

    it('transforms a default import with /static when useStatic is true', () => {
      const input = `import Feather from '@expo/vector-icons/Feather';`;
      const output = applyTransform(input, { useStatic: true });
      expect(output).toBe('import Feather from "@react-native-vector-icons/feather/static";');
    });

    it('strips /build/ from import paths', () => {
      const input = `import Ionicons from '@expo/vector-icons/build/Ionicons';`;
      const output = applyTransform(input);
      expect(output).toBe('import Ionicons from "@react-native-vector-icons/ionicons";');
    });
  });

  describe('non-icon-family imports', () => {
    it('transforms createIconSetFromIcoMoon', () => {
      const input = `import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon';`;
      const output = applyTransform(input);
      expect(output).toBe('import createIconSetFromIcoMoon from "@react-native-vector-icons/icomoon";');
    });

    it('transforms createIconSetFromFontello', () => {
      const input = `import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';`;
      const output = applyTransform(input);
      expect(output).toBe('import createIconSetFromFontello from "@react-native-vector-icons/fontello";');
    });
  });

  describe('edge cases', () => {
    it('returns undefined when no @expo/vector-icons imports are found', () => {
      const input = `import React from 'react';`;
      const output = applyTransform(input);
      expect(output).toBeUndefined();
    });

    it('preserves the local import name for default imports', () => {
      const input = `import MyIcons from '@expo/vector-icons/Entypo';`;
      const output = applyTransform(input);
      expect(output).toBe('import MyIcons from "@react-native-vector-icons/entypo";');
    });

    it('transforms all supported icon families', () => {
      const families = [
        ['AntDesign', 'ant-design'],
        ['Entypo', 'entypo'],
        ['EvilIcons', 'evil-icons'],
        ['Feather', 'feather'],
        ['FontAwesome', 'fontawesome'],
        ['FontAwesome5', 'fontawesome5'],
        ['FontAwesome6', 'fontawesome6'],
        ['Fontisto', 'fontisto'],
        ['Foundation', 'foundation'],
        ['Ionicons', 'ionicons'],
        ['MaterialCommunityIcons', 'material-design-icons'],
        ['MaterialIcons', 'material-icons'],
        ['Octicons', 'octicons'],
        ['SimpleLineIcons', 'simple-line-icons'],
        ['Zocial', 'zocial'],
      ];

      for (const [oldName, newName] of families) {
        const input = `import Icon from '@expo/vector-icons/${oldName}';`;
        const output = applyTransform(input);
        expect(output).toContain(`from "@react-native-vector-icons/${newName}"`);
      }
    });

    it('throws for unknown icon family in named import', () => {
      const input = `import { UnknownFont } from '@expo/vector-icons';`;
      expect(() => applyTransform(input)).toThrow('No mapping found for @expo/vector-icons/UnknownFont');
    });

    it('throws for unknown icon family in default import', () => {
      const input = `import UnknownFont from '@expo/vector-icons/UnknownFont';`;
      expect(() => applyTransform(input)).toThrow('No mapping found for @expo/vector-icons/UnknownFont');
    });
  });
});
