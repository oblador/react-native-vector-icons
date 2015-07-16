'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome')

var SocialButton = React.createClass({
  render: function() {
    var style = {};
    if(this.props.background) {
      style.backgroundColor = this.props.background;
    }
    if(this.props.color) {
      style.color = this.props.color;
    }
    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight style={styles.touchable}>
            <Icon name={this.props.name} style={[styles.icon, style]}>
              <Text style={[styles.text, style]}>{this.props.children}</Text>
            </Icon>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  touchable: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  icon: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    color: 'white',
    backgroundColor: '#999',
  },
  text: {
    marginLeft: 10,
    flex: 1,
    color: 'white',
    fontWeight: '600',
  },
});

module.exports = SocialButton;
