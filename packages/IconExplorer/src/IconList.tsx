import React, { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  FlatList,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableHighlight,
  View,
} from 'react-native';
import { IconSet } from './IconSetList';

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
  glyphCount: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'right',
  },
});

const getFilteredGlyphNames = (
  iconTypeName: string | undefined,
  iconSet: IconSet,
  query: string
) => {
  const icons = iconTypeName
    ? (iconSet.meta?.[iconTypeName as keyof typeof iconSet.meta] || []).map(
        (name) => [name]
      )
    : iconSet.glyphNames;

  return icons.filter((glyphNames) =>
    glyphNames.find((glyphName) => glyphName.indexOf(query) !== -1)
  );
};

export const IconList = ({
  iconSet,
  iconTypeName = undefined,
}: {
  iconSet: IconSet;
  iconTypeName?: string;
}) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'macos') {
      return undefined;
    }

    const searchListner = DeviceEventEmitter.addListener('onSearchIcons', (e) =>
      setFilter(e.query.toLowerCase())
    );

    return searchListner.remove;
  }, []);

  const handleSearchChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => setFilter(event.nativeEvent.text.toLowerCase());

  const glyphNames = getFilteredGlyphNames(iconTypeName, iconSet, filter);

  const Icon = iconSet.component;

  return (
    <View style={styles.container}>
      {Platform.OS === 'macos' && (
        <View style={styles.searchBar}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            onChange={handleSearchChange}
            placeholder="Search an icon..."
            style={styles.searchBarInput}
          />
        </View>
      )}

      <FlatList
        data={glyphNames}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Icon
              iconTypeName={iconTypeName}
              name={item[0]}
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>{item.join(', ')}</Text>
          </View>
        )}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
};

export const MultiIconList = ({
  iconSet,
  navigator,
}: {
  iconSet: IconSet;
  navigator: (iconTypeName: string, iconSet: IconSet, title: string) => void;
}) => {
  if (!iconSet.meta) {
    throw new Error('Icon has no Meta how did we get here?');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(iconSet.meta)}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() =>
              navigator(item, iconSet, `${iconSet.name} - ${item}`)
            }
            underlayColor="#eee"
          >
            <View style={styles.row}>
              <Text style={styles.text}>{item}</Text>
              <Text style={styles.glyphCount}>
                {iconSet.meta[item as keyof typeof iconSet.meta].length}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
};
