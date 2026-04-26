interface RequireContext {
  keys(): string[];
  <T = unknown>(id: string): T;
  resolve(id: string): string;
  id: string;
}

interface NodeRequire {
  context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): RequireContext;
}
