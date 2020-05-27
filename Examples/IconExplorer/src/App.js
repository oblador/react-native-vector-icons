/* eslint-disable max-classes-per-file */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IconSetList from './IconSetList';
import IconList from './IconList';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
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
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          style={styles.header}
          logoName="home"
          iconSize={20}
          iconColor="black"
          title="Icon Explorer"
          actions={[
            {
              title: 'Settings',
              iconName: 'settings',
              iconSize: 20,
              show: 'always',
            },
          ]}
        />
        <IconSetList
          navigator={{
            push({ iconSet, title }) {
              navigate('IconSet', { title, iconSet });
            },
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  IconExplorer: { screen: IconExplorer },
  IconSet: { screen: IconListScreen },
});

export default createAppContainer(AppNavigator);
