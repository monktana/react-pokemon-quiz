import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const variantPrimary = defineStyle({
  bg: 'background.100',
  color: 'font.800',
  _hover: {
    bg: 'background.200',
  },
  _dark: {
    bg: 'background.700',
    color: 'font.100',
    _hover: {
      bg: 'background.800',
    },
  },
  _disabled: {
    cursor: 'not-allowed',
  },
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
