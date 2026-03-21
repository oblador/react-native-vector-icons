import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AntDesign } from '@react-native-vector-icons/ant-design';
import { Entypo } from '@react-native-vector-icons/entypo';
import { EvilIcons } from '@react-native-vector-icons/evil-icons';
import { Feather } from '@react-native-vector-icons/feather';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import { FontAwesome5Pro, type FontAwesome5ProSolidIconName } from '@react-native-vector-icons/fontawesome5-pro';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { FontAwesome6Pro } from '@react-native-vector-icons/fontawesome6-pro';
import createFontelloIconSet from '@react-native-vector-icons/fontello';
import { Fontisto } from '@react-native-vector-icons/fontisto';
import { Foundation } from '@react-native-vector-icons/foundation';
import createIcoMoonIconSet from '@react-native-vector-icons/icomoon';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Lucide } from '@react-native-vector-icons/lucide';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Octicons } from '@react-native-vector-icons/octicons';
import { SimpleLineIcons } from '@react-native-vector-icons/simple-line-icons';
import { Zocial } from '@react-native-vector-icons/zocial';

import FontelloConfig from './configs/fontello.config.json';
import IcoMoonConfig from './configs/icomoon.config.json';

const Fontello = createFontelloIconSet(FontelloConfig);
const FontelloGlyphs: Record<string, number> = {};
FontelloConfig.glyphs.forEach((glyph) => {
  FontelloGlyphs[glyph.css] = glyph.code;
});

const IcoMoon = createIcoMoonIconSet(IcoMoonConfig);
const IcoMoonGlyphs: Record<string, number> = {};
IcoMoonConfig.icons.forEach((icon) => {
  icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
    IcoMoonGlyphs[name] = icon.properties.code;
  });
});

interface IconRowProps {
  label: string;
  children: ReactNode;
}

const IconRow = ({ label, children }: IconRowProps) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
    <Text>{label}:</Text>
    {children}
  </View>
);

/**
 * @public
 * Show knip ignores it
 */
export const OurTypeTestIcon = ({
  name,
  size = 24,
  color = '#000',
}: {
  size: number;
  color: string;
  name: FontAwesome5ProSolidIconName;
}) => <FontAwesome5Pro name={name} size={size} color={color} iconStyle="solid" />;

const icons = [
  { AntD: <AntDesign name="home" size={24} /> },
  { Entypo: <Entypo name="home" size={24} /> },
  { EvilIcons: <EvilIcons name="archive" size={24} /> },
  { Feather: <Feather name="home" size={24} /> },
  { FontAwesome: <FontAwesome name="home" size={24} /> },
  { FontAwesome5: <FontAwesome5 name="home" size={24} iconStyle="solid" /> },
  { FontAwesome5Pro: <FontAwesome5Pro name="home" size={24} /> },
  { FontAwesome6: <FontAwesome6 name="house" size={24} iconStyle="solid" /> },
  { FontAwesome6Pro: <FontAwesome6Pro name="house" size={24} /> },
  { Fontello: <Fontello name="home" size={24} /> },
  { Fontisto: <Fontisto name="home" size={24} /> },
  { Foundation: <Foundation name="home" size={24} /> },
  { IcoMoon: <IcoMoon name="home" size={24} /> },
  { Ionicons: <Ionicons name="home" size={24} /> },
  { Lucide: <Lucide name="house" size={24} /> },
  { MaterialDesignIcons: <MaterialDesignIcons name="home" size={24} /> },
  { MaterialIcons: <MaterialIcons name="home" size={24} /> },
  { Octicons: <Octicons name="home" size={24} /> },
  { SimpleLineIcons: <SimpleLineIcons name="home" size={24} /> },
  { Zocial: <Zocial name="email" size={24} /> },
];

export const TestMode = () => (
  <ScrollView testID="TestScreen" contentContainerStyle={{ padding: 20 }}>
    {icons.map((entry) => {
      const [label, node] = Object.entries(entry)[0];
      return (
        <IconRow key={label} label={label}>
          {node}
        </IconRow>
      );
    })}
  </ScrollView>
);
