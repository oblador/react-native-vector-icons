'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Platform,
} = React;

var dismissKeyboard = require('dismissKeyboard');

var _ = require('lodash');

var IconList = require('./IconList');
var SocialButton = require('./SocialButton');
var Entypo = require('react-native-vector-icons/Entypo');
var EvilIcons = require('react-native-vector-icons/EvilIcons');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Foundation = require('react-native-vector-icons/Foundation');
var Ionicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Octicons = require('react-native-vector-icons/Octicons');
var Zocial = require('react-native-vector-icons/Zocial');

var ICON_SETS = _.map({
  Entypo,
  EvilIcons,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  Octicons,
  Zocial,
}, function(component, name) {
  return {
    name: name,
    component: component,
  };
}).map(function(iconSet) {
  // Some icons have multiple names, so group them by glyph
  var glyphMap = iconSet.component.glyphMap;
  iconSet.glyphs = _.values(_.groupBy(Object.keys(glyphMap), function(name) {
    return glyphMap[name];
  }));
  return iconSet;
});

var BUTTONS = [
  {
    text: 'Login with Facebook',
    icon: 'facebook',
    background: '#3b5998',
  },
  {
    text: 'Follow me on Twitter',
    icon: 'twitter',
    background: '#55acee',
  },
  {
    text: 'Fork on GitHub',
    icon: 'code-fork',
    background: '#ccc',
    color: '#000',
  }
];

var STYLING = [
  { name: 'github', size: 40, color: '#333' },
  { name: 'heart', size: 30, style: {
      color: 'white',
      backgroundColor: '#e0284f',
      borderRadius: 23,
      paddingHorizontal: 8,
      paddingTop: 9,
      paddingBottom: 7,
  } },
  { name: 'star', style: {
      fontSize: 20,
      color: '#FF0000',
      borderRadius: 20,
      padding: 5,
      borderWidth: 3,
      backgroundColor: '#FFDD00',
      borderColor: '#165E00',
  } },
  { name: 'font', size: 20, style: {
      color: 'white',
      borderRadius: 5,
      padding: 5,
      backgroundColor: '#47678e',
  } }
];

var IconSetsList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds.cloneWithRowsAndSections({
        iconSets: ICON_SETS,
        buttons: BUTTONS,
        styling: STYLING,
      }),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSectionHeader={this._renderSectionHeader}
        renderRow={this._renderRow}
        initialListSize={15}
      />
    );
  },

  _renderSectionHeader(data, section) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.toUpperCase()}
        </Text>
      </View>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    switch(sectionID) {
      case 'iconSets':
        return (
          <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="#eee">
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {rowData.name}
                </Text>
                <Text style={styles.glyphCount}>
                  {rowData.glyphs.length}
                </Text>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        );
      case 'buttons':
        return (
          <View>
            <View style={styles.row}>
              <SocialButton name={rowData.icon} background={rowData.background} color={rowData.color}>{rowData.text}</SocialButton>
            </View>
            <View style={styles.separator} />
          </View>
        );
      case 'styling':
        return (
          <View>
            <View style={styles.row}>
              <FontAwesome {...rowData} />
            </View>
            <View style={styles.separator} />
          </View>
        );
    };
  },

  _pressRow: function(rowID: number) {
    var iconSet = ICON_SETS[rowID];
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: iconSet.name,
        component: IconList,
        passProps: {iconSet},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: iconSet.name,
        name: 'iconSet',
        iconSet,
      });
    }
  },
});

var styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eee'
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  text: {
    flex: 6,
  },
  glyphCount: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'right',
  },
});

module.exports = IconSetsList;
