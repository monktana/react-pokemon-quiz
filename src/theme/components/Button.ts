import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode, transparentize } from '@chakra-ui/theme-tools';

const variantPrimary = defineStyle((props) => {
  return {
    bg: mode('background.100', 'background.700')(props),
    color: mode('font.800', 'font.100')(props),
    _hover: {
      bg: mode(transparentize('background.100', 0.5), transparentize('background.700', 0.8))(props),
      _disabled: {
        cursor: 'disabled',
      },
    },
  };
});

const variants = {
  primary: variantPrimary,
};

export const Button = defineStyleConfig({
  variants,
  defaultProps: {
    variant: 'primary',
  },
});
