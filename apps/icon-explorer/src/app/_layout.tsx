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
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

// Load typography and icon fonts so they're available on web via @font-face
const iconFonts: Record<string, any> = {
  JetBrainsMono: JetBrainsMono_700Bold,
  JetBrainsMono_500Medium,
  Inter: Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  AntDesign: require('@react-native-vector-icons/ant-design/fonts/AntDesign.ttf'),
  Entypo: require('@react-native-vector-icons/entypo/fonts/Entypo.ttf'),
  EvilIcons: require('@react-native-vector-icons/evil-icons/fonts/EvilIcons.ttf'),
  Feather: require('@react-native-vector-icons/feather/fonts/Feather.ttf'),
  FontAwesome: require('@react-native-vector-icons/fontawesome/fonts/FontAwesome.ttf'),
  Fontisto: require('@react-native-vector-icons/fontisto/fonts/Fontisto.ttf'),
  Foundation: require('@react-native-vector-icons/foundation/fonts/Foundation.ttf'),
  Ionicons: require('@react-native-vector-icons/ionicons/fonts/Ionicons.ttf'),
  Lucide: require('@react-native-vector-icons/lucide/fonts/Lucide.ttf'),
  MaterialDesignIcons: require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf'),
  MaterialIcons: require('@react-native-vector-icons/material-icons/fonts/MaterialIcons.ttf'),
  Octicons: require('@react-native-vector-icons/octicons/fonts/Octicons.ttf'),
  SimpleLineIcons: require('@react-native-vector-icons/simple-line-icons/fonts/SimpleLineIcons.ttf'),
  Zocial: require('@react-native-vector-icons/zocial/fonts/Zocial.ttf'),
};

SplashScreen.preventAutoHideAsync();

function AppShell() {
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
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
