import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native-desktop';

import Icon from 'react-native-vector-icons/Ionicons';
import IconSetList from './IconSetList';
import IconList from './IconList';

const LEFT_PANEL_WIDTH = 300;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    width: LEFT_PANEL_WIDTH,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#999',
    fontSize: 20,
  },
});

class Welcome extends Component {
  render() {
    return (
      <View style={styles.welcomeWrapper}>
        <Text style={styles.welcomeText}>Choose an icon set on the left side</Text>
      </View>
    );
  }
}

class IconExplorer extends Component {

  constructor() {
    super();
    this.state = {
      iconSet: null,
      layout: Dimensions.get('window'),
    };
  }

  render() {
    const { iconSet, iconSetTitle, layout } = this.state;

    return (
      <View style={styles.container} onLayout={(e) => this.setState({layout: e.nativeEvent.layout})}>
        <View style={styles.leftPanel}>
          <IconSetList navigator={{ push: (route) => this.setState({ iconSet: route.iconSet }) }}/>
        </View>
        <View style={[styles.rightPanel, { width: layout.width - LEFT_PANEL_WIDTH }]}>
          {(iconSet
            ? (<IconList iconSet={iconSet} />)
            : (<Welcome />)
          )}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
