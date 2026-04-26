import { Slot } from 'expo-router';
import { View } from 'react-native';

const DirectoryLayout = () => {
  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default DirectoryLayout;
