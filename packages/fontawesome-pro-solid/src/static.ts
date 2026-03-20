'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * FontAwesomeProSolid icon set component.
 * Usage: <FontAwesomeProSolid name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/FontAwesomeProSolid.json';

export const FontAwesomeProSolid = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome7Pro-Solid',
  fontFileName: 'fa-solid-900.ttf',
});

export type FontAwesomeProSolidIconName = keyof typeof glyphMap;

/** @alias */
export default FontAwesomeProSolid;
