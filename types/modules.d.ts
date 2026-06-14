// Ambient declarations for third-party libraries that ship without TypeScript
// types. (Libraries that bundle their own types — numeric-input, qrcode-scanner,
// phone-number-input, shadow-2 — are intentionally not redeclared here.)

declare module 'react-native-vector-icons/FontAwesome' {
  import {Component} from 'react';
  import {TextProps} from 'react-native';
  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }
  export default class Icon extends Component<IconProps> {}
}

declare module 'react-native-bouncy-checkbox-group' {
  import {ComponentType} from 'react';
  const BouncyCheckboxGroup: ComponentType<any>;
  export default BouncyCheckboxGroup;
  export type ICheckboxButton = Record<string, unknown>;
}
