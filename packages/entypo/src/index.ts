'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Entypo.json';

export const Entypo = createIconSet(glyphMap, {
  postScriptName: 'Entypo',
  fontFileName: 'Entypo.ttf',
  fontSource: require('../fonts/Entypo.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type EntypoIconName = keyof typeof glyphMap;

/** @alias */
export default Entypo;
