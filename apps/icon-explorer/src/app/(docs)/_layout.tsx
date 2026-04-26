import { Slot } from 'expo-router';
import { ScrollView, View } from 'react-native';

const DocsLayout = () => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 48 }}>
      <View className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <Slot />
      </View>
    </ScrollView>
  );
};

export default DocsLayout;
