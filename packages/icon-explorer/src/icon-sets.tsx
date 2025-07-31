import { AntDesign } from '@react-native-vector-icons/ant-design';
import AntDesignGlyphs from '@react-native-vector-icons/ant-design/glyphmaps/AntDesign.json';
import { Entypo } from '@react-native-vector-icons/entypo';
import EntypoGlyphs from '@react-native-vector-icons/entypo/glyphmaps/Entypo.json';
import { EvilIcons } from '@react-native-vector-icons/evil-icons';
import EvilIconsGlyphs from '@react-native-vector-icons/evil-icons/glyphmaps/EvilIcons.json';
import { Feather } from '@react-native-vector-icons/feather';
import FeatherGlyphs from '@react-native-vector-icons/feather/glyphmaps/Feather.json';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import FontAwesomeGlyphs from '@react-native-vector-icons/fontawesome/glyphmaps/FontAwesome.json';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import FontAwesome5Glyphs from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5.json';
import FontAwesome5Meta from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_meta.json';
import { FontAwesome5Pro } from '@react-native-vector-icons/fontawesome5-pro';
import FontAwesome5ProGlyphs from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro.json';
import FontAwesome5ProMeta from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_meta.json';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import FontAwesome6Glyphs from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6.json';
import FontAwesome6Meta from '@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6_meta.json';
import { FontAwesome6Pro } from '@react-native-vector-icons/fontawesome6-pro';
import FontAwesome6ProGlyphs from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro.json';
import FontAwesome6ProMeta from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_meta.json';
import createFontelloIconSet from '@react-native-vector-icons/fontello';
import { Fontisto } from '@react-native-vector-icons/fontisto';
import FontistoGlyphs from '@react-native-vector-icons/fontisto/glyphmaps/Fontisto.json';
import { Foundation } from '@react-native-vector-icons/foundation';
import FoundationGlyphs from '@react-native-vector-icons/foundation/glyphmaps/Foundation.json';
import createIcoMoonIconSet from '@react-native-vector-icons/icomoon';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import IoniconsGlyphs from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { Lucide } from '@react-native-vector-icons/lucide';
import LucideGlyphs from '@react-native-vector-icons/lucide/glyphmaps/Lucide.json';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import MaterialDesignIconsGlyphs from '@react-native-vector-icons/material-design-icons/glyphmaps/MaterialDesignIcons.json';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import MaterialIconsGlyphs from '@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import { Octicons } from '@react-native-vector-icons/octicons';
import OcticonsGlyphs from '@react-native-vector-icons/octicons/glyphmaps/Octicons.json';
import { SimpleLineIcons } from '@react-native-vector-icons/simple-line-icons';
import SimpleLineIconsGlyphs from '@react-native-vector-icons/simple-line-icons/glyphmaps/SimpleLineIcons.json';
import { Zocial } from '@react-native-vector-icons/zocial';
import ZocialGlyphs from '@react-native-vector-icons/zocial/glyphmaps/Zocial.json';

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

const groupGlyphNames = (glyphMap: Record<string, number>) => {
  const result: Record<number, string[]> = {};

  Object.entries(glyphMap).forEach(([glyphName, glyphValue]) => {
    result[glyphValue] ||= [];

    result[glyphValue].push(glyphName);
  });

  return Object.values(result);
};

const iconSets = {
  AntD: { component: AntDesign, glyphNames: groupGlyphNames(AntDesignGlyphs), meta: undefined },
  Entypo: { component: Entypo, glyphNames: groupGlyphNames(EntypoGlyphs), meta: undefined },
  EvilIcons: { component: EvilIcons, glyphNames: groupGlyphNames(EvilIconsGlyphs), meta: undefined },
  Feather: { component: Feather, glyphNames: groupGlyphNames(FeatherGlyphs), meta: undefined },
  FontAwesome: { component: FontAwesome, glyphNames: groupGlyphNames(FontAwesomeGlyphs), meta: undefined },
  FontAwesome5: { component: FontAwesome5, glyphNames: groupGlyphNames(FontAwesome5Glyphs), meta: FontAwesome5Meta },
  FontAwesome5Pro: {
    component: FontAwesome5Pro,
    glyphNames: groupGlyphNames(FontAwesome5ProGlyphs),
    meta: FontAwesome5ProMeta,
  },
  FontAwesome6: { component: FontAwesome6, glyphNames: groupGlyphNames(FontAwesome6Glyphs), meta: FontAwesome6Meta },
  FontAwesome6Pro: {
    component: FontAwesome6Pro,
    glyphNames: groupGlyphNames(FontAwesome6ProGlyphs),
    meta: FontAwesome6ProMeta,
  },
  Fontello: { component: Fontello, glyphNames: groupGlyphNames(FontelloGlyphs), meta: undefined },
  Lucide: { component: Lucide, glyphNames: groupGlyphNames(LucideGlyphs), meta: undefined },
  Fontisto: { component: Fontisto, glyphNames: groupGlyphNames(FontistoGlyphs), meta: undefined },
  Foundation: { component: Foundation, glyphNames: groupGlyphNames(FoundationGlyphs), meta: undefined },
  IcoMoon: { component: IcoMoon, glyphNames: groupGlyphNames(IcoMoonGlyphs), meta: undefined },
  Ionicons: { component: Ionicons, glyphNames: groupGlyphNames(IoniconsGlyphs), meta: undefined },
  MaterialIcons: { component: MaterialIcons, glyphNames: groupGlyphNames(MaterialIconsGlyphs), meta: undefined },
  MaterialCommunityIcons: {
    component: MaterialDesignIcons,
    glyphNames: groupGlyphNames(MaterialDesignIconsGlyphs),
    meta: undefined,
  },
  Octicons: { component: Octicons, glyphNames: groupGlyphNames(OcticonsGlyphs), meta: undefined },
  SimpleLineIcons: { component: SimpleLineIcons, glyphNames: groupGlyphNames(SimpleLineIconsGlyphs), meta: undefined },
  Zocial: { component: Zocial, glyphNames: groupGlyphNames(ZocialGlyphs), meta: undefined },
};

export default iconSets;
