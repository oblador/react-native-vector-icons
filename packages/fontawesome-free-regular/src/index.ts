'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * FontAwesomeFreeRegular icon set component.
 * Usage: <FontAwesomeFreeRegular name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/FontAwesomeFreeRegular.json';

export const FontAwesomeFreeRegular = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome7Free-Regular',
  fontFileName: 'fa-regular-400.ttf',
  fontSource: require('../fonts/fa-regular-400.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type FontAwesomeFreeRegularIconName = keyof typeof glyphMap;

/** @alias */
export default FontAwesomeFreeRegular;
