import type { API, FileInfo } from 'jscodeshift';

import iconStyleTransform from './icon-style-transform';
import importTransform from './import-transform';

export default (file: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const r = api.report;
  const root = j(file.source);

  // Apply each transform
  importTransform(j, root, r);
  iconStyleTransform(j, root);

  return root.toSource();
};
