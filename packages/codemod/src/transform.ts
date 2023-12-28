import type { API, FileInfo } from 'jscodeshift';

import importTransform from './import-transform';
import iconStyleTransform from './icon-style-transform';
import packageJsonTransform from './package-json-transform';

export default (file: FileInfo, api: API) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Apply each transform
    const pkgs = importTransform(j, root);
    packageJsonTransform(pkgs);
    iconStyleTransform(j, root);

    return root.toSource();
};
