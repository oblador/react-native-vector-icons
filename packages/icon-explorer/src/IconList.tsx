import React, { useEffect, useState } from 'react';

import {
  DeviceEventEmitter,
  FlatList,
  type NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputChangeEventData,
  View,
} from 'react-native';

import type { IconName, IconSet } from './Home';
import ICON_SETS from './icon-sets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#444',
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
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    textAlign: 'center',
    marginRight: 10,
    width: 20,
  },
  heading: {
    color: '#000',
    fontWeight: '800',
    marginLeft: 10,
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
    ? // @ts-expect-error because we don't export the glyphmap
      (iconSet.meta?.[iconStyle as keyof typeof iconSet.meta] || []).map((name) => [name])
    : iconSet.glyphNames;

  // @ts-expect-error because we don't export the glyphmap
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
      <Text style={styles.heading}>
        {iconName}
        {iconStyle ? ` - ${iconStyle}` : ''}
      </Text>
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
            {/* @ts-expect-error because we are doing magic */}
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
    throw new Error(`Icon ${iconName} has no Meta how did we get here?`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{iconName}</Text>
      <FlatList
        data={Object.keys(iconSet.meta)}
        style={styles.list}
        renderItem={({ item: iconStyle }) => (
          <Pressable testID={iconStyle} onPress={() => navigator(iconStyle, iconName)}>
            <View style={styles.row}>
              <Text style={styles.text}>{iconStyle}</Text>
              <Text style={styles.glyphCount}>{iconSet.meta[iconStyle as keyof typeof iconSet.meta].length}</Text>
            </View>
          </Pressable>
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
