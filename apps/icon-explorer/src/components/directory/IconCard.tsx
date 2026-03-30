import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/StyledText';
import type { IconComponent } from '@/data/generated/icon-registry.generated';
import { useTheme } from '@/theme/ThemeContext';
import type { IconEntry } from './types';

type Props = {
  icon: IconEntry;
  isSelected: boolean;
  onSelect: (icon: IconEntry) => void;
  IconComponent: IconComponent;
};

export const IconCard = memo(function IconCard({ icon, isSelected, onSelect, IconComponent }: Props) {
  const { colours } = useTheme();

  return (
    <Pressable
      onPress={() => onSelect(icon)}
      className={`items-center gap-2 rounded-lg border p-3 m-1 ${
        isSelected ? 'border-accent-cyan bg-surface-hover' : 'border-border bg-surface'
      }`}
    >
      <View className="h-8 items-center justify-center">
        <IconComponent name={icon.name} size={28} color={colours.text} />
      </View>
      <Text className="w-full text-center text-xs text-text-muted" numberOfLines={1}>
        {icon.name}
      </Text>
      <Text className="text-center text-text-dim" style={{ fontSize: 10 }} numberOfLines={1}>
        {icon.meta.displayName}
      </Text>
    </Pressable>
  );
});
