import { cssVar, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = 
  createMultiStyleConfigHelpers(["container", "image", "infoContainer"]);

const $bg = cssVar("container-bg");
const $padding = cssVar("container-padding");
const $radius = cssVar("container-radius");
const $border = cssVar("card-border-width", "0");
const $borderColor = cssVar("card-border-color");

const baseStyleContainer = defineStyle({
  display: "flex",
  alignItems: "center",
  width: "full",
  padding: $padding.reference,
  borderRadius: $radius.reference,
  borderWidth: $border.reference,
  borderColor: $borderColor.reference,
  [$bg.variable]: "colors.background.500",
  backgroundColor: $bg.reference,
});
const baseStyleImage = defineStyle({
  boxSize: "200px"
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
      [$radius.variable]: "radii.md",
      [$padding.variable]: "space.1",
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
      [$radius.variable]: "radii.md",
      [$padding.variable]: "space.2",
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
      [$radius.variable]: "radii.base",
      [$padding.variable]: "space.4",
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