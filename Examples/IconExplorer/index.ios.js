/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var IconSetList = require('./IconSetList');

var IconExplorer = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'IconExplorer',
          component: IconSetList,
          passProps: {
            onExternalExampleRequested: (example) => {
              this.setState({ openExternalExample: example, });
            },
          }
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
