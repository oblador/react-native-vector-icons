/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  BackAndroid,
  Navigator,
  ToolbarAndroid,
} = React;

var Ionicons = require('react-native-vector-icons/Ionicons');
var IconSetList = require('./IconSetList');
var IconList = require('./IconList');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
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
          navIconName="android-arrow-back"
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
};
var IconExplorer = React.createClass({
  render: function() {
    var initialRoute = {
      title: 'IconExplorer',
      name: 'list'
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
