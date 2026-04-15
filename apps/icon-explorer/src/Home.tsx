import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { getImageForFontSync } from '@react-native-vector-icons/get-image';
import { type ReactNode, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, type ViewProps } from 'react-native';

type ImageResult = ReturnType<typeof FontAwesome.getImageSourceSync>;

import { createAnimatableComponent } from './animatable';
import { iconSets as ICON_SETS, type IconName } from './IconSets';

// @ts-expect-error: We don't care this is wrong for the tests
const AnimatableIcon = createAnimatableComponent(FontAwesome);

const textNoLineHeight = getImageForFontSync('Hello', { fontFamily: 'Arial', size: 30, color: '#333' });
const textWithLineHeight = getImageForFontSync('Hello', {
  fontFamily: 'Arial',
  size: 30,
  color: '#333',
  lineHeight: 60,
});

const SyncRenderToImage = () => {
  const syncOldSignature = FontAwesome.getImageSourceSync('check', 40, '#e0284f');
  const syncNewSignature = FontAwesome.getImageSourceSync('check', { size: 40, color: '#1a8cff' });
  return (
    <>
      <Image source={syncOldSignature} />
      <Image source={syncNewSignature} />
    </>
  );
};
const AsyncGetImage = () => {
  const [oldSig, setOldSig] = useState<ImageResult | null>(null);
  const [newSig, setNewSig] = useState<ImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    FontAwesome.getImageSource('check', 40, 'rgba(128, 0, 255, 0.8)')
      .then(setOldSig)
      .catch((e: Error) => setError(e.message));
    FontAwesome.getImageSource('check', { size: 40, color: '#ff6347' })
      .then(setNewSig)
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return <Text style={{ color: 'red' }}>Error: {error}</Text>;
  }

  return (
    <>
      {oldSig && <Image source={oldSig} />}
      {newSig && <Image source={newSig} />}
    </>
  );
};

export const Home = ({
  navigator,
  multiNavigator,
}: {
  navigator: (iconName: IconName) => void;
  multiNavigator: (iconName: IconName) => void;
}) => {
  const iconNames = Object.keys(ICON_SETS) as IconName[];

  return (
    <ScrollView testID="scrollview">
      <Section title="INLINE">
        <Row>
          <Text>
            This text has <FontAwesome name="rocket" /> inline <FontAwesome name="hand-peace-o"> icons!</FontAwesome>
          </Text>
        </Row>
      </Section>

      <Section title="SYNC render to image">
        <Row>
          <SyncRenderToImage />
        </Row>
      </Section>

      <Section title="ASYNC render to image">
        <Row>
          <AsyncGetImage />
        </Row>
      </Section>

      <Section title="ANIMATED">
        <Row>
          <AnimatableIcon
            animation={{
              0: { transform: [{ scale: 1 }] },
              0.5: { transform: [{ scale: 1.3 }] },
              1: { transform: [{ scale: 1 }] },
            }}
            easing="ease-in-out"
            iterationCount="infinite"
            duration={800}
            name="heart"
            size={30}
            color="#e0284f"
          />
        </Row>
      </Section>

      <Section title="STYLING">
        <View style={[styles.row, { alignItems: 'center' }]}>
          {STYLING.map((item) => (
            <View key={item.name} style={[{ marginHorizontal: 8 }, item.containerStyle]}>
              <FontAwesome {...item} />
            </View>
          ))}
        </View>
      </Section>

      <Section title="GET-IMAGE: render text as image with lineHeight">
        <Row>
          <View style={{ backgroundColor: '#eef', marginHorizontal: 4 }}>
            <Image source={textNoLineHeight} />
          </View>
          <View style={{ backgroundColor: '#eef', marginHorizontal: 4 }}>
            <Image source={textWithLineHeight} />
          </View>
        </Row>
      </Section>

      <Section title="ICON SETS">
        {iconNames.map((name, i) => {
          const item = ICON_SETS[name];
          return (
            <Pressable key={name} testID={name} onPress={() => (item.meta ? multiNavigator(name) : navigator(name))}>
              {i > 0 && <View style={styles.separator} />}
              <View style={styles.row}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.glyphCount}>{item.glyphNames.length}</Text>
              </View>
            </Pressable>
          );
        })}
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text testID={title} style={styles.sectionHeaderTitle}>
        {title}
      </Text>
    </View>
    {children}
  </>
);

const Row = ({ children }: { children: ReactNode }) => <View style={styles.row}>{children}</View>;

type StylingItem = Parameters<typeof FontAwesome>[0] & { containerStyle?: ViewProps['style'] };
const STYLING: StylingItem[] = [
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
    containerStyle: { borderRadius: 5, padding: 5, backgroundColor: '#47678e' },
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
});
