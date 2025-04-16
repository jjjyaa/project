// styles/styled.d.ts

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      subText: string;
      border: string;
      white: string;
      gray: string;
    };
    fontSize: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
