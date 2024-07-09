import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const $startColor = cssVar('skeleton-start-color');
const $endColor = cssVar('skeleton-end-color');

const quiz = defineStyle({
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'border.500',
  [$startColor.variable]: 'colors.background.100',
  [$endColor.variable]: 'colors.background.300',
  _dark: {
    borderColor: 'border.100',
    [$startColor.variable]: 'colors.background.700',
    [$endColor.variable]: 'colors.background.900',
  },
});

export const Skeleton = defineStyleConfig({
  variants: { quiz },
});
