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
    var color = {};
    if(this.props.color) {
      color.color = this.props.color;
    }
    var background = {};
    if(this.props.background) {
      background.backgroundColor = this.props.background;
    }

    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight style={styles.touchable}>
            <Icon name={this.props.name} style={[styles.icon, color, background]}>
              <Text style={[styles.text, color]}>{this.props.children}</Text>
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
    borderRadius: 4,
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
    backgroundColor: 'transparent',
  },
});

module.exports = SocialButton;
