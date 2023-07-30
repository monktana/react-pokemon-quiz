// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import colors from './foundations/colors'
import styles from './styles'

// Foundational style overrides

const overrides = {
  styles,
  colors,
  // Other foundational style overrides go here
  components: {},
}

export default extendTheme(overrides)