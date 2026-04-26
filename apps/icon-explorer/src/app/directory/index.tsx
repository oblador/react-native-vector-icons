import { Feather } from '@react-native-vector-icons/feather';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { FilterPanel } from '@/components/directory/FilterPanel';
import { IconDetailPanel } from '@/components/directory/IconDetailPanel';
import { IconGrid } from '@/components/directory/IconGrid';
import { SearchBar } from '@/components/directory/SearchBar';
import type { FilterState, GlyphmapIndex, IconEntry } from '@/components/directory/types';
import { GradientText } from '@/components/GradientText';
import { Text } from '@/components/StyledText';
import glyphmapIndex from '@/data/generated/glyphmapIndex.json';
import { iconFamilies } from '@/data/icon-families';
import { useTheme } from '@/theme/ThemeContext';

const DirectoryScreen = () => {
  const { width } = useWindowDimensions();
  const { colours } = useTheme();
  const isWide = width >= 1024;

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    status: 'all',
    licence: 'all',
    styles: [],
    families: [],
  });
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = width < 768;
  const detailPanelRef = useRef<View>(null);

  useEffect(() => {
    if (selectedIcon && isWide) {
      const node = detailPanelRef.current as unknown as HTMLElement | null;
      node?.focus();
    }
  }, [selectedIcon, isWide]);

  const allIcons = useMemo(() => {
    const icons: (IconEntry & { nameLower: string; familyLower: string })[] = [];
    for (const [family, glyphs] of Object.entries(glyphmapIndex as GlyphmapIndex)) {
      const meta = iconFamilies[family];
      if (!meta) continue;
      const familyLower = family.toLowerCase();
      for (const [name, codepoint] of Object.entries(glyphs)) {
        icons.push({ name, codepoint, family, meta, nameLower: name.toLowerCase(), familyLower });
      }
    }
    return icons;
  }, []);

  const availableStyles = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(iconFamilies)
            .map((meta) => meta.style)
            .filter(Boolean),
        ),
      ).sort() as string[],
    [],
  );

  const availableFamilies = useMemo(
    () =>
      Object.entries(iconFamilies)
        .filter(([key]) => key in (glyphmapIndex as GlyphmapIndex))
        .sort(([, a], [, b]) => a.displayName.localeCompare(b.displayName)),
    [],
  );

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase().trim();
    // Build a regex where spaces match hyphens, spaces, or camelCase boundaries (zero-width)
    const queryRegex = q
      ? new RegExp(
          q
            .split(/\s+/)
            .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            .join('[-\\s]?'),
          'i',
        )
      : null;
    return allIcons.filter((icon) => {
      if (filters.families.length > 0 && !filters.families.includes(icon.family)) return false;
      if (filters.status !== 'all' && icon.meta.status !== filters.status) return false;
      if (filters.licence !== 'all' && icon.meta.licence !== filters.licence) return false;
      if (filters.styles.length > 0 && (!icon.meta.style || !filters.styles.includes(icon.meta.style))) return false;
      if (queryRegex && !queryRegex.test(icon.name) && !queryRegex.test(icon.family)) return false;
      return true;
    });
  }, [allIcons, filters]);

  const handleFilterChange = useCallback((update: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...update }));
  }, []);

  return (
    <View className="flex-1 bg-bg">
      <View className="z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <GradientText className="font-heading text-3xl font-bold sm:text-4xl" standalone>
          Icon Directory
        </GradientText>
        <Text className="mt-2 text-sm text-text-muted">
          {filtered.length.toLocaleString()} icons across {availableFamilies.length} font families
        </Text>

        {/* Search + filter button row */}
        <View className="mt-6 flex-row gap-3">
          <View className="flex-1">
            <SearchBar query={filters.query} onChange={(query) => handleFilterChange({ query })} />
          </View>
          {isMobile && (
            <Pressable
              onPress={() => setFiltersOpen(true)}
              className="rounded-lg border border-border bg-surface px-4 items-center justify-center"
            >
              <Feather name="sliders" size={18} color={colours.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Desktop filters — inline */}
        {!isMobile && (
          <View className="z-10 mt-4">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              availableStyles={availableStyles}
              availableFamilies={availableFamilies}
            />
          </View>
        )}

        {/* Mobile filters — bottom sheet */}
        {isMobile && filtersOpen && (
          <Modal visible transparent animationType="slide" onRequestClose={() => setFiltersOpen(false)}>
            <Pressable className="flex-1 bg-black/60" onPress={() => setFiltersOpen(false)} />
            <View className="bg-surface rounded-t-2xl p-6" style={{ maxHeight: '80%' }}>
              <View className="flex-row items-center justify-between mb-6">
                <Text className="font-heading text-lg font-bold text-text">Filters</Text>
                <Pressable onPress={() => setFiltersOpen(false)}>
                  <Feather name="x" size={20} color={colours.textMuted} />
                </Pressable>
              </View>
              <ScrollView>
                <FilterPanel
                  filters={filters}
                  onChange={handleFilterChange}
                  availableStyles={availableStyles}
                  availableFamilies={availableFamilies}
                  vertical
                />
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>

      {/* Content: grid + optional side panel */}
      <View className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 flex-row">
        {/* Icon grid */}
        <View className="flex-1 min-w-0">
          <IconGrid icons={filtered} selectedIcon={selectedIcon} onSelect={setSelectedIcon} />
        </View>

        {/* Desktop detail panel */}
        {isWide && (
          <View
            ref={detailPanelRef}
            className="ml-6 w-80 max-w-80 shrink-0"
            {...({
              tabIndex: -1,
              style: { outline: 'none' },
              onKeyDown: (e: any) => {
                if (e.key === 'Escape') setSelectedIcon(null);
              },
            } as any)}
          >
            {selectedIcon ? (
              <View className="pb-6 pr-2">
                <IconDetailPanel icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
              </View>
            ) : (
              <View className="items-center justify-center rounded-lg border border-border bg-bg-subtle p-8">
                <Feather name="grid" size={32} color={colours.textDim} />
                <Text className="mt-3 text-center text-sm text-text-dim">Select an icon to preview</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Mobile detail modal */}
      {!isWide && selectedIcon && (
        <Modal visible transparent animationType="slide" onRequestClose={() => setSelectedIcon(null)}>
          <Pressable className="flex-1 bg-black/60" onPress={() => setSelectedIcon(null)} />
          <View className="bg-surface rounded-t-2xl p-6 max-h-[80%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <IconDetailPanel icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DirectoryScreen;
