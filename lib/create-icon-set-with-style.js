import createIconSet from './create-icon-set';

export default function createIconSetWithStyle(style) {
  return createIconSet(
    style.glyphMap || {},
    style.fontFamily || '',
    style.fontFile || '',
    style.fontStyle || {}
  );
}
