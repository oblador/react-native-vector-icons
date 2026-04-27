import type { API, FileInfo } from 'jscodeshift';

import iconStyleTransform from './icon-style-transform';
import importTransform from './import-transform';

const createIconSetNames = new Set(['createIconSetFromIcoMoon', 'createIconSetFromFontello']);

export default (file: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const r = api.report;
  const root = j(file.source);

  // Apply each transform
  importTransform(j, root, r);
  iconStyleTransform(j, root);

  // Transform createIconSetFromFontello/IcoMoon call signatures:
  // (config, fontName, fontSource) → (config, { fontSource })
  root.find(j.CallExpression).forEach((callPath) => {
    if (
      callPath.node.callee.type === 'Identifier' &&
      createIconSetNames.has(callPath.node.callee.name) &&
      callPath.node.arguments.length === 3
    ) {
      const config = callPath.node.arguments[0];
      const fontSource = callPath.node.arguments[2];
      callPath.node.arguments = [
        // biome-ignore lint/style/noNonNullAssertion: length === 3 is checked above
        config!,
        // biome-ignore lint/suspicious/noExplicitAny: jscodeshift property builder types are too loose
        j.objectExpression([j.property('init', j.identifier('fontSource'), fontSource as any)]),
      ];
    }
  });

  return root.toSource();
};
