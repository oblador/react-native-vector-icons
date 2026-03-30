import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/StyledText';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg p-8">
      <Text className="text-6xl font-bold text-accent-cyan">404</Text>
      <Text className="mt-4 text-lg text-text-muted">Page not found</Text>
      <Link href="/" asChild>
        <Text className="mt-6 text-accent-cyan underline">Go home</Text>
      </Link>
    </View>
  );
}
