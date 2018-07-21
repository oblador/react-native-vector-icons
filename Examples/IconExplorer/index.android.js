import React from 'react';
import {
  AppRegistry,
  BackAndroid,
  StyleSheet,
  ToolbarAndroid,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Navigator } from 'react-native-deprecated-custom-components';
import IconSetList from './IconSetList';
import IconList from './IconList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

let navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});

const RouteMapper = (route, navigationOperations) => {
  navigator = navigationOperations;
  if (route.name === 'list') {
    return (
      <View style={{ flex: 1 }}>
        <Ionicons.ToolbarAndroid
          style={styles.toolbar}
          titleColor="white"
          title={route.title}
        />
        <IconSetList navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'iconSet') {
    return (
      <View style={{ flex: 1 }}>
        <Ionicons.ToolbarAndroid
          actions={[]}
          navIconName="md-arrow-back"
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.title}
        />
        <IconList
          style={{ flex: 1 }}
          navigator={navigationOperations}
          iconSet={route.iconSet}
        />
      </View>
    );
  }
};

const initialRoute = {
  title: 'IconExplorer',
  name: 'list',
};

const IconExplorer = () => (
  <Navigator
    style={styles.container}
    initialRoute={initialRoute}
    configureScene={() => Navigator.SceneConfigs.FadeAndroid}
    renderScene={RouteMapper}
  />
);

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
