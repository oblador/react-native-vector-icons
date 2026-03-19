import { useCallback, useEffect, useState } from 'react';
import { BackHandler, LogBox, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Home, type IconName } from './Home';
import { IconList, MultiIconList } from './IconList';
import { TestMode } from './TestMode';

// We don't want ref error that react-native-owl is generating in our screenshots
LogBox.ignoreAllLogs(true);

type NavType = {
  view: 'Home' | 'IconSet' | 'MultiIconSet' | 'TestMode';
  iconName?: IconName;
  iconStyle?: string;
};

const App = () => {
  const [state, setState] = useState<NavType>({ view: 'Home' });

  const navigateToIconSet = (iconName: IconName) => {
    setState({ view: 'IconSet', iconName, iconStyle: undefined });
  };

  const navigateToMultiIconSet = (iconName: IconName) => {
    setState({ view: 'MultiIconSet', iconName, iconStyle: undefined });
  };

  const navigateToIconSetWithStyle = (iconStyle: string, iconName: IconName) => {
    setState({ view: 'IconSet', iconName, iconStyle });
  };

  const handleTestMode = () =>
    setState((prevState) => {
      const newView = prevState.view === 'Home' ? 'TestMode' : 'Home';
      return { view: newView };
    });

  const handleHome = () => {
    setState({ view: 'Home', iconName: undefined, iconStyle: undefined });
  };

  const handleBackPress = useCallback(() => {
    if (state.view === 'IconSet' && state.iconStyle) {
      setState({ view: 'MultiIconSet', iconName: state.iconName, iconStyle: undefined });

      return true;
    }

    if (['IconSet', 'MultiIconSet', 'TestMode'].includes(state.view)) {
      setState({ view: 'Home', iconName: undefined, iconStyle: undefined });

      return true;
    }

    return false;
  }, [state]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return handler.remove;
  }, [handleBackPress]);

  const renderContent = () => {
    switch (state.view) {
      case 'Home':
        return <Home navigator={navigateToIconSet} multiNavigator={navigateToMultiIconSet} />;
      case 'IconSet':
        // @ts-expect-error We are doing some strange things
        return <IconList iconName={state.iconName} iconStyle={state.iconStyle} />;
      case 'MultiIconSet':
        // @ts-expect-error We are doing some strange things
        return <MultiIconList iconName={state.iconName} navigator={navigateToIconSetWithStyle} />;
      case 'TestMode':
        return <TestMode />;
      default:
        throw new Error('Invalid view');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1 }}>{renderContent()}</View>
        <View style={styles.buttonBar}>
          <Pressable
            testID="Home"
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleHome}
          >
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
          <Pressable
            testID="TestMode"
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleTestMode}
          >
            <Text style={styles.buttonText}>Test Mode</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default App;
