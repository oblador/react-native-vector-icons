'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * Fontisto icon set component.
 * Usage: <Fontisto name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Fontisto.json';

export const Fontisto = createIconSet(glyphMap, {
  postScriptName: 'fontisto',
  fontFileName: 'Fontisto.ttf',
  fontSource: require('../fonts/Fontisto.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type FontistoIconName = keyof typeof glyphMap;

/** @alias */
export default Fontisto;
