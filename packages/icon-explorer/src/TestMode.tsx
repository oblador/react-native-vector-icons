import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AntD from '@react-native-vector-icons/ant-design';
import Entypo from '@react-native-vector-icons/entypo';
import EvilIcons from '@react-native-vector-icons/evil-icons';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome5Pro from '@react-native-vector-icons/fontawesome5-pro';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import FontAwesome6Pro from '@react-native-vector-icons/fontawesome6-pro';
import Fontisto from '@react-native-vector-icons/fontisto';
import Foundation from '@react-native-vector-icons/foundation';
import Ionicons from '@react-native-vector-icons/ionicons';
import Lucide from '@react-native-vector-icons/lucide';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons';
import Zocial from '@react-native-vector-icons/zocial';

import createFontelloIconSet from '@react-native-vector-icons/fontello';
import createIcoMoonIconSet from '@react-native-vector-icons/icomoon';

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

export const TestMode = () => {
  const iconConfig = [
    { Component: AntD, name: 'home', label: 'AntD' },
    { Component: Entypo, name: 'home', label: 'Entypo' },
    { Component: EvilIcons, name: 'archive', label: 'EvilIcons' },
    { Component: Feather, name: 'home', label: 'Feather' },
    { Component: FontAwesome, name: 'home', label: 'FontAwesome' },
    { Component: FontAwesome5, name: 'home', label: 'FontAwesome5', iconStyle: 'solid' },
    { Component: FontAwesome5Pro, name: 'home', label: 'FontAwesome5Pro' },
    { Component: FontAwesome6, name: 'house', label: 'FontAwesome6', iconStyle: 'solid' },
    { Component: FontAwesome6Pro, name: 'house', label: 'FontAwesome6Pro' },
    { Component: Fontello, name: 'home', label: 'Fontello' },
    { Component: Fontisto, name: 'home', label: 'Fontisto' },
    { Component: Foundation, name: 'home', label: 'Foundation' },
    { Component: IcoMoon, name: 'home', label: 'IcoMoon' },
    { Component: Ionicons, name: 'home', label: 'Ionicons' },
    { Component: Lucide, name: 'house', label: 'Lucide' },
    { Component: MaterialDesignIcons, name: 'home', label: 'MaterialDesignIcons' },
    { Component: MaterialIcons, name: 'home', label: 'MaterialIcons' },
    { Component: Octicons, name: 'home', label: 'Octicons' },
    { Component: SimpleLineIcons, name: 'home', label: 'SimpleLineIcons' },
    { Component: Zocial, name: 'email', label: 'Zocial' },
  ];

  return (
    <ScrollView testID="TestScreen" contentContainerStyle={{ padding: 20 }}>
      {iconConfig.map((config) => {
        const { Component, name, label, iconStyle } = config;

        return (
          <IconRow key={label} label={label}>
            {/* @ts-expect-error ignore */}
            <Component name={name} size={12} iconStyle={iconStyle} />
          </IconRow>
        );
      })}
    </ScrollView>
  );
};
