import { HStack, Stat, StatLabel, StatNumber, StatProps } from '@chakra-ui/react';

import { useLocalization } from '@/hooks';
import { useScore } from '@/stores';

export function Score(props: StatProps) {
  const score = useScore();
  const { getText } = useLocalization();

  return (
    <Stat {...props}>
      <HStack color="font.800" _dark={{ color: 'font.100' }}>
        <StatLabel data-testid="score-label">{getText('score.label')}</StatLabel>
        <StatNumber data-testid="score-value">{score}</StatNumber>
      </HStack>
    </Stat>
  );
}
