// Type definitions for react-native-vector-icons
// Project: https://github.com/oblador/react-native-vector-icons
// Definitions by: Kyle Roach https://github.com/iRoachie

declare module 'react-native-vector-icons' {
  import * as React from 'react'
  import {
    TextStyle,
    ViewStyle,
    TextProperties,
    TouchableHighlightProperties,
    TouchableNativeFeedbackProperties,
    TabBarIOSProperties,
    ToolbarAndroidProperties
  } from 'react-native'

  interface IconProps extends TextProperties {
    /**
     * Size of the icon, can also be passed as fontSize in the style object.
     *
     * @default 12
     * @type {string}
     * @memberof IconProps
     */
    size: number

    /**
     * Name of the icon to show
     *
     * See Icon Explorer app
     * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
     * @type {string}
     * @memberof IconProps
     */
    name: string

    /**
     * Color of the icon
     *
     * @type {string}
     * @memberof IconProps
     */
    color?: string
  }

  interface IconButtonProps extends IconProps, TouchableHighlightProperties, TouchableNativeFeedbackProperties {
    /**
     * Text and icon color
     * Use iconStyle or nest a Text component if you need different colors.
     *
     * @default 'white'
     * @type {string}
     * @memberof IconButtonProps
     */
    color?: string

    /**
     * Border radius of the button
     * Set to 0 to disable.
     *
     * @default 5
     * @type {number}
     * @memberof IconButtonProps
     */
    borderRadius?: number

    /**
     * Styles applied to the icon only
     * Good for setting margins or a different color.
     *
     * @default {marginRight: 10}
     * @type {ViewStyle}
     * @memberof IconButtonProps
     */
    iconStyle?: ViewStyle

    /**
     * Style prop inherited from TextProperties and TouchableWithoutFeedbackProperties
     * Only exist here so we can have ViewStyle or TextStyle
     *
     * @type {(ViewStyle | TextStyle)}
     * @memberof IconButtonProps
     */
    style?: ViewStyle | TextStyle

    /**
     * Background color of the button
     *
     * @default '#007AFF'
     * @type {string}
     * @memberof IconButtonProps
     */
    backgroundColor?: string
  }

  type ImageSource = any

  interface TabBarIOSProps extends TabBarIOSProperties {
    /**
     * Name of the default icon (similar to TabBarIOS.Item icon)
     *
     * @type {string}
     * @memberof TabBarIOSProps
     */
    iconName: string

    /**
     * Name of the selected icon (similar to TabBarIOS.Item selectedIcon).
     *
     * @default iconName
     * @type {string}
     * @memberof TabBarIOSProps
     */
    selectedIconName: string

    /**
     * Size of the icon.
     *
     * @default 30
     * @type {number}
     * @memberof TabBarIOSProps
     */
    iconSize: number

    /**
     * Color of the icon
     *
     * @type {string}
     * @memberof TabBarIOSProps
     */
    iconColor: string

    /**
     * Color of the selected icon.
     *
     * @default iconColor
     * @type {string}
     * @memberof TabBarIOSProps
     */
    selectedIconColor: string
  }

  interface ToolbarAndroidProps extends ToolbarAndroidProperties {
    /**
     * Name of the navigation logo icon
     * (similar to ToolbarAndroid logo)
     *
     * @type {string}
     * @memberof ToolbarAndroidProps
     */
    logoName: string

    /**
     * Name of the navigation icon
     * (similar to ToolbarAndroid navIcon)
     *
     * @type {string}
     * @memberof ToolbarAndroidProps
     */
    navIconName: string

    /**
     * Name of the overflow icon
     * (similar to ToolbarAndroid overflowIcon)
     *
     * @type {string}
     * @memberof ToolbarAndroidProps
     */
    overflowIconName: string

    /**
     * Size of the icons
     *
     * @default 24
     * @type {number}
     * @memberof ToolbarAndroidProps
     */
    iconSize: number

    /**
     * Color of the icons
     *
     * @default 'black'
     * @type {string}
     * @memberof ToolbarAndroidProps
     */
    iconColor: string
  }

  class Icon extends React.Component<IconProps, any> { }

  /**
   * Returns your own custom font based on the glyphMap where the key is the icon name
   * and the value is either a UTF-8 character or it's character code. fontFamily is the name
   * of the font NOT the filename. Open the font in Font Book.app or similar to learn the name.
   * Optionally pass the third fontFile argument for android support, it should be a path
   * to the font file in you asset folder.
   *
   * @param glyphMap
   * @param fontFamily
   * @param fontFile
   */
  export function createIconSet(glyphMap: {}, fontFamily: string, fontFile?: string): Icon

  /**
   * Convenience method to create a custom font based on a fontello config file.
   * Don't forget to import the font as described above and drop the config.json
   * somewhere convenient in your project.
   *
   * Example usage
   * import { createIconSetFromFontello } from 'react-native-vector-icons';
   * import fontelloConfig from './config.json';
   * const Icon = createIconSetFromFontello(fontelloConfig);
   *
   * @see http://fontello.com
   * @export
   * @param {{}} config
   * @returns {Icon}
   */
  export function createIconSetFromFontello(config: {}): Icon

  /**
   * Convenience method to create a custom font from IcoMoon
   * Make sure you're using the Download option in IcoMoon, and use the .json file that's
   * included in the .zip you've downloaded. You'll also need to import the .ttf font
   * file into your project
   *
   * Example usage
   * import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
   * import icoMoonConfig from './config.json';
   * const Icon = createIconSetFromIcoMoon(icoMoonConfig);
   *
   * @see https://icomoon.io/app
   * @export
   * @param {{}} config
   * @returns {Icon}
   */
  export function createIconSetFromIcoMoon(config: {}): Icon

  namespace Icon {
    export default class Icon {
      static getImageSource(name: string, size: number, color: string): Promise<ImageSource>
    }

    export class ToolbarAndroid extends React.Component<ToolbarAndroidProps, any> { }
    export class TabBarIOS extends React.Component<TabBarIOSProps, any> { }
    export class Button extends React.Component<IconButtonProps, any> { }
  }

  export default Icon
}
