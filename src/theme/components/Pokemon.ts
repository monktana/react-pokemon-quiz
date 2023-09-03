import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers([
  'container',
  'image',
  'infoContainer',
]);

const baseStyleContainer = defineStyle((props) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'full',
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: mode('border.500', 'border.100')(props),
  backgroundColor: mode('background.200', 'background.800')(props),
}));
const baseStyleImage = defineStyle({
  boxSize: '200px',
});
const baseStyleInfoContainer = defineStyle((props) => ({
  display: 'flex',
  flexDir: 'column',
  alignItems: 'flex-start',
  width: 'full',
  color: mode('font.800', 'font.100')(props),
}));

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
  image: baseStyleImage,
  infoContainer: baseStyleInfoContainer(props),
}));

const sizes = {
  sm: definePartsStyle({
    container: {
      padding: 1,
    },
    image: {
      boxSize: '100px',
    },
    infoContainer: {
      gap: 1,
    },
  }),
  md: definePartsStyle({
    container: {
      padding: 2,
    },
    image: {
      boxSize: '200px',
    },
    infoContainer: {
      gap: 2,
    },
  }),
  lg: definePartsStyle({
    container: {
      padding: 4,
    },
    image: {
      boxSize: '300px',
    },
    infoContainer: {
      gap: 4,
    },
  }),
};

const variantAttack = definePartsStyle({
  container: {
    flexDir: 'row',
  },
});
const variantDefend = definePartsStyle({
  container: {
    flexDir: 'row-reverse',
  },
});

const variants = {
  attack: variantAttack,
  defend: variantDefend,
};

export const Pokemon = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'attack',
  },
});
