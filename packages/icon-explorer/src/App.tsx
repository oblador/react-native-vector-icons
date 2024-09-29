import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { BackHandler, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { IconList, MultiIconList } from './IconList';
import { type IconName, Home } from './Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
  },
});

type NavType = {
  view: 'Home' | 'IconSet' | 'MultiIconSet',
  iconName?: IconName,
  iconStyle?: string,
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

  const handleBackPress = useCallback(() => {
    if (state.view === 'IconSet' && state.iconStyle) {
      setState({ view: 'MultiIconSet', iconName: state.iconName, iconStyle: undefined });

      return true;
    }

    if (state.view === 'IconSet' || state.view === 'MultiIconSet') {
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
        return <IconList iconName={state.iconName} iconStyle={state.iconStyle} />;
      case 'MultiIconSet':
        return <MultiIconList iconName={state.iconName} navigator={navigateToIconSetWithStyle} />;
      default:
        throw new Error('Invalid view');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight testID="back" onPress={handleBackPress} underlayColor="#eee">
        <Text>Go Back</Text>
      </TouchableHighlight>
      {renderContent()}
    </View>
  );
};

export default App;
