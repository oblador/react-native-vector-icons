import React, { useCallback, useEffect, useState } from 'react';

import { BackHandler, LogBox, Pressable, Text, View } from 'react-native';

// We don't want ref error that react-native-owl is generating in our screenshots
LogBox.ignoreAllLogs(true);

import { Home, type IconName } from './Home';
import { IconList, MultiIconList } from './IconList';
import { TestMode } from './TestMode';

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

  const handleTestMode = () => setState({ view: 'TestMode' });

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
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#ffffff' }}>
      {renderContent()}
      <Pressable testID="TestMode" onPress={handleTestMode}>
        <Text>TEST MODE</Text>
      </Pressable>
    </View>
  );
};

export default App;
