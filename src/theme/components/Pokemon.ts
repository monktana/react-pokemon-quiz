import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = 
  createMultiStyleConfigHelpers(["container", "image", "infoContainer"]);

const baseStyleContainer = defineStyle({
  display: "flex",
  alignItems: "center",
  width: "full",
  borderRadius: "md",
  borderWidth: "1px",
  borderColor: "border",
  backgroundColor: "background.500",
});
const baseStyleImage = defineStyle({
  boxSize: "200px",
});
const baseStyleInfoContainer = defineStyle({
  display: "flex",
  flexDir: "column",
  alignItems: "flex-start",
  width: "full",
  color: "font.100"
});

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  image: baseStyleImage,
  infoContainer: baseStyleInfoContainer
});

const sizes = {
  sm: definePartsStyle({
    container: {
      padding: 1,
    },
    image: {
      boxSize: "100px"
    },
    infoContainer: {
      gap: 1
    }
  }),
  md: definePartsStyle({
    container: {
      padding: 2,
    },
    image: {
      boxSize: "200px"
    },
    infoContainer: {
      gap: 2
    }
  }),
  lg: definePartsStyle({
    container: {
      padding: 4,
    },
    image: {
      boxSize: "300px"
    },
    infoContainer: {
      gap: 4
    }
  }),
};

const variantAttack = definePartsStyle({
  container: {
    flexDir: "row"
  }
});
const variantDefend = definePartsStyle({
  container: {
    flexDir: "row-reverse"
  }
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
    size: "md",
    variant: "attack"
  }
});