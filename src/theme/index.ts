// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import colors from './foundations/colors'

// Foundational style overrides

const overrides = {
  colors,
  // Other foundational style overrides go here
  components: {},
}

export default extendTheme(overrides)