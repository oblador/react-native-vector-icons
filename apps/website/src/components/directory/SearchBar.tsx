import { useCallback, useRef } from 'react';

type Props = {
  query: string;
  onChange: (query: string) => void;
};

export function SearchBar({ query, onChange }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(value), 300);
    },
    [onChange],
  );

  return (
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
        style={{ fontFamily: "'Feather'", fontSize: '1rem', lineHeight: 1 }}
      >
        {'\uF1D0'}
      </span>
      <input
        type="text"
        defaultValue={query}
        onChange={handleChange}
        placeholder="Search icons..."
        className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text outline-none transition-colors duration-150 focus:border-accent-cyan"
      />
    </div>
  );
}
