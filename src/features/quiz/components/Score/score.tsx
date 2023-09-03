import {
  HStack,
  Stat,
  StatProps,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { LocalizationContext } from '@/providers';
import { useLanguageStore, useScoreStore } from '@/stores';

export function Score(props: StatProps) {
  const score = useScoreStore((state) => state.score);
  const language = useLanguageStore((state) => state.language);
  const Localization = useContext(LocalizationContext);

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Stat {...props}>
      <HStack color={fontColor}>
        <StatLabel>{Localization.getText(language, 'score.label')}</StatLabel>
        <StatNumber>{score}</StatNumber>
      </HStack>
    </Stat>
  );
}
