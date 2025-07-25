'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * MaterialIcons icon set component.
 * Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/MaterialIcons.json';

export const MaterialIcons = createIconSet(glyphMap, {
  postScriptName: 'MaterialIcons-Regular',
  fontFileName: 'MaterialIcons.ttf',
  fontSource: require('../fonts/MaterialIcons.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type MaterialIconsIconName = keyof typeof glyphMap;

/** @alias */
export default MaterialIcons;
