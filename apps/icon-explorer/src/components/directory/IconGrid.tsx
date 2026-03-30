import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from '@/components/StyledText';
import { iconRegistry } from '@/data/generated/icon-registry.generated';
import { IconCard } from './IconCard';
import type { IconEntry } from './types';

type Props = {
  icons: IconEntry[];
  selectedIcon: IconEntry | null;
  onSelect: (icon: IconEntry) => void;
};

export function IconGrid({ icons, selectedIcon, onSelect }: Props) {
  const { width } = useWindowDimensions();

  // Responsive columns: 3 on mobile, up to 7 on wide screens
  const numColumns = width >= 1280 ? 7 : width >= 1024 ? 6 : width >= 768 ? 5 : width >= 640 ? 4 : 3;

  const renderItem = useCallback(
    ({ item }: { item: IconEntry }) => {
      const Component = iconRegistry[item.family];
      if (!Component) return null;

      return (
        <IconCard
          icon={item}
          isSelected={selectedIcon?.name === item.name && selectedIcon?.family === item.family}
          onSelect={onSelect}
          IconComponent={Component}
        />
      );
    },
    [selectedIcon, onSelect],
  );

  if (icons.length === 0) {
    return (
      <View className="py-16 items-center">
        <Text className="text-lg text-text-muted">No icons found</Text>
        <Text className="mt-1 text-sm text-text-dim">Try adjusting your search or filters</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={icons}
      renderItem={renderItem}
      numColumns={numColumns}
      keyExtractor={(item) => `${item.family}-${item.name}`}
      contentContainerStyle={{ padding: 4 }}
    />
  );
}
