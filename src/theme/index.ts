// theme/index.js
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import { Button, Skeleton } from '@/theme/components';
import { colors } from '@/theme/foundations';

// Global style overrides
import styles from './styles';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

// Foundational style overrides
const overrides = {
  config,
  styles,
  colors,
  // Other foundational style overrides go here
  components: {
    Button,
    Skeleton,
  },
};

export default extendTheme(overrides);
