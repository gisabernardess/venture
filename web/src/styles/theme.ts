import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '200': '#DDE3F0',
      '400': '#ABB1CC',
      '500': '#A8A8B3',
    },
    red: {
      '500': '#E51C44',
      '700': '#991F36',
    },
    blue: {
      '400': '#495BCC',
      '700': '#243189',
      '800': '#1D2766',
      '900': '#0E1647',
    },
    green: {
      '500': '#32BD50',
    },
  },
  fonts: {
    heading: 'Rajdhani',
    body: 'Inter',
  },
  styles: {
    global: {
      body: {
        bg: 'blue.900',
        color: 'gray.50',
      },
    },
  },
});
