// Type definitions for react-native-vector-icons
// Project: https://github.com/oblador/react-native-vector-icons
// Definitions by: Kyle Roach https://github.com/iRoachie

declare module 'react-native-vector-icons/*' {
  import * as React from 'react'
  import {
    TextStyle,
    ViewStyle,
    TextProperties,
    TouchableHighlightProperties,
    TouchableNativeFeedbackProperties
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
    borderRadius?: number
    iconStyle?: ViewStyle
    style?: ViewStyle | TextStyle
    backgroundColor?: string
  }

  class Icon extends React.Component<IconProps, any> { }

  namespace Icon {
    export class Icon {
      static Button: React.Component<IconButtonProps, any>
    }
    export class Button extends React.Component<IconButtonProps, any> {}
  }

  export default Icon
}
