'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;

var IconList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      filter: '',
      dataSource: ds.cloneWithRows(this.props.iconSet.glyphs),
    };
  },

  searchIcons(query) {
    var glyphs = this.props.iconSet.glyphs.filter(function(glyph) {
      for (var i = 0; i < glyph.length; i++) {
        if(glyph[i].indexOf(query) !== -1) {
          return true;
        }
      };
      return false;
    });
    this.setState({
      filter: query,
      dataSource: this.state.dataSource.cloneWithRows(glyphs),
    });
  },

  handleSearchChange(event) {
    var filter = event.nativeEvent.text.toLowerCase();
    this.searchIcons(filter);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChange={this.handleSearchChange}
            placeholder="Search an icon..."
            style={styles.searchBarInput}
          />
        </View>
        <View style={styles.separator} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
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
