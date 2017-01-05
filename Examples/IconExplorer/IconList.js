import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from './react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    marginTop: (Platform.OS === 'android' ? 0 : 64),
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: (Platform.OS === 'android' ? 45 : 30),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    overflow: 'hidden',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    textAlign: 'center',
    marginRight: 10,
    width: 20,
  },
  text: {
    flex: 1,
  },
});

export default class IconList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: '',
      dataSource: ds.cloneWithRows(this.props.iconSet.glyphs),
    };
  }

  componentDidMount() {
    if (Platform.OS === 'osx') {
      this._searchListner =  DeviceEventEmitter.addListener('onSearchIcons',
        (e) => this.searchIcons(e.query.toLowerCase())
      );
      console.log({_searchListner: this._searchListner})
    }
  }

  componentWillUnmount() {
    if (this._searchListner) {
      this._searchListner.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    const glyphs = this.getFilteredGlyphs(nextProps.iconSet, this.state.filter);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(glyphs),
    });
  }

  getFilteredGlyphs(iconSet, query) {
    return iconSet.glyphs.filter(glyph => {
      for (let i = 0; i < glyph.length; i++) {
        if (glyph[i].indexOf(query) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchIcons(query) {
    const glyphs = this.getFilteredGlyphs(this.props.iconSet, query);

    this.setState({
      filter: query,
      dataSource: this.state.dataSource.cloneWithRows(glyphs),
    });
  }

  handleSearchChange(event) {
    const filter = event.nativeEvent.text.toLowerCase();
    this.searchIcons(filter);
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS !== 'osx' && (
          <View style={styles.searchBar}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              onChange={event => this.handleSearchChange(event)}
              placeholder="Search an icon..."
              style={styles.searchBarInput}
              onFocus={() =>
                this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
            />
          </View>
          )}
        <View style={styles.separator} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          initialListSize={20}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    const Icon = this.props.iconSet.component;
    return (
      <View>
        <View style={styles.row}>
          <Icon name={rowData[0]} size={20} style={styles.icon} />
          <Text style={styles.text}>
            {rowData.join(', ')}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }
}
