import { Link as ExpoLink, useRouter } from 'expo-router';
import { Linking, Platform, ScrollView, View } from 'react-native';
import { CodeBlock } from '@/components/CodeBlock';
import { Text } from '@/components/StyledText';
import { useTheme } from '@/theme/ThemeContext';

const HEADING_CLASSES = {
  1: 'font-heading text-4xl font-bold text-accent-cyan mt-12 mb-4',
  2: 'font-heading text-2xl font-bold text-text mt-12 mb-4 pb-2 border-b border-border',
  3: 'font-heading text-lg font-semibold text-accent-cyan mt-8 mb-3',
  4: 'font-heading text-base font-semibold text-text-muted mt-6 mb-2',
} as const;

export type HeadingLevel = keyof typeof HEADING_CLASSES;

export function Heading({ level, children, id }: { level: HeadingLevel; children: React.ReactNode; id?: string }) {
  return (
    <Text nativeID={id} className={HEADING_CLASSES[level]}>
      {children}
    </Text>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <Text className="text-text-muted mb-4 leading-relaxed">{children}</Text>;
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <Text className="font-semibold text-text">{children}</Text>;
}

export function Em({ children }: { children: React.ReactNode }) {
  return <Text className="italic">{children}</Text>;
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-mono text-accent-cyan bg-surface rounded px-1" style={{ fontSize: 13 }}>
      {children}
    </Text>
  );
}

export function Fence({ language, content }: { language: string; content: string }) {
  return <CodeBlock language={language}>{content}</CodeBlock>;
}

export function BulletList({ children }: { children: React.ReactNode }) {
  return <View className="mb-4">{children}</View>;
}

export function OrderedList({ children }: { children: React.ReactNode }) {
  return <View className="mb-4">{children}</View>;
}

export function ListItem({ children, marker }: { children: React.ReactNode; marker: string }) {
  return (
    <View className="flex-row ml-6 mb-1">
      <Text className="text-text-muted w-6">{marker}</Text>
      <View className="flex-1">{children}</View>
    </View>
  );
}

const ALERT_VARIANTS = {
  note: { label: 'NOTE', borderKey: 'accentCyan' as const },
  tip: { label: 'TIP', borderKey: 'accentCyan' as const },
  important: { label: 'IMPORTANT', borderKey: 'accentViolet' as const },
  warning: { label: 'WARNING', borderKey: 'warning' as const },
  caution: { label: 'CAUTION', borderKey: 'warning' as const },
};

export function Note({ variant, children }: { variant: keyof typeof ALERT_VARIANTS; children: React.ReactNode }) {
  const { colours } = useTheme();
  const config = ALERT_VARIANTS[variant] ?? ALERT_VARIANTS.note;

  return (
    <View
      className="my-4 rounded-lg p-4"
      style={{
        backgroundColor: colours.surface,
        borderLeftWidth: 4,
        borderLeftColor: colours[config.borderKey],
      }}
    >
      <Text className="font-bold text-text mb-1">{config.label}</Text>
      <View>{children}</View>
    </View>
  );
}

export function MarkdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  const isInternal = href.startsWith('./') || href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <ExpoLink href={href as '/'} asChild>
        <Text className="text-accent-cyan underline" onPress={() => navigateInternal(router, href)}>
          {children}
        </Text>
      </ExpoLink>
    );
  }

  return (
    <Text className="text-accent-cyan underline" onPress={() => Linking.openURL(href)}>
      {children}
    </Text>
  );
}

function navigateInternal(router: ReturnType<typeof useRouter>, href: string) {
  // Pass the full href (including any hash) to Expo Router — its memory history
  // preserves a hash that's already part of the path. We then scroll on web after
  // the new page mounts; on native there's no DOM/anchor concept.
  router.push(href as '/');

  if (Platform.OS !== 'web') return;

  const hashIdx = href.indexOf('#');
  if (hashIdx === -1) return;
  const id = href.slice(hashIdx + 1);

  // Wait until the new page has committed before looking up the anchor.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

export function MarkdownTable({ headers, rows }: { headers: React.ReactNode[]; rows: React.ReactNode[][] }) {
  const { colours } = useTheme();
  const colCount = headers.length;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: colCount }).map((_, ci) => (
          <View key={ci} style={{ minWidth: 120 }}>
            <View
              style={{
                backgroundColor: colours.surface,
                borderWidth: 1,
                borderColor: colours.border,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Text className="font-heading font-semibold text-text text-sm">{headers[ci]}</Text>
            </View>
            {rows.map((row, ri) => (
              <View
                key={ri}
                style={{
                  borderWidth: 1,
                  borderColor: colours.border,
                  borderTopWidth: 0,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <Text className="text-text-muted text-sm">{row[ci]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
