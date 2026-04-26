import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/StyledText';

export type TabPanel = {
  label: string;
  content: React.ReactNode;
};

export const Tabs = ({ panels }: { panels: TabPanel[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (panels.length === 0) return null;
  const active = panels[activeIndex];

  return (
    <View className="my-4">
      <View className="flex-row border-b border-border">
        {panels.map((panel, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={`${index}-${panel.label}`}
              onPress={() => setActiveIndex(index)}
              className={`px-4 py-2 -mb-px border-b-2 ${isActive ? 'border-accent-cyan' : 'border-transparent'}`}
            >
              <Text className={`font-heading text-sm font-medium ${isActive ? 'text-accent-cyan' : 'text-text-muted'}`}>
                {panel.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View className="mt-4">{active.content}</View>
    </View>
  );
};
