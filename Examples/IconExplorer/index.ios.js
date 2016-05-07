import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import IconSetList from './IconSetList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IconExplorer(props) {
  return (
    <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: 'IconExplorer',
        component: IconSetList,
      }}
      itemWrapperStyle={styles.itemWrapper}
    />
  );
}

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
