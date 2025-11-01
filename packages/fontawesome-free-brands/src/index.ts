'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * FontAwesomeFreeBrands icon set component.
 * Usage: <FontAwesomeFreeBrands name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/FontAwesomeFreeBrands.json';

export const FontAwesomeFreeBrands = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome7Brands-Regular',
  fontFileName: 'fa-brands-400.ttf',
  fontSource: require('../fonts/fa-brands-400.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type FontAwesomeFreeBrandsIconName = keyof typeof glyphMap;

/** @alias */
export default FontAwesomeFreeBrands;
