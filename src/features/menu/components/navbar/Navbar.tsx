import { Box, HStack, IconButton } from "@chakra-ui/react";

import { GhostIcon } from "@/features/quiz/components/icons";

export function Navbar() {
  return (
    <Box position="fixed" zIndex="overlay" width="full" background="background.500">
      <HStack align="center" justify="end" px={4}>
        <IconButton aria-label="change color mode" icon={<GhostIcon/>} />
      </HStack>
    </Box>
  )
}