import React, { useState, useEffect } from 'react';

import { BackHandler, StyleSheet, View } from 'react-native';

import { IconList, MultiIconList } from './IconList';
import { type IconName, IconSetList } from './IconSetList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
  },
});

const App = () => {
  const [currentView, setCurrentView] = useState<'IconExplorer' | 'IconSet' | 'MultiIconSet'>('IconExplorer');
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [selectedIconStyle, setSelectedIconStyle] = useState<string | undefined>(undefined);

  const navigateToIconSet = (iconName: IconName) => {
    setSelectedIcon(iconName);
    setCurrentView('IconSet');
  };

  const navigateToMultiIconSet = (iconName: IconName) => {
    setSelectedIcon(iconName);
    setCurrentView('MultiIconSet');
  };

  const navigateToIconSetWithStyle = (iconStyle: string, iconName: IconName) => {
    setSelectedIcon(iconName);
    setSelectedIconStyle(iconStyle);
    setCurrentView('IconSet');
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (currentView === 'IconSet' && selectedIconStyle) {
        setCurrentView('MultiIconSet');

        return true;
      }

      if (currentView === 'IconSet' || currentView === 'MultiIconSet') {
        setCurrentView('IconExplorer');
        setSelectedIcon(null);
        setSelectedIconStyle(undefined);

        return true;
      }
      return false;
    };
    const handler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return handler.remove;
  }, [currentView, selectedIconStyle]);

  const renderContent = () => {
    switch (currentView) {
      case 'IconExplorer':
        return <IconSetList navigator={navigateToIconSet} multiNavigator={navigateToMultiIconSet} />;
      case 'IconSet':
        return selectedIcon ? <IconList iconName={selectedIcon} iconStyle={selectedIconStyle} /> : null;
      case 'MultiIconSet':
        return selectedIcon ? <MultiIconList iconName={selectedIcon} navigator={navigateToIconSetWithStyle} /> : null;
      default:
        throw new Error('Invalid view');
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

export default App;
