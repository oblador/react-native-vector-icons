import { Text, View } from 'react-native';

type Props = {
  size?: number;
  color?: string;
};

export const PreviewStubIcon = ({ size = 24, color = '#666' }: Props) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderRadius: 4,
    }}
  >
    <Text style={{ fontSize: size * 0.25, color, fontWeight: '600' }}>PRO</Text>
  </View>
);
