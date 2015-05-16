'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;
var _ = require('lodash');

var IconList = require('./IconList');

var ICON_SETS = [
  {
    name: 'FontAwesome',
    component: require('react-native-vector-icons/FontAwesome'),
    glyphs: require('react-native-vector-icons/glyph-maps/FontAwesome.json')
  },
  {
    name: 'Foundation',
    component: require('react-native-vector-icons/Foundation'),
    glyphs: require('react-native-vector-icons/glyph-maps/Foundation.json')
  },
  {
    name: 'Ionicons',
    component: require('react-native-vector-icons/Ionicons'),
    glyphs: require('react-native-vector-icons/glyph-maps/Ionicons.json')
  },
  {
    name: 'MaterialDesign',
    component: require('react-native-vector-icons/MaterialDesign'),
    glyphs: require('react-native-vector-icons/glyph-maps/MaterialDesign.json')
  },
  {
    name: 'Zocial',
    component: require('react-native-vector-icons/Zocial'),
    glyphs: require('react-native-vector-icons/glyph-maps/Zocial.json')
  },
].map(function(iconSet) {
  // Some icons have multiple names, so group them by glyph
  iconSet.glyphs = _.groupBy(Object.keys(iconSet.glyphs), function(name) {
    return iconSet.glyphs[name];
  });
  return iconSet;
});

var IconSetsList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(ICON_SETS),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="#eee">
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  _pressRow: function(rowID: number) {
    var rowData = ICON_SETS[rowID];
    this.props.navigator.push({
      title: rowData.name,
      component: IconList,
      passProps: { iconSet: rowData },
    });
  },
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

module.exports = IconSetsList;
