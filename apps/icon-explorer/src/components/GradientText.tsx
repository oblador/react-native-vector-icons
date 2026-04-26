import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import { Text } from '@/components/StyledText';
import { useTheme } from '@/theme/ThemeContext';

type Props = {
  className?: string;
  children: React.ReactNode;
  /** Use MaskedView gradient on native. Set to false when nested inside a Text. */
  standalone?: boolean;
};

/**
 * Text with a cyan→violet gradient.
 * Web: CSS background-clip (works everywhere).
 * Native standalone: MaskedView + LinearGradient.
 * Native inline (nested in Text): solid cyan fallback.
 */
export function GradientText({ className = '', children, standalone = false }: Props) {
  const { colours } = useTheme();

  if (Platform.OS === 'web') {
    return (
      <Text
        className={className}
        style={
          {
            backgroundImage: `linear-gradient(135deg, ${colours.accentCyan}, ${colours.accentViolet})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as any
        }
      >
        {children}
      </Text>
    );
  }

  if (standalone) {
    return (
      <MaskedView maskElement={<Text className={className}>{children}</Text>}>
        <LinearGradient colors={[colours.accentCyan, colours.accentViolet]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text className={className} style={{ opacity: 0 }}>
            {children}
          </Text>
        </LinearGradient>
      </MaskedView>
    );
  }

  return <Text className={`text-accent-cyan ${className}`}>{children}</Text>;
}
