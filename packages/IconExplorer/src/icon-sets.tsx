import AntD from '@react-native-vector-icons/ant-design';
import Entypo from '@react-native-vector-icons/entypo';
import EvilIcons from '@react-native-vector-icons/evil-icons';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome5Pro from '@react-native-vector-icons/fontawesome5-pro';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import FontAwesome6Pro from '@react-native-vector-icons/fontawesome6-pro';
import createFontelloIconSet from '@react-native-vector-icons/fontello';
import Fontisto from '@react-native-vector-icons/fontisto';
import Foundation from '@react-native-vector-icons/foundation';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Octicons from '@react-native-vector-icons/octicons';
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons';
import Zocial from '@react-native-vector-icons/zocial';

import AntDGlyphs from '@react-native-vector-icons/ant-design/glyphmaps/AntDesign.json';
import EntypoGlyphs from '@react-native-vector-icons/entypo/glyphmaps/Entypo.json';
import EvilIconsGlyphs from '@react-native-vector-icons/evil-icons/glyphmaps/EvilIcons.json';
import FeatherGlyphs from '@react-native-vector-icons/feather/glyphmaps/Feather.json';
import FontAwesomeGlyphs from '@react-native-vector-icons/fontawesome/glyphmaps/FontAwesome.json';
import FontAwesome5Glyphs from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5.json';
import FontAwesome5Meta from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_meta.json';
import FontAwesome5ProGlyphs from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro.json';
import FontAwesome5ProMeta from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_meta.json';
import FontAwesome6Glyphs from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6.json';
import FontAwesome6Meta from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6_meta.json';
import FontAwesome6ProGlyphs from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro.json';
import FontAwesome6ProMeta from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_meta.json';
import FontistoGlyphs from '@react-native-vector-icons/fontisto/glyphmaps/Fontisto.json';
import FoundationGlyphs from '@react-native-vector-icons/foundation/glyphmaps/Foundation.json';
import IoniconsGlyphs from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import MaterialIconsGlyphs from '@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import MaterialDesignIconsGlyphs from '@react-native-vector-icons/material-design-icons/glyphmaps/MaterialDesignIcons.json';
import OcticonsGlyphs from '@react-native-vector-icons/octicons/glyphmaps/Octicons.json';
import SimpleLineIconsGlyphs from '@react-native-vector-icons/simple-line-icons/glyphmaps/SimpleLineIcons.json';
import ZocialGlyphs from '@react-native-vector-icons/zocial/glyphmaps/Zocial.json';

import FontelloConfig from '../fontello.config.json';

const Fontello = createFontelloIconSet(FontelloConfig);
const FontelloGlyphs: Record<string, number> = {};
FontelloConfig.glyphs.forEach((glyph) => {
  FontelloGlyphs[glyph.css] = glyph.code;
});

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
  {
    name: 'Entypo',
    component: Entypo,
    glyphNames: groupGlyphNames(EntypoGlyphs),
  },
  {
    name: 'EvilIcons',
    component: EvilIcons,
    glyphNames: groupGlyphNames(EvilIconsGlyphs),
  },
  {
    name: 'Feather',
    component: Feather,
    glyphNames: groupGlyphNames(FeatherGlyphs),
  },
  {
    name: 'FontAwesome',
    component: FontAwesome,
    glyphNames: groupGlyphNames(FontAwesomeGlyphs),
  },
  {
    name: 'FontAwesome5',
    component: FontAwesome5,
    glyphNames: groupGlyphNames(FontAwesome5Glyphs),
    meta: FontAwesome5Meta,
  },
  {
    name: 'FontAwesome5Pro',
    component: FontAwesome5Pro,
    glyphNames: groupGlyphNames(FontAwesome5ProGlyphs),
    meta: FontAwesome5ProMeta,
  },
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
    name: 'Fontello',
    component: Fontello,
    glyphNames: groupGlyphNames(FontelloGlyphs),
  },
  {
    name: 'Fontisto',
    component: Fontisto,
    glyphNames: groupGlyphNames(FontistoGlyphs),
  },
  {
    name: 'Foundation',
    component: Foundation,
    glyphNames: groupGlyphNames(FoundationGlyphs),
  },
  {
    name: 'Ionicons',
    component: Ionicons,
    glyphNames: groupGlyphNames(IoniconsGlyphs),
  },
  {
    name: 'MaterialIcons',
    component: MaterialIcons,
    glyphNames: groupGlyphNames(MaterialIconsGlyphs),
  },
  {
    name: 'MaterialCommunityIcons',
    component: MaterialDesignIcons,
    glyphNames: groupGlyphNames(MaterialDesignIconsGlyphs),
  },
  {
    name: 'Octicons',
    component: Octicons,
    glyphNames: groupGlyphNames(OcticonsGlyphs),
  },
  {
    name: 'SimpleLineIcons',
    component: SimpleLineIcons,
    glyphNames: groupGlyphNames(SimpleLineIconsGlyphs),
  },
  {
    name: 'Zocial',
    component: Zocial,
    glyphNames: groupGlyphNames(ZocialGlyphs),
  },
];

export default iconSets;
