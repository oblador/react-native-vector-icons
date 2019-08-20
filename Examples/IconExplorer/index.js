import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import IconSetList from './IconSetList';
import IconList from './IconList';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
});

class IconListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerStyle: styles.header,
  });

  render() {
    const { iconSet } = this.props.navigation.state.params;

    return <IconList iconSet={iconSet} />;
  }
}

class IconExplorer extends React.Component {
  static navigationOptions = {
    title: 'Icon Explorer',
    headerStyle: styles.header,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <IconSetList
        navigator={{
          push({ iconSet, title }) {
            navigate('IconSet', { title, iconSet });
          },
        }}
      />
    );
  }
}

const AppNavigator = createStackNavigator({
  IconExplorer: { screen: IconExplorer },
  IconSet: { screen: IconListScreen },
});

const App = createAppContainer(AppNavigator);

AppRegistry.registerComponent('IconExplorer', () => App);
