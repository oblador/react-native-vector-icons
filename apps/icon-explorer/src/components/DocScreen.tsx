import { View } from 'react-native';
import { GradientText } from '@/components/GradientText';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const DocScreen = ({ title, children }: Props) => {
  return (
    <View>
      <GradientText className="font-heading text-4xl font-bold mb-4" standalone>
        {title}
      </GradientText>
      <View className="mt-6">{children}</View>
    </View>
  );
};
