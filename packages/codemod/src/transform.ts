import type { API, FileInfo } from 'jscodeshift';

import importTransform from './import-transform';
import iconStyleTransform from './icon-style-transform';

export default (file: FileInfo, api: API) => {
    const j = api.jscodeshift;
    const r = api.report;
    const root = j(file.source);

    // Apply each transform
    importTransform(j, root, r);
    iconStyleTransform(j, root);

    return root.toSource();
};
