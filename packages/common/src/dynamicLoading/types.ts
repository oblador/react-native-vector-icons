// the result of calling require('path')
type ModuleId = number;
type LocalFileSystemUri = string;

export type FontSource = ModuleId | LocalFileSystemUri;

export type DynamicLoader = {
  loadFontAsync: (fontFamily: string, fontSource: FontSource) => Promise<void>;
  isLoaded: (fontFamily: string) => boolean;
};
