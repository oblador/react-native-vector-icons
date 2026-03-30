import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/StyledText';
import { Markdown } from './Markdown';

type TabSection = {
  label: string;
  content: string;
  subtabs?: {
    title: string;
    sections: { label: string; content: string }[];
  };
};

type Props = {
  title?: string;
  sections: TabSection[];
};

export function PlatformTabs({ title, sections }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (sections.length === 0) return null;

  const activeSection = sections[activeIndex];

  return (
    <View className="mt-6">
      {title && (
        <Text className="font-heading text-2xl font-bold text-text mt-12 mb-4 pb-2 border-b border-border">
          {title}
        </Text>
      )}

      {/* Tab buttons */}
      <View className="flex-row border-b border-border">
        {sections.map((section, index) => (
          <Pressable
            key={section.label}
            onPress={() => setActiveIndex(index)}
            className={`px-4 py-2 -mb-px border-b-2 ${
              index === activeIndex ? 'border-accent-cyan' : 'border-transparent'
            }`}
          >
            <Text
              className={`font-heading text-sm font-medium ${index === activeIndex ? 'text-accent-cyan' : 'text-text-muted'}`}
            >
              {section.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab content */}
      <View className="mt-4">
        <Markdown content={activeSection.content} />
        {activeSection.subtabs && (
          <PlatformTabs title={activeSection.subtabs.title} sections={activeSection.subtabs.sections} />
        )}
      </View>
    </View>
  );
}
