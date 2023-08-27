import { Box, HStack, IconButton, Select } from "@chakra-ui/react";

import { GhostIcon } from "@/features/quiz/components/icons";
import { Languages } from "@/hooks/i18n";
import { useLanguageStore } from "@/stores";

export function Navbar() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <Box position="fixed" zIndex="overlay" width="full" background="background.500">
      <HStack align="center" justify="end" px={4}>
        <Select
          value={language}
          color="white"
          onChange={(event) => {
            setLanguage(event.target.value)
          }}
        >
          {Languages.map((language) => {
            return (
              <option key={language} value={language}>{language}</option>
            )
          })}
        </Select>
        <IconButton aria-label="change color mode" icon={<GhostIcon/>} />
      </HStack>
    </Box>
  )
}