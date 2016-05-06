/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = require('react-native');

var IconSetList = require('./IconSetList');

var IconExplorer = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'IconExplorer',
          component: IconSetList
        }}
        itemWrapperStyle={styles.itemWrapper}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('IconExplorer', () => IconExplorer);
