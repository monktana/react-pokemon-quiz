import {
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { useLocalization } from '@/hooks';
import { useScore } from '@/stores';

export function Score(props: StatProps) {
  const score = useScore();
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Stat {...props}>
      <HStack color={fontColor}>
        <StatLabel data-cy="score-label">{getText('score.label')}</StatLabel>
        <StatNumber data-cy="score-value">{score}</StatNumber>
      </HStack>
    </Stat>
  );
}
