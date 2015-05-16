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

var IconList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.iconSet.glyphs),
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
    var Icon = this.props.iconSet.component;
    return (
      <View>
        <View style={styles.row}>
          <Icon name={rowData[0]} style={styles.icon} />
          <Text style={styles.text}>
            {rowData.join(', ')}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
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
  icon: {
    justifyContent: 'center',
    fontSize: 20,
    width: 20,
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

module.exports = IconList;
