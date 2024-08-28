import React, { useEffect, useState } from 'react';

import {
  DeviceEventEmitter,
  FlatList,
  type NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  type TextInputChangeEventData,
  TouchableHighlight,
  View,
} from 'react-native';

import type { IconName, IconSet } from './IconSetList';
import ICON_SETS from './icon-sets';

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

const getFilteredGlyphNames = (iconStyle: string | undefined, iconSet: IconSet, query: string) => {
  const icons = iconStyle
    ? (iconSet.meta?.[iconStyle as keyof typeof iconSet.meta] || []).map((name) => [name])
    : iconSet.glyphNames;

  return icons.filter((glyphNames) => glyphNames.find((glyphName) => glyphName.indexOf(query) !== -1));
};

export const IconList = ({
  iconName,
  iconStyle = undefined,
}: {
  iconName: IconName;
  iconStyle?: string;
}) => {
  const iconSet = ICON_SETS[iconName];
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'macos') {
      return undefined;
    }

    const searchListner = DeviceEventEmitter.addListener('onSearchIcons', (e) => setFilter(e.query.toLowerCase()));

    return searchListner.remove;
  }, []);

  const handleSearchChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setFilter(event.nativeEvent.text.toLowerCase());

  const glyphNames = getFilteredGlyphNames(iconStyle, iconSet, filter);

  const Icon = iconSet.component;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={handleSearchChange}
          placeholder="Search an icon..."
          style={styles.searchBarInput}
        />
      </View>

      <FlatList
        data={glyphNames}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Icon iconStyle={iconStyle} name={item[0]} size={20} style={styles.icon} />
            <Text selectable style={styles.text}>
              {item.join(', ')}
            </Text>
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
  iconName,
  navigator,
}: {
  iconName: IconName;
  navigator: (iconStyle: string, iconName: IconName) => void;
}) => {
  const iconSet = ICON_SETS[iconName];
  if (!iconSet.meta) {
    throw new Error('Icon has no Meta how did we get here?');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(iconSet.meta)}
        style={styles.list}
        renderItem={({ item: iconStyle }) => (
          <TouchableHighlight testID={iconStyle} onPress={() => navigator(iconStyle, iconName)} underlayColor="#eee">
            <View style={styles.row}>
              <Text style={styles.text}>{iconStyle}</Text>
              <Text style={styles.glyphCount}>{iconSet.meta[iconStyle as keyof typeof iconSet.meta].length}</Text>
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
