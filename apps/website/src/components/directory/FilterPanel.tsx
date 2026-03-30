import type { IconFamily } from '../../data/icon-families';
import type { FilterState } from './types';
import { toggleClasses } from './types';

type Props = {
  filters: FilterState;
  onChange: (update: Partial<FilterState>) => void;
  availableStyles: string[];
  availableFamilies: [string, IconFamily][];
};

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 ${toggleClasses(active, 'bg-surface')}`}
    >
      {label}
    </button>
  );
}

export function FilterPanel({ filters, onChange, availableStyles, availableFamilies }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Status */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-text-dim">Status:</span>
        <Chip label="All" active={filters.status === 'all'} onClick={() => onChange({ status: 'all' })} />
        <Chip label="Active" active={filters.status === 'active'} onClick={() => onChange({ status: 'active' })} />
        <Chip
          label="Deprecated"
          active={filters.status === 'deprecated'}
          onClick={() => onChange({ status: 'deprecated' })}
        />
      </div>

      {/* Licence */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-text-dim">Licence:</span>
        <Chip label="All" active={filters.licence === 'all'} onClick={() => onChange({ licence: 'all' })} />
        <Chip label="Free" active={filters.licence === 'free'} onClick={() => onChange({ licence: 'free' })} />
        <Chip label="Pro" active={filters.licence === 'pro'} onClick={() => onChange({ licence: 'pro' })} />
      </div>

      {/* Style */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-medium text-text-dim">Style:</span>
        {availableStyles.map((style) => (
          <Chip
            key={style}
            label={style}
            active={filters.styles.includes(style)}
            onClick={() => {
              const styles = filters.styles.includes(style)
                ? filters.styles.filter((s) => s !== style)
                : [...filters.styles, style];
              onChange({ styles });
            }}
          />
        ))}
      </div>

      {/* Family dropdown */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-text-dim">Family:</span>
        <select
          value={filters.families.length === 1 ? filters.families[0] : ''}
          onChange={(e) => {
            const val = e.target.value;
            onChange({ families: val ? [val] : [] });
          }}
          className="rounded-lg border border-border bg-surface py-1 pl-2 pr-6 text-xs text-text-muted outline-none transition-colors duration-150"
        >
          <option value="">All families</option>
          {availableFamilies.map(([key, meta]) => (
            <option key={key} value={key}>
              {meta.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
