'use client';

/**
 * Phosphor icon set component (static font loading).
 * Usage: <Phosphor name="airplane" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Phosphor.json';

export const Phosphor = createIconSet(glyphMap, {
  postScriptName: 'Phosphor',
  fontFileName: 'Phosphor.ttf',
});

export type PhosphorIconName = keyof typeof glyphMap;

/** @alias */
export default Phosphor;
