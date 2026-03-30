import { memo } from 'react';

import type { IconEntry } from './types';

type Props = {
  icons: IconEntry[];
  selectedIcon: IconEntry | null;
  onSelect: (icon: IconEntry) => void;
  getFontFamily: (family: string) => string;
};

const IconCard = memo(function IconCard({
  icon,
  isSelected,
  onSelect,
  fontFamily,
}: {
  icon: IconEntry;
  isSelected: boolean;
  onSelect: (icon: IconEntry) => void;
  fontFamily: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(icon)}
      className={`card-glow cursor-pointer flex flex-col items-center gap-2 rounded-lg border p-3 transition-all duration-200 ${
        isSelected
          ? 'bg-surface-hover border-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)]'
          : 'bg-surface border-border'
      }`}
    >
      <span className="text-3xl leading-none text-text" style={{ fontFamily: `'${fontFamily}'` }}>
        {String.fromCodePoint(icon.codepoint)}
      </span>
      <span className="w-full truncate text-center text-xs text-text-muted">{icon.name}</span>
      <span className="text-[11px] text-text-dim">{icon.meta.displayName}</span>
    </button>
  );
});

export function IconGrid({ icons, selectedIcon, onSelect, getFontFamily }: Props) {
  if (icons.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-text-muted">No icons found</p>
        <p className="mt-1 text-sm text-text-dim">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {icons.map((icon) => (
        <IconCard
          key={`${icon.family}-${icon.name}`}
          icon={icon}
          isSelected={selectedIcon?.name === icon.name && selectedIcon?.family === icon.family}
          onSelect={onSelect}
          fontFamily={getFontFamily(icon.family)}
        />
      ))}
    </div>
  );
}
