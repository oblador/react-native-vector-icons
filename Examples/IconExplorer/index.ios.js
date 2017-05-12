import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

import IconSetList from './IconSetList';

const styles = ({
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
