/* eslint react/destructuring-assignment: 0 */
/* eslint react/no-multi-comp: 0 */
/* eslint import/no-named-as-default-member: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});

class ColoredView extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    pageText: PropTypes.string.isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func.isRequired,
      pop: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    Icon.getImageSource('md-arrow-back', 30).then(source =>
      this.setState({ backIcon: source })
    );
  }

  navigateToSubview = () => {
    this.props.navigator.push({
      component: ColoredView,
      title: this.props.pageText,
      leftButtonIcon: this.state.backIcon,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: this.props,
    });
  };

  render() {
    return (
      <View style={[styles.tabContent, { backgroundColor: this.props.color }]}>
        <Text style={styles.tabText}>{this.props.pageText}</Text>
        <TouchableOpacity onPress={this.navigateToSubview}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Tap Me</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class TabBarExample extends PureComponent {
  state = {
    selectedTab: 'home',
  };

  componentDidMount() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('ios-settings', 30).then(source =>
      this.setState({ gearIcon: source })
    );
  }

  renderContent(color, pageText) {
    if (!this.state.gearIcon) {
      return false;
    }
    const props = { color, pageText };
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: ColoredView,
          passProps: props,
          title: pageText,
          rightButtonIcon: this.state.gearIcon,
        }}
      />
    );
  }

  render() {
    return (
      <TabBarIOS tintColor="black" barTintColor="#3abeff">
        <Icon.TabBarItemIOS
          title="Home"
          iconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}
        >
          {this.renderContent('#414A8C', 'Home')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Outline"
          iconName="ios-checkbox-outline"
          selectedIconName="ios-checkbox"
          selected={this.state.selectedTab === 'checkbox'}
          onPress={() => {
            this.setState({
              selectedTab: 'checkbox',
            });
          }}
        >
          {this.renderContent('#090', 'Outline')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Starred"
          iconName="ios-star"
          selected={this.state.selectedTab === 'starred'}
          onPress={() => {
            this.setState({
              selectedTab: 'starred',
            });
          }}
        >
          {this.renderContent('#900', 'Starred')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-settings"
          iconColor="#ffffff"
          selectedIconColor="#000099"
          selected={this.state.selectedTab === 'settings'}
          renderAsOriginal
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}
        >
          {this.renderContent('#009', 'Settings')}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}
