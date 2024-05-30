import React, { type ReactNode } from 'react';

import {
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  type ViewProps,
} from 'react-native';

import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { isDetoxSync } from 'react-native-is-detox';

// Import locally so we can mov it out
// Detox doesn't work when things are animating
import { createAnimatableComponent } from './animaitable';

import ICON_SETS from './icon-sets';

const AnimatableIcon = createAnimatableComponent(FontAwesome);

const STYLING: (Parameters<typeof FontAwesome>[0] & {
  containerStyle?: ViewProps['style'];
})[] = [
  { name: 'github', size: 40, color: '#333' },
  {
    name: 'heart',
    size: 30,
    color: 'white',
    containerStyle: {
      backgroundColor: '#e0284f',
      borderRadius: 23,
      paddingHorizontal: 8,
      paddingTop: 9,
      paddingBottom: 7,
    },
  },
  {
    name: 'star',
    size: 20,
    color: '#FF0000',
    containerStyle: {
      borderRadius: 20,
      padding: 7,
      borderWidth: 3,
      backgroundColor: '#FFDD00',
      borderColor: '#165E00',
    },
  },
  {
    name: 'font',
    size: 20,
    color: 'white',
    containerStyle: {
      borderRadius: 5,
      padding: 5,
      backgroundColor: '#47678e',
    },
  },
];

const INLINE = [
  {
    name: 'inline',
    children: (
      <Text>
        This text has <FontAwesome name="rocket" /> inline <FontAwesome name="hand-peace-o"> icons!</FontAwesome>
      </Text>
    ),
  },
];

const SYNCHROUNOUS = [
  {
    name: 'synchronous',
    children: (
      <>
        <Image source={FontAwesome.getImageSourceSync('check', 40, 'green')} style={{ width: 40, height: 40 }} />

        <Image
          source={FontAwesome6.getImageSourceSync('solid', 'check', 40, 'green')}
          style={{ width: 40, height: 40 }}
        />
      </>
    ),
  },
];

const ANIMATED = [
  {
    name: 'animated',
    children: (
      <AnimatableIcon
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        name="heart"
        size={30}
        color="#e0284f"
      />
    ),
  },
];

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
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
    height: StyleSheet.hairlineWidth,
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
  button: {
    padding: 4,
    backgroundColor: '#ADA6EA',
    width: 100,
  },
  buttonText: { color: 'white' },
});

export type IconName = keyof typeof ICON_SETS;
export type IconSet = (typeof ICON_SETS)[IconName];

const ItemSeparator = () => <View style={styles.separator} />;

const renderRow = (item: { children: ReactNode }) => <View style={styles.row}>{item.children}</View>;

const renderStyling = (item: (typeof STYLING)[number]) => (
  <View style={styles.row}>
    <View style={item.containerStyle}>
      <FontAwesome {...item} />
    </View>
  </View>
);

export const IconSetList = ({
  navigator,
  multiNavigator,
}: {
  navigator: (iconName: IconName) => void;
  multiNavigator: (iconName: IconName) => void;
}) => {
  const ref = React.useRef<SectionList>(null);

  const renderIcon = (itemName: IconName) => {
    const item = ICON_SETS[itemName];

    return (
      <TouchableHighlight
        testID={itemName}
        onPress={() => (item.meta ? multiNavigator(itemName) : navigator(itemName))}
        underlayColor="#eee"
      >
        <View style={styles.row}>
          <Text style={styles.text}>{itemName}</Text>
          <Text style={styles.glyphCount}>{item.glyphNames.length}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const iconNames = Object.keys(ICON_SETS) as IconName[];
  const scrollToEnd = () => {
    ref.current?.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: 6 });
  };

  const sections = [
    {
      title: 'ICON SETS',
      data: iconNames.map((itemName) => renderIcon(itemName)),
    },
    { title: 'INLINE', data: INLINE.map((item) => renderRow(item)) },
    {
      title: 'SYNCHROUNOUS',
      data: SYNCHROUNOUS.map((item) => renderRow(item)),
    },
    { title: 'ANIMATED', data: ANIMATED.map((item) => renderRow(item)) },
    { title: 'STYLING', data: STYLING.map((item) => renderStyling(item)) },
  ];

  if (isDetoxSync()) {
    sections.unshift({
      title: 'SCROLL',
      data: [
        <Pressable key="scroll" testID="scroll" onPress={scrollToEnd} style={styles.button}>
          <Text style={styles.buttonText}>Scroll to End</Text>
        </Pressable>,
      ],
    });

    sections.push({
      title: 'FOOTER',
      data: [
        <Text key="footer2" testID="footer">
          Footer
        </Text>,
      ],
    });
  }

  return (
    <SectionList
      ref={ref}
      sections={sections}
      renderItem={({ item }) => item}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      initialNumToRender={15}
    />
  );
};
