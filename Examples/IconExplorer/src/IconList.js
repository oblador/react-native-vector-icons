import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter,
  FlatList,
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
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 45,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
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

const getFilteredGlyphNames = (iconSet, query) =>
  iconSet.glyphNames.filter(glyphNames =>
    glyphNames.find(glyphName => glyphName.indexOf(query) !== -1)
  );

const keyExtractor = item => item[0];

export default class IconList extends PureComponent {
  state = {
    filter: '',
  };

  componentDidMount() {
    if (Platform.OS === 'osx') {
      this.searchListner = DeviceEventEmitter.addListener('onSearchIcons', e =>
        this.setFilter(e.query)
      );
    }
  }

  componentWillUnmount() {
    if (this.searchListner) {
      this.searchListner.remove();
    }
  }

  setFilter(filter) {
    this.setState({
      filter: filter.toLowerCase(),
    });
  }

  handleSearchChange = event => {
    const filter = event.nativeEvent.text.toLowerCase();
    this.setFilter(filter);
  };

  renderListItem = ({ item }) => {
    const Icon = this.props.iconSet.component;
    return (
      <View style={styles.row}>
        <Icon name={item[0]} size={20} style={styles.icon} />
        <Text style={styles.text}>{item.join(', ')}</Text>
      </View>
    );
  };

  render() {
    const glyphNames = getFilteredGlyphNames(
      this.props.iconSet,
      this.state.filter
    );

    return (
      <View style={styles.container}>
        {Platform.OS !== 'osx' && (
          <View style={styles.searchBar}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              onChange={this.handleSearchChange}
              placeholder="Search an icon..."
              style={styles.searchBarInput}
            />
          </View>
        )}
        <FlatList
          data={glyphNames}
          style={styles.list}
          renderItem={this.renderListItem}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          keyExtractor={keyExtractor}
        />
      </View>
    );
  }
}
