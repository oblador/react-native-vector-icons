'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Zocial.json';

export const Zocial = createIconSet(glyphMap, {
  postScriptName: 'zocial',
  fontFileName: 'Zocial.ttf',
  fontSource: require('../fonts/Zocial.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type ZocialIconName = keyof typeof glyphMap;

/** @alias */
export default Zocial;
