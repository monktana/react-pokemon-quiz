import { Styles, mode } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: (props) => ({
    '*, ::after, ::before': {
      boxSizing: 'border-box',
    },
    'html, body': {
      bgColor: mode('background.300', 'background.900')(props),
    },
    img: {
      imageRendering: 'pixelated',
    },
  }),
};

export default styles;
