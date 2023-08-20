// theme/index.js
import { extendTheme } from '@chakra-ui/react';

import { Button } from "./components/Button";
import { Pokemon } from "./components/Pokemon";
// Global style overrides
import colors from './foundations/colors';
import styles from './styles';

// Foundational style overrides
const overrides = {
  styles,
  colors,
  // Other foundational style overrides go here
  components: {
    Button,
    Pokemon
  },
}

export default extendTheme(overrides)