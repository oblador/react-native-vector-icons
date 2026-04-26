import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { CodeBlock } from '@/components/CodeBlock';
import { GradientText } from '@/components/GradientText';
import { Text } from '@/components/StyledText';

const GradientButton = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link href={href as '/'} asChild>
      <Pressable>
        <LinearGradient
          colors={['#06b6d4', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-lg px-6 py-3"
        >
          <Text className="text-sm font-semibold text-white">{children}</Text>
        </LinearGradient>
      </Pressable>
    </Link>
  );
};

const OutlineButton = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link href={href as '/'} asChild>
      <Pressable className="rounded-lg border border-border px-6 py-3">
        <Text className="text-sm font-semibold text-text-muted">{children}</Text>
      </Pressable>
    </Link>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 48 }}>
      <View className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <View className="max-w-3xl">
          {/* Hero heading */}
          <GradientText className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" standalone>
            React Native
          </GradientText>
          <Text className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-text">
            Vector Icons
          </Text>

          <Text className="mt-6 text-lg sm:text-xl text-text-muted max-w-xl">
            The most complete icon library for React Native. Thousands of icons across 34 font families, with per-family
            packages and static imports.
          </Text>

          {/* CTA buttons */}
          <View className="mt-8 flex-row flex-wrap gap-4">
            <GradientButton href="/directory">Browse Icons</GradientButton>
            <OutlineButton href="/getting-started">Get Started</OutlineButton>
          </View>
        </View>

        {/* Code snippet */}
        <View className="mt-12 w-fit">
          <CodeBlock language="tsx">
            {`import { Feather } from '@react-native-vector-icons/feather/static';

<Feather name="heart" size={24} color="#06b6d4" />`}
          </CodeBlock>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
