import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const tmpFile = path.join(os.tmpdir(), 'rnvi-codemod-new-imports.txt');

export function addNewFontImport(fontNames: string[]) {
  // this should be atomic and safe to call from multiple processes
  fs.appendFileSync(tmpFile, fontNames.join(os.EOL) + os.EOL);
}

export function getNewFontImports(): string[] {
  if (!fs.existsSync(tmpFile)) {
    return [];
  }
  const content = fs.readFileSync(tmpFile, 'utf8');
  fs.unlinkSync(tmpFile);
  return Array.from(new Set(content.split(os.EOL).filter(Boolean)));
}
