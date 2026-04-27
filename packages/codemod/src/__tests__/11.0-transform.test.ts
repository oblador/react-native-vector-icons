import type { API, FileInfo } from 'jscodeshift';
import jscodeshift from 'jscodeshift';

import transform from '../11.0/transform';

function applyTransform(source: string) {
  const reported: string[] = [];
  const fileInfo: FileInfo = { path: 'test.tsx', source };
  const api: API = {
    jscodeshift: jscodeshift.withParser('tsx'),
    j: jscodeshift.withParser('tsx'),
    stats: () => {},
    report: (msg: string) => reported.push(msg),
  };
  const output = transform(fileInfo, api);
  return { output, reported };
}

describe('11.0 transform', () => {
  it('transforms an import and reports the dependency', () => {
    const input = `import Ionicons from 'react-native-vector-icons/Ionicons';`;
    const { output, reported } = applyTransform(input);
    expect(output).toBe('import Ionicons from "@react-native-vector-icons/ionicons/static";');
    expect(reported).toContain('DEP_FOUND: @react-native-vector-icons/ionicons/static');
  });

  it('transforms multiple imports from different icon sets', () => {
    const input = [
      `import Ionicons from 'react-native-vector-icons/Ionicons';`,
      `import FontAwesome from 'react-native-vector-icons/FontAwesome';`,
    ].join('\n');
    const { output, reported } = applyTransform(input);
    expect(output).toContain('from "@react-native-vector-icons/ionicons/static"');
    expect(output).toContain('from "@react-native-vector-icons/fontawesome/static"');
    expect(reported).toHaveLength(2);
  });

  it('transforms renamed packages correctly', () => {
    const cases: [string, string][] = [
      ['MaterialCommunityIcons', 'material-design-icons'],
      ['MaterialIcons', 'material-icons'],
      ['AntDesign', 'ant-design'],
      ['EvilIcons', 'evil-icons'],
    ];
    for (const [oldName, newName] of cases) {
      const input = `import Icon from 'react-native-vector-icons/${oldName}';`;
      const { output } = applyTransform(input);
      expect(output).toContain(`from "@react-native-vector-icons/${newName}/static"`);
    }
  });

  it('preserves the local import name', () => {
    const input = `import MyIcons from 'react-native-vector-icons/Entypo';`;
    const { output } = applyTransform(input);
    expect(output).toContain('import MyIcons from');
  });

  it('does not transform unrelated imports', () => {
    const input = `import React from 'react';`;
    const { output, reported } = applyTransform(input);
    expect(output).toBe(input);
    expect(reported).toHaveLength(0);
  });

  it('converts FontAwesome icon style boolean props to iconStyle', () => {
    const input = `
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const App = () => <FontAwesome5 name="heart" solid />;
`;
    const { output } = applyTransform(input);
    expect(output).toContain('iconStyle="solid"');
    expect(output).not.toContain(' solid />');
  });

  it('converts brand prop to iconStyle on FontAwesome6', () => {
    const input = `
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const App = () => <FontAwesome6 name="github" brand />;
`;
    const { output } = applyTransform(input);
    expect(output).toContain('iconStyle="brand"');
    expect(output).toContain('from "@react-native-vector-icons/fontawesome6/static"');
  });

  it('converts pro icon styles (light, thin, duotone, sharp)', () => {
    const styles = ['light', 'thin', 'duotone', 'sharp', 'sharpSolid', 'sharpLight'];
    for (const style of styles) {
      const input = `
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
const App = () => <FontAwesome6Pro name="star" ${style} />;
`;
      const { output } = applyTransform(input);
      expect(output).toContain(`iconStyle="${style}"`);
    }
  });

  it('does not convert icon style props on non-FontAwesome components', () => {
    const input = `
import Ionicons from 'react-native-vector-icons/Ionicons';
const App = () => <Ionicons name="heart" solid />;
`;
    const { output } = applyTransform(input);
    // solid should remain untouched since Ionicons is not a FA component
    expect(output).toContain('solid');
    expect(output).not.toContain('iconStyle');
  });

  it('handles import transform and icon style transform together', () => {
    const input = `
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => (
  <>
    <FontAwesome5 name="heart" solid size={24} />
    <Ionicons name="home" size={24} />
  </>
);
`;
    const { output, reported } = applyTransform(input);
    // imports transformed
    expect(output).toContain('from "@react-native-vector-icons/fontawesome5/static"');
    expect(output).toContain('from "@react-native-vector-icons/ionicons/static"');
    // icon style transformed on FA5 only
    expect(output).toContain('iconStyle="solid"');
    // deps reported
    expect(reported).toHaveLength(2);
  });

  it('transforms createIconSetFromFontello import and call signature', () => {
    const input = [
      `import createIconSetFromFontello from 'react-native-vector-icons/createIconSetFromFontello';`,
      `const Icon = createIconSetFromFontello(config, 'fontello', require('./font.ttf'));`,
    ].join('\n');
    const { output, reported } = applyTransform(input);
    expect(output).toContain('from "@react-native-vector-icons/fontello"');
    expect(output).toContain("createIconSetFromFontello(config, {\n  fontSource: require('./font.ttf')\n})");
    expect(reported).toContain('DEP_FOUND: @react-native-vector-icons/fontello');
  });

  it('transforms createIconSetFromIcoMoon import and call signature', () => {
    const input = [
      `import createIconSetFromIcoMoon from 'react-native-vector-icons/createIconSetFromIcoMoon';`,
      `const Icon = createIconSetFromIcoMoon(config, 'icomoon', require('./font.ttf'));`,
    ].join('\n');
    const { output, reported } = applyTransform(input);
    expect(output).toContain('from "@react-native-vector-icons/icomoon"');
    expect(output).toContain("createIconSetFromIcoMoon(config, {\n  fontSource: require('./font.ttf')\n})");
    expect(reported).toContain('DEP_FOUND: @react-native-vector-icons/icomoon');
  });

  it('does not transform createIconSet calls with 2 arguments', () => {
    const input = [
      `import createIconSetFromFontello from 'react-native-vector-icons/createIconSetFromFontello';`,
      `const Icon = createIconSetFromFontello(config, { fontSource: require('./font.ttf') });`,
    ].join('\n');
    const { output } = applyTransform(input);
    expect(output).not.toContain('fontSource: {\n');
  });
});
