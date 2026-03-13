'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * FontAwesomeProBrands icon set component.
 * Usage: <FontAwesomeProBrands name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/FontAwesomeProBrands.json';

export const FontAwesomeProBrands = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome7Brands-Regular',
  fontFileName: 'fa-brands-400.ttf',
});

export type FontAwesomeProBrandsIconName = keyof typeof glyphMap;

/** @alias */
export default FontAwesomeProBrands;
