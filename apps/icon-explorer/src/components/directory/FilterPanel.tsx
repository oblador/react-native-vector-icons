import { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/components/StyledText';
import type { IconFamily } from '@/data/icon-families';
import { useTheme } from '@/theme/ThemeContext';
import type { FilterState } from './types';

type Props = {
  filters: FilterState;
  onChange: (update: Partial<FilterState>) => void;
  availableStyles: string[];
  availableFamilies: [string, IconFamily][];
  vertical?: boolean;
};

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-1 ${
        active ? 'border-accent-cyan bg-accent-cyan' : 'border-border bg-surface'
      }`}
    >
      <Text className={`text-xs font-medium ${active ? 'text-black' : 'text-text-muted'}`}>{label}</Text>
    </Pressable>
  );
}

function FamilyCombobox({
  value,
  families,
  onChange,
}: {
  value: string;
  families: [string, IconFamily][];
  onChange: (val: string) => void;
}) {
  const { colours } = useTheme();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<View>(null);
  const selectedLabel = value ? (families.find(([k]) => k === value)?.[1]?.displayName ?? value) : '';

  const filtered = query
    ? families.filter(([, meta]) => meta.displayName.toLowerCase().includes(query.toLowerCase()))
    : families;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const node = containerRef.current as unknown as HTMLElement | null;
      if (node && !node.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (key: string) => {
    onChange(key);
    setQuery('');
    setOpen(false);
  };

  return (
    <View ref={containerRef} className="relative z-10">
      <TextInput
        value={open ? query : selectedLabel}
        onChangeText={(text) => {
          setQuery(text);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="All families"
        placeholderTextColor={colours.textDim}
        className="rounded-lg border border-border bg-surface px-2 py-1 text-xs text-text-muted"
        style={{ outlineStyle: 'none' } as any}
      />
      {open && (
        <View className="absolute top-full left-0 right-0 z-20 max-h-60 overflow-hidden rounded-lg border border-border bg-surface">
          <ScrollView className="max-h-60">
            <Pressable onPress={() => handleSelect('')} className={`px-3 py-2 ${!value ? 'bg-accent-cyan/10' : ''}`}>
              <Text className={!value ? 'text-accent-cyan text-xs' : 'text-text-muted text-xs'}>All families</Text>
            </Pressable>
            {filtered.map(([key, meta]) => (
              <Pressable
                key={key}
                onPress={() => handleSelect(key)}
                className={`px-3 py-2 ${key === value ? 'bg-accent-cyan/10' : ''}`}
              >
                <Text className={key === value ? 'text-accent-cyan text-xs' : 'text-text-muted text-xs'}>
                  {meta.displayName}
                </Text>
              </Pressable>
            ))}
            {filtered.length === 0 && (
              <View className="px-3 py-2">
                <Text className="text-xs text-text-dim">No matches</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function FamilyDropdown({
  value,
  families,
  onChange,
}: {
  value: string;
  families: [string, IconFamily][];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = value ? (families.find(([k]) => k === value)?.[1]?.displayName ?? value) : 'All families';

  if (Platform.OS === 'web') {
    return <FamilyCombobox value={value} families={families} onChange={onChange} />;
  }

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className="rounded-lg border border-border bg-surface px-3 py-1.5 flex-row items-center"
      >
        <Text className="text-xs text-text-muted">{selectedLabel}</Text>
        <Text className="text-xs text-text-dim ml-1">▼</Text>
      </Pressable>
      {open && (
        <Modal visible transparent animationType="slide" onRequestClose={() => setOpen(false)}>
          <Pressable className="flex-1 bg-black/60" onPress={() => setOpen(false)} />
          <View className="bg-surface rounded-t-2xl max-h-[70%]" style={{ paddingBottom: 32 }}>
            <View className="p-4 border-b border-border">
              <Text className="font-heading text-lg font-bold text-text">Select Family</Text>
            </View>
            <FlatList
              data={[['', { displayName: 'All families' }] as [string, Pick<IconFamily, 'displayName'>], ...families]}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, meta] }) => (
                <Pressable
                  onPress={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  className={`px-4 py-3 border-b border-border ${key === value ? 'bg-accent-cyan/10' : ''}`}
                >
                  <Text className={key === value ? 'text-accent-cyan text-sm' : 'text-text-muted text-sm'}>
                    {meta.displayName}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Modal>
      )}
    </>
  );
}

export function FilterPanel({ filters, onChange, availableStyles, availableFamilies, vertical }: Props) {
  if (vertical) {
    return (
      <View className="gap-6">
        {/* Status */}
        <View>
          <Text className="text-xs font-medium text-text-dim mb-2">Status</Text>
          <View className="flex-row flex-wrap gap-1.5">
            <Chip label="All" active={filters.status === 'all'} onPress={() => onChange({ status: 'all' })} />
            <Chip label="Active" active={filters.status === 'active'} onPress={() => onChange({ status: 'active' })} />
            <Chip
              label="Deprecated"
              active={filters.status === 'deprecated'}
              onPress={() => onChange({ status: 'deprecated' })}
            />
          </View>
        </View>

        {/* Licence */}
        <View>
          <Text className="text-xs font-medium text-text-dim mb-2">Licence</Text>
          <View className="flex-row flex-wrap gap-1.5">
            <Chip label="All" active={filters.licence === 'all'} onPress={() => onChange({ licence: 'all' })} />
            <Chip label="Free" active={filters.licence === 'free'} onPress={() => onChange({ licence: 'free' })} />
            <Chip label="Pro" active={filters.licence === 'pro'} onPress={() => onChange({ licence: 'pro' })} />
          </View>
        </View>

        {/* Style */}
        {availableStyles.length > 0 && (
          <View>
            <Text className="text-xs font-medium text-text-dim mb-2">Style</Text>
            <View className="flex-row flex-wrap gap-1.5">
              {availableStyles.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  active={filters.styles.includes(style)}
                  onPress={() => {
                    const styles = filters.styles.includes(style)
                      ? filters.styles.filter((s) => s !== style)
                      : [...filters.styles, style];
                    onChange({ styles });
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Family */}
        <View>
          <Text className="text-xs font-medium text-text-dim mb-2">Family</Text>
          <FamilyDropdown
            value={filters.families.length === 1 ? filters.families[0] : ''}
            families={availableFamilies}
            onChange={(val) => onChange({ families: val ? [val] : [] })}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="gap-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
        {/* Status */}
        <View className="flex-row items-center gap-1.5">
          <Text className="text-xs font-medium text-text-dim">Status:</Text>
          <Chip label="All" active={filters.status === 'all'} onPress={() => onChange({ status: 'all' })} />
          <Chip label="Active" active={filters.status === 'active'} onPress={() => onChange({ status: 'active' })} />
          <Chip
            label="Deprecated"
            active={filters.status === 'deprecated'}
            onPress={() => onChange({ status: 'deprecated' })}
          />
        </View>

        {/* Licence */}
        <View className="flex-row items-center gap-1.5">
          <Text className="text-xs font-medium text-text-dim">Licence:</Text>
          <Chip label="All" active={filters.licence === 'all'} onPress={() => onChange({ licence: 'all' })} />
          <Chip label="Free" active={filters.licence === 'free'} onPress={() => onChange({ licence: 'free' })} />
          <Chip label="Pro" active={filters.licence === 'pro'} onPress={() => onChange({ licence: 'pro' })} />
        </View>

        {/* Style */}
        {availableStyles.length > 0 && (
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xs font-medium text-text-dim">Style:</Text>
            {availableStyles.map((style) => (
              <Chip
                key={style}
                label={style}
                active={filters.styles.includes(style)}
                onPress={() => {
                  const styles = filters.styles.includes(style)
                    ? filters.styles.filter((s) => s !== style)
                    : [...filters.styles, style];
                  onChange({ styles });
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Family dropdown — separate row */}
      <View className="flex-row items-center gap-1.5">
        <Text className="text-xs font-medium text-text-dim">Family:</Text>
        <FamilyDropdown
          value={filters.families.length === 1 ? filters.families[0] : ''}
          families={availableFamilies}
          onChange={(val) => onChange({ families: val ? [val] : [] })}
        />
      </View>
    </View>
  );
}
