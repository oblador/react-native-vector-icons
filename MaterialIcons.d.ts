import * as React from 'react'
import {
  IconProps,
  ImageSource,
  ToolbarAndroidProps,
  TabBarIOSProps,
  IconButtonProps,
} from './Icon'

declare module 'react-native-vector-icons/MaterialIcons' {
  class Icon extends React.Component<IconProps, any> {
    static getImageSource(
      name: string,
      size: number,
      color: string,
    ): Promise<ImageSource>
  }

  namespace Icon {
    export class ToolbarAndroid extends React.Component<
      ToolbarAndroidProps,
      any
    > {}
    export class TabBarIOS extends React.Component<TabBarIOSProps, any> {}
    export class Button extends React.Component<IconButtonProps, any> {}
  }
}

export as namespace Icon
