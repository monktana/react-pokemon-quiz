// theme/index.js
import { extendTheme } from '@chakra-ui/react';

import { Button } from "./components/Button";
// Global style overrides
import colors from './foundations/colors';
import styles from './styles';

// Foundational style overrides
const overrides = {
  styles,
  colors,
  // Other foundational style overrides go here
  components: {
    Button
  },
}

export default extendTheme(overrides)