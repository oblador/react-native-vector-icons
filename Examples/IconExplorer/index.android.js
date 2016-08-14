import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
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

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

function RouteMapper(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'list') {
    return (
      <View style={{flex: 1}}>
        <Ionicons.ToolbarAndroid
          style={styles.toolbar}
          titleColor="white"
          title={route.title} />
        <IconSetList navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'iconSet') {
    return (
      <View style={{flex: 1}}>
        <Ionicons.ToolbarAndroid
          actions={[]}
          navIconName="md-arrow-back"
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.title} />
        <IconList
          style={{flex: 1}}
          navigator={navigationOperations}
          iconSet={route.iconSet}
        />
      </View>
    );
  }
}

function IconExplorer(props) {
  const initialRoute = {
    title: 'IconExplorer',
    name: 'list',
  };

  return (
    <Navigator
      style={styles.container}
      initialRoute={initialRoute}
      configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      renderScene={RouteMapper}
    />
  );
}

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
