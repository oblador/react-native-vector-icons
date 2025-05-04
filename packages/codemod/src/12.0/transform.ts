import type { API, FileInfo } from 'jscodeshift';

export default (file: FileInfo, api: API) => {
  const j = api.jscodeshift;
  // const r = api.report;
  const root = j(file.source);

  // Apply each transform

  return root.toSource();
};
