import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    '*, ::after, ::before': {
      boxSizing: 'border-box',
    },
    'html, body': {
      bgColor: 'gray.100',
    },
    'img': {
      imageRendering: 'pixelated'
    }
  },
};

export default styles;
