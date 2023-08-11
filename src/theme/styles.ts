import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    '*, ::after, ::before': {
      boxSizing: 'border-box',
    },
    'html, body': {
      bgColor: 'background',
    },
    'img': {
      imageRendering: 'pixelated'
    }
  },
};

export default styles;
