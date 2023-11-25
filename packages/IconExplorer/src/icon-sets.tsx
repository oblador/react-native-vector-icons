import AntD from '@react-native-vector-icons/antdesign';
// import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from '@react-native-vector-icons/evilicons';
// import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
// import FontAwesome5 from '@react-native-vector-icons/fontawesome5/FontAwesome5';
import {
  FontAwesome6,
  FontAwesome6Pro,
} from '@react-native-vector-icons/fontawesome6';
import Fontisto from '@react-native-vector-icons/fontisto';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Zocial from 'react-native-vector-icons/Zocial';
import AntDGlyphs from '@react-native-vector-icons/antdesign/glyphmaps/AntDesign.json';
// import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo.json';
import EvilIconsGlyphs from '@react-native-vector-icons/evilicons/glyphmaps/EvilIcons.json';
// import FeatherGlyphs from 'react-native-vector-icons/glyphmaps/Feather.json';
import FontAwesomeGlyphs from '@react-native-vector-icons/fontawesome/glyphmaps/FontAwesome.json';
// import FontAwesome5Glyphs from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5Free.json';
import FontAwesome6Glyphs from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6Free.json';
import FontAwesome6Meta from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6Free_meta.json';
import FontAwesome6ProGlyphs from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6Pro.json';
import FontAwesome6ProMeta from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6Pro_meta.json';
import FontistoGlyphs from '@react-native-vector-icons/fontisto/glyphmaps/Fontisto.json';
// import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation.json';
// import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons.json';
// import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
// import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
// import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons.json';
// import SimpleLineIconsGlyphs from 'react-native-vector-icons/glyphmaps/SimpleLineIcons.json';
// import ZocialGlyphs from 'react-native-vector-icons/glyphmaps/Zocial.json';
import React from 'react';

const a = <AntD name="down" />;
const b = <FontAwesome name="hourglass" />;
const c = <FontAwesome6 iconTypeName="solid" name='' />;

const groupGlyphNames = (glyphMap: Record<string, number>) => {
  const result: Record<number, string[]> = {};

  Object.entries(glyphMap).forEach(([glyphName, glyphValue]) => {
    result[glyphValue] ||= [];

    result[glyphValue].push(glyphName);
  });

  return Object.values(result);
};

const iconSets = [
  { name: 'AntD', component: AntD, glyphNames: groupGlyphNames(AntDGlyphs) },
  // { name: 'Entypo', component: Entypo, glyphNames: groupGlyphNames(EntypoGlyphs) },
  {
    name: 'EvilIcons',
    component: EvilIcons,
    glyphNames: groupGlyphNames(EvilIconsGlyphs),
  },
  // { name: 'Feather', component: Feather, glyphNames: groupGlyphNames(FeatherGlyphs) },
  {
    name: 'FontAwesome',
    component: FontAwesome,
    glyphNames: groupGlyphNames(FontAwesomeGlyphs),
  },
  // {
  //   name: 'FontAwesome5',
  //   component: FontAwesome5,
  //   glyphNames: groupGlyphNames(FontAwesome5Glyphs),
  // },
  {
    name: 'FontAwesome6',
    component: FontAwesome6,
    glyphNames: groupGlyphNames(FontAwesome6Glyphs),
    meta: FontAwesome6Meta,
  },
  {
    name: 'FontAwesome6Pro',
    component: FontAwesome6Pro,
    glyphNames: groupGlyphNames(FontAwesome6ProGlyphs),
    meta: FontAwesome6ProMeta,
  },
  {
    name: 'Fontisto',
    component: Fontisto,
    glyphNames: groupGlyphNames(FontistoGlyphs),
  },
  // { name: 'Foundation', component: Foundation, glyphNames: groupGlyphNames(FoundationGlyphs) },
  // { name: 'Ionicons', component: Ionicons, glyphNames: groupGlyphNames(IoniconsGlyphs) },
  // { name: 'MaterialIcons', component: MaterialIcons, glyphNames: groupGlyphNames(MaterialIconsGlyphs) },
  // { name: 'MaterialCommunityIcons', component: MaterialCommunityIcons, glyphNames: groupGlyphNames(MaterialCommunityIconsGlyphs) },
  // { name: 'Octicons', component: Octicons, glyphNames: groupGlyphNames(OcticonsGlyphs) },
  // { name: 'SimpleLineIcons', component: SimpleLineIcons, glyphNames: groupGlyphNames(SimpleLineIconsGlyphs) },
  // { name: 'Zocial', component: Zocial, glyphNames: groupGlyphNames(ZocialGlyphs) },
];

export default iconSets;
