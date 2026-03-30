export type IconFamily = {
  /** Display name shown in the UI */
  displayName: string;
  /** npm package name (scoped) */
  packageName: string;
  /** Directory name under packages/ */
  packageDir: string;
  /** Named export from the package */
  componentName: string;
  /** URL to the upstream icon project */
  source: string;
  /** Maintenance status */
  status: 'active' | 'deprecated';
  /** Licence type */
  licence: 'free' | 'pro';
  /** Style variant (for multi-style families like FontAwesome) */
  style?: string;
};

/**
 * Maps glyphmap names (keys in glyphmapIndex.json) to their metadata.
 * This drives the directory filters, copy-to-clipboard, and icon sets page.
 */
export const iconFamilies: Record<string, IconFamily> = {
  // ── Actively maintained (free) ─────────────────────────────────────
  AntDesign: {
    displayName: 'Ant Design Icons',
    packageName: '@react-native-vector-icons/ant-design',
    packageDir: 'ant-design',
    componentName: 'AntDesign',
    source: 'https://ant.design/components/icon',
    status: 'active',
    licence: 'free',
  },
  Feather: {
    displayName: 'Feather Icons',
    packageName: '@react-native-vector-icons/feather',
    packageDir: 'feather',
    componentName: 'Feather',
    source: 'https://feathericons.com',
    status: 'active',
    licence: 'free',
  },
  Ionicons: {
    displayName: 'Ionicons',
    packageName: '@react-native-vector-icons/ionicons',
    packageDir: 'ionicons',
    componentName: 'Ionicons',
    source: 'https://ionic.io/ionicons',
    status: 'active',
    licence: 'free',
  },
  MaterialDesignIcons: {
    displayName: 'Material Design Icons',
    packageName: '@react-native-vector-icons/material-design-icons',
    packageDir: 'material-design-icons',
    componentName: 'MaterialDesignIcons',
    source: 'https://pictogrammers.com/library/mdi/',
    status: 'active',
    licence: 'free',
  },
  Octicons: {
    displayName: 'Octicons',
    packageName: '@react-native-vector-icons/octicons',
    packageDir: 'octicons',
    componentName: 'Octicons',
    source: 'https://primer.style/foundations/icons',
    status: 'active',
    licence: 'free',
  },
  Lucide: {
    displayName: 'Lucide Icons',
    packageName: '@react-native-vector-icons/lucide',
    packageDir: 'lucide',
    componentName: 'Lucide',
    source: 'https://lucide.dev/',
    status: 'active',
    licence: 'free',
  },

  // ── FontAwesome Free ───────────────────────────────────────────────
  FontAwesome: {
    displayName: 'FontAwesome 4',
    packageName: '@react-native-vector-icons/fontawesome',
    packageDir: 'fontawesome',
    componentName: 'FontAwesome',
    source: 'https://fontawesome.com/v4/icons',
    status: 'deprecated',
    licence: 'free',
  },
  FontAwesomeFreeSolid: {
    displayName: 'FontAwesome Free Solid',
    packageName: '@react-native-vector-icons/fontawesome-free-solid',
    packageDir: 'fontawesome-free-solid',
    componentName: 'FontAwesomeFreeSolid',
    source: 'https://fontawesome.com/search?o=r&s=solid&ip=free',
    status: 'active',
    licence: 'free',
    style: 'solid',
  },
  FontAwesomeFreeRegular: {
    displayName: 'FontAwesome Free Regular',
    packageName: '@react-native-vector-icons/fontawesome-free-regular',
    packageDir: 'fontawesome-free-regular',
    componentName: 'FontAwesomeFreeRegular',
    source: 'https://fontawesome.com/search?o=r&s=regular&ip=free',
    status: 'active',
    licence: 'free',
    style: 'regular',
  },
  FontAwesomeFreeBrands: {
    displayName: 'FontAwesome Free Brands',
    packageName: '@react-native-vector-icons/fontawesome-free-brands',
    packageDir: 'fontawesome-free-brands',
    componentName: 'FontAwesomeFreeBrands',
    source: 'https://fontawesome.com/search?o=r&s=brands&ip=free',
    status: 'active',
    licence: 'free',
    style: 'brands',
  },

  // ── FontAwesome Pro ────────────────────────────────────────────────
  FontAwesomeProSolid: {
    displayName: 'FontAwesome Pro Solid',
    packageName: '@react-native-vector-icons/fontawesome-pro-solid',
    packageDir: 'fontawesome-pro-solid',
    componentName: 'FontAwesomeProSolid',
    source: 'https://fontawesome.com/search?o=r&s=solid',
    status: 'active',
    licence: 'pro',
    style: 'solid',
  },
  FontAwesomeProRegular: {
    displayName: 'FontAwesome Pro Regular',
    packageName: '@react-native-vector-icons/fontawesome-pro-regular',
    packageDir: 'fontawesome-pro-regular',
    componentName: 'FontAwesomeProRegular',
    source: 'https://fontawesome.com/search?o=r&s=regular',
    status: 'active',
    licence: 'pro',
    style: 'regular',
  },
  FontAwesomeProLight: {
    displayName: 'FontAwesome Pro Light',
    packageName: '@react-native-vector-icons/fontawesome-pro-light',
    packageDir: 'fontawesome-pro-light',
    componentName: 'FontAwesomeProLight',
    source: 'https://fontawesome.com/search?o=r&s=light',
    status: 'active',
    licence: 'pro',
    style: 'light',
  },
  FontAwesomeProThin: {
    displayName: 'FontAwesome Pro Thin',
    packageName: '@react-native-vector-icons/fontawesome-pro-thin',
    packageDir: 'fontawesome-pro-thin',
    componentName: 'FontAwesomeProThin',
    source: 'https://fontawesome.com/search?o=r&s=thin',
    status: 'active',
    licence: 'pro',
    style: 'thin',
  },
  FontAwesomeProBrands: {
    displayName: 'FontAwesome Pro Brands',
    packageName: '@react-native-vector-icons/fontawesome-pro-brands',
    packageDir: 'fontawesome-pro-brands',
    componentName: 'FontAwesomeProBrands',
    source: 'https://fontawesome.com/search?o=r&s=brands',
    status: 'active',
    licence: 'pro',
    style: 'brands',
  },
  FontAwesomeProDuotoneSolid: {
    displayName: 'FontAwesome Pro Duotone Solid',
    packageName: '@react-native-vector-icons/fontawesome-pro-duotone-solid',
    packageDir: 'fontawesome-pro-duotone-solid',
    componentName: 'FontAwesomeProDuotoneSolid',
    source: 'https://fontawesome.com/search?o=r&s=duotone',
    status: 'active',
    licence: 'pro',
    style: 'duotone',
  },
  FontAwesomeProDuotoneRegular: {
    displayName: 'FontAwesome Pro Duotone Regular',
    packageName: '@react-native-vector-icons/fontawesome-pro-duotone-regular',
    packageDir: 'fontawesome-pro-duotone-regular',
    componentName: 'FontAwesomeProDuotoneRegular',
    source: 'https://fontawesome.com/search?o=r&s=duotone',
    status: 'active',
    licence: 'pro',
    style: 'duotone',
  },
  FontAwesomeProDuotoneLight: {
    displayName: 'FontAwesome Pro Duotone Light',
    packageName: '@react-native-vector-icons/fontawesome-pro-duotone-light',
    packageDir: 'fontawesome-pro-duotone-light',
    componentName: 'FontAwesomeProDuotoneLight',
    source: 'https://fontawesome.com/search?o=r&s=duotone',
    status: 'active',
    licence: 'pro',
    style: 'duotone',
  },
  FontAwesomeProDuotoneThin: {
    displayName: 'FontAwesome Pro Duotone Thin',
    packageName: '@react-native-vector-icons/fontawesome-pro-duotone-thin',
    packageDir: 'fontawesome-pro-duotone-thin',
    componentName: 'FontAwesomeProDuotoneThin',
    source: 'https://fontawesome.com/search?o=r&s=duotone',
    status: 'active',
    licence: 'pro',
    style: 'duotone',
  },
  FontAwesomeProSharpSolid: {
    displayName: 'FontAwesome Pro Sharp Solid',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-solid',
    packageDir: 'fontawesome-pro-sharp-solid',
    componentName: 'FontAwesomeProSharpSolid',
    source: 'https://fontawesome.com/search?o=r&s=sharp-solid',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpRegular: {
    displayName: 'FontAwesome Pro Sharp Regular',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-regular',
    packageDir: 'fontawesome-pro-sharp-regular',
    componentName: 'FontAwesomeProSharpRegular',
    source: 'https://fontawesome.com/search?o=r&s=sharp-regular',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpLight: {
    displayName: 'FontAwesome Pro Sharp Light',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-light',
    packageDir: 'fontawesome-pro-sharp-light',
    componentName: 'FontAwesomeProSharpLight',
    source: 'https://fontawesome.com/search?o=r&s=sharp-light',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpThin: {
    displayName: 'FontAwesome Pro Sharp Thin',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-thin',
    packageDir: 'fontawesome-pro-sharp-thin',
    componentName: 'FontAwesomeProSharpThin',
    source: 'https://fontawesome.com/search?o=r&s=sharp-thin',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpDuotoneSolid: {
    displayName: 'FontAwesome Pro Sharp Duotone Solid',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-duotone-solid',
    packageDir: 'fontawesome-pro-sharp-duotone-solid',
    componentName: 'FontAwesomeProSharpDuotoneSolid',
    source: 'https://fontawesome.com/search?o=r&s=sharp-duotone-solid',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpDuotoneRegular: {
    displayName: 'FontAwesome Pro Sharp Duotone Regular',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-duotone-regular',
    packageDir: 'fontawesome-pro-sharp-duotone-regular',
    componentName: 'FontAwesomeProSharpDuotoneRegular',
    source: 'https://fontawesome.com/search?o=r&s=sharp-duotone-regular',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpDuotoneLight: {
    displayName: 'FontAwesome Pro Sharp Duotone Light',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-duotone-light',
    packageDir: 'fontawesome-pro-sharp-duotone-light',
    componentName: 'FontAwesomeProSharpDuotoneLight',
    source: 'https://fontawesome.com/search?o=r&s=sharp-duotone-light',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },
  FontAwesomeProSharpDuotoneThin: {
    displayName: 'FontAwesome Pro Sharp Duotone Thin',
    packageName: '@react-native-vector-icons/fontawesome-pro-sharp-duotone-thin',
    packageDir: 'fontawesome-pro-sharp-duotone-thin',
    componentName: 'FontAwesomeProSharpDuotoneThin',
    source: 'https://fontawesome.com/search?o=r&s=sharp-duotone-thin',
    status: 'active',
    licence: 'pro',
    style: 'sharp',
  },

  // ── No longer maintained upstream (free) ───────────────────────────
  Entypo: {
    displayName: 'Entypo',
    packageName: '@react-native-vector-icons/entypo',
    packageDir: 'entypo',
    componentName: 'Entypo',
    source: 'http://entypo.com',
    status: 'deprecated',
    licence: 'free',
  },
  EvilIcons: {
    displayName: 'Evil Icons',
    packageName: '@react-native-vector-icons/evil-icons',
    packageDir: 'evil-icons',
    componentName: 'EvilIcons',
    source: 'http://evil-icons.io',
    status: 'deprecated',
    licence: 'free',
  },
  Fontisto: {
    displayName: 'Fontisto',
    packageName: '@react-native-vector-icons/fontisto',
    packageDir: 'fontisto',
    componentName: 'Fontisto',
    source: 'https://github.com/kenangundogan/fontisto',
    status: 'deprecated',
    licence: 'free',
  },
  Foundation: {
    displayName: 'Foundation Icons',
    packageName: '@react-native-vector-icons/foundation',
    packageDir: 'foundation',
    componentName: 'Foundation',
    source: 'http://zurb.com/playground/foundation-icon-fonts-3',
    status: 'active',
    licence: 'free',
  },
  MaterialIcons: {
    displayName: 'Material Icons',
    packageName: '@react-native-vector-icons/material-icons',
    packageDir: 'material-icons',
    componentName: 'MaterialIcons',
    source: 'https://fonts.google.com/icons?icon.set=Material+Icons',
    status: 'deprecated',
    licence: 'free',
  },
  SimpleLineIcons: {
    displayName: 'Simple Line Icons',
    packageName: '@react-native-vector-icons/simple-line-icons',
    packageDir: 'simple-line-icons',
    componentName: 'SimpleLineIcons',
    source: 'https://simplelineicons.github.io/',
    status: 'deprecated',
    licence: 'free',
  },
  Zocial: {
    displayName: 'Zocial',
    packageName: '@react-native-vector-icons/zocial',
    packageDir: 'zocial',
    componentName: 'Zocial',
    source: 'https://smcllns.github.io/css-social-buttons',
    status: 'deprecated',
    licence: 'free',
  },
};

/**
 * Maps glyphmap family names to their @font-face font-family name.
 * Most match directly (glyphmap name = font file name sans .ttf),
 * but FontAwesome variants use different file naming.
 */
const fontFamilyMap: Record<string, string> = {
  // Free FA uses shared font files
  FontAwesomeFreeSolid: 'fa-solid-900',
  FontAwesomeFreeRegular: 'fa-regular-400',
  FontAwesomeFreeBrands: 'fa-brands-400',
  // Pro FA per-style packages
  FontAwesomeProSolid: 'fa-solid-900',
  FontAwesomeProRegular: 'fa-regular-400',
  FontAwesomeProLight: 'fa-light-300',
  FontAwesomeProThin: 'fa-thin-100',
  FontAwesomeProBrands: 'fa-brands-400',
  FontAwesomeProDuotoneSolid: 'fa-duotone-900',
  FontAwesomeProDuotoneRegular: 'fa-duotone-regular-400',
  FontAwesomeProDuotoneLight: 'fa-duotone-light-300',
  FontAwesomeProDuotoneThin: 'fa-duotone-thin-100',
  FontAwesomeProSharpSolid: 'fa-sharp-solid-900',
  FontAwesomeProSharpRegular: 'fa-sharp-regular-400',
  FontAwesomeProSharpLight: 'fa-sharp-light-300',
  FontAwesomeProSharpThin: 'fa-sharp-thin-100',
  FontAwesomeProSharpDuotoneSolid: 'fa-sharp-duotone-solid-900',
  FontAwesomeProSharpDuotoneRegular: 'fa-sharp-duotone-regular-400',
  FontAwesomeProSharpDuotoneLight: 'fa-sharp-duotone-light-300',
  FontAwesomeProSharpDuotoneThin: 'fa-sharp-duotone-thin-100',
  // Legacy FA5/6 combined font names
  FontAwesome5_Solid: 'FontAwesome5_Solid',
  FontAwesome5_Brands: 'FontAwesome5_Brands',
  FontAwesome6_Solid: 'FontAwesome6_Solid',
  FontAwesome6_Brands: 'FontAwesome6_Brands',
};

/** Resolve the CSS font-family name for a given glyphmap family */
export function getFontFamily(glyphmapName: string): string {
  return fontFamilyMap[glyphmapName] ?? glyphmapName;
}
