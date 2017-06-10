// Type definitions for react-native-vector-icons
// Project: https://github.com/oblador/react-native-vector-icons
// Definitions by: Kyle Roach https://github.com/iRoachie

declare module 'react-native-vector-icons/*' {
  import * as React from 'react'
  import {
    ViewStyle,
    TouchableHighlightProperties,
    TouchableNativeFeedbackProperties
  } from 'react-native'

  interface IconProps {
    name: string
    size: number
    color?: string
  }

  interface IconButtonProps extends IconProps, TouchableHighlightProperties, TouchableNativeFeedbackProperties {
    borderRadius?: number
    iconStyle?: ViewStyle
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
