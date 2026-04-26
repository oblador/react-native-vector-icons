import '../global.css';

import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';
import { JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono/700Bold';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { proFonts } from '@/data/generated/pro-fonts.generated';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

// Load typography and icon fonts so they're available on web via @font-face
const iconFonts: Record<string, any> = {
  ...proFonts,
  JetBrainsMono: JetBrainsMono_700Bold,
  JetBrainsMono_500Medium,
  Inter: Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
};

SplashScreen.preventAutoHideAsync();

const AppShell = () => {
  const { resolvedTheme, colours } = useTheme();
  const [fontsLoaded] = useFonts(iconFonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colours.bg }} edges={['top', 'bottom']}>
      <View className="flex-1 bg-bg">
        <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} backgroundColor="transparent" translucent />
        <Header />
        <View className="flex-1">
          <Slot />
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
