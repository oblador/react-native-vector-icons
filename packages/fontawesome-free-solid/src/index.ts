'use client';

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * This file was generated from packages/generator-react-native-vector-icons/src/app/templates
 * If you're contributing to react-native-vector-icons, make the change there; otherwise it'll be lost
 *
 * FontAwesomeFreeSolid icon set component.
 * Usage: <FontAwesomeFreeSolid name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/FontAwesomeFreeSolid.json';

export const FontAwesomeFreeSolid = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome7Free-Solid',
  fontFileName: 'fa-solid-900.ttf',
  fontSource: require('../fonts/fa-solid-900.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type FontAwesomeFreeSolidIconName = keyof typeof glyphMap;

/** @alias */
export default FontAwesomeFreeSolid;
