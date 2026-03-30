import { Linking, Platform, Pressable, View } from 'react-native';
import { Text } from '@/components/StyledText';

function FooterLink({ href, children }: { href: string; children: string }) {
  if (Platform.OS === 'web') {
    const WebA = 'a' as unknown as React.ComponentType<any>;
    return (
      <WebA
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Text className="text-sm text-text-dim">{children}</Text>
      </WebA>
    );
  }

  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      <Text className="text-sm text-text-dim">{children}</Text>
    </Pressable>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <View className="border-t border-border mt-16">
      <View className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 flex-row flex-wrap items-center justify-between gap-4">
        <Text className="text-sm text-text-dim">© {year} React Native Vector Icons. MIT Licence.</Text>
        <View className="flex-row items-center gap-3">
          <FooterLink href="https://github.com/sponsors/oblador">Sponsor</FooterLink>
          <Text className="text-text-dim">·</Text>
          <FooterLink href="https://github.com/oblador/react-native-vector-icons/releases">Changelog</FooterLink>
          <Text className="text-text-dim">·</Text>
          <FooterLink href="/llms.txt">llms.txt</FooterLink>
        </View>
      </View>
    </View>
  );
}
