import { useState } from 'react';

import type { IconEntry } from './types';
import { toggleClasses } from './types';

const SIZES = [16, 24, 32, 48, 64] as const;

const COLOUR_SWATCHES = [
  { name: 'White', value: '#ffffff' },
  { name: 'Grey', value: '#a1a1aa' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Violet', value: '#8b5cf6' },
] as const;

type Props = {
  icon: IconEntry;
  getFontFamily: (family: string) => string;
  onClose: () => void;
};

function CopyBox({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-medium text-text-dim">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`rounded border px-2 py-0.5 text-[10px] font-medium transition-colors duration-150 ${toggleClasses(copied)}`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-md border border-border bg-bg p-2.5 font-mono text-[11px] leading-relaxed text-text-muted">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function IconDetailPanel({ icon, getFontFamily, onClose }: Props) {
  const [size, setSize] = useState<number>(48);
  const [colour, setColour] = useState('#ffffff');
  const [bgLight, setBgLight] = useState(false);

  const fontFamily = getFontFamily(icon.family);
  const codepoint = `U+${icon.codepoint.toString(16).toUpperCase().padStart(4, '0')}`;
  const importCode = `import { ${icon.meta.componentName} } from '${icon.meta.packageName}/static';`;
  const usageCode = `<${icon.meta.componentName} name="${icon.name}" size={${size}} color="${colour}" />`;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-sm font-semibold text-text">{icon.name}</h3>
          <p className="text-xs text-text-dim">{icon.meta.displayName}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-text-dim transition-colors duration-150"
          aria-label="Close"
        >
          <span style={{ fontFamily: "'Feather'", fontSize: '1rem', lineHeight: 1 }}>{'\uF216'}</span>
        </button>
      </div>

      {/* Preview */}
      <div
        className={`flex items-center justify-center rounded-lg border border-border p-6 ${bgLight ? 'bg-[#f4f4f5]' : 'bg-bg'}`}
      >
        <span
          style={{
            fontFamily: `'${fontFamily}'`,
            fontSize: `${size}px`,
            color: colour,
            lineHeight: 1,
          }}
        >
          {String.fromCodePoint(icon.codepoint)}
        </span>
      </div>

      {/* Size selector */}
      <div>
        <span className="text-[11px] font-medium text-text-dim">Size</span>
        <div className="mt-1 flex gap-1">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSize(s)}
              className={`rounded border px-2 py-1 text-[11px] font-medium transition-colors duration-150 ${toggleClasses(size === s)}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colour selector */}
      <div>
        <span className="text-[11px] font-medium text-text-dim">Colour</span>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {COLOUR_SWATCHES.map((swatch) => (
            <button
              type="button"
              key={swatch.value}
              onClick={() => setColour(swatch.value)}
              className={`h-6 w-6 rounded-full transition-transform duration-150 outline-offset-2 ${
                colour === swatch.value ? 'outline-2 outline-accent-cyan scale-110' : 'outline-0 scale-100'
              }`}
              style={{ backgroundColor: swatch.value }}
              title={swatch.name}
            />
          ))}
          <input
            type="color"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
            title="Custom colour"
          />
        </div>
      </div>

      {/* Background toggle */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-text-dim">Background:</span>
        <button
          type="button"
          onClick={() => setBgLight(false)}
          className={`rounded border px-2 py-0.5 text-[10px] font-medium transition-colors duration-150 ${toggleClasses(!bgLight)}`}
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => setBgLight(true)}
          className={`rounded border px-2 py-0.5 text-[10px] font-medium transition-colors duration-150 ${toggleClasses(bgLight)}`}
        >
          Light
        </button>
      </div>

      {/* Copy boxes */}
      <CopyBox label="Import" code={importCode} />
      <CopyBox label="Usage" code={usageCode} />

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 rounded-md border border-border bg-bg p-3 text-[11px]">
        <span className="text-text-dim">Name</span>
        <span className="font-mono text-text-muted">{icon.name}</span>
        <span className="text-text-dim">Codepoint</span>
        <span className="font-mono text-text-muted">{codepoint}</span>
        <span className="text-text-dim">Family</span>
        <span className="text-text-muted">{icon.meta.displayName}</span>
        <span className="text-text-dim">Package</span>
        <span className="font-mono text-text-muted">{icon.meta.packageName}</span>
      </div>
    </div>
  );
}
