import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { Move, Pokemon } from '@/api/schema';
import { getTemplateText } from '@/hooks';
import { useLanguageStore } from '@/stores';

import { getRessourceName } from '../pokemon/util';

type AttackProps = {
  pokemon: Pokemon;
  move: Move;
};

export function Question({ pokemon: attacker, move }: AttackProps) {
  const language = useLanguageStore((state) => state.language);

  const fontColor = useColorModeValue('font.800', 'font.100');
  const backgroundColor = useColorModeValue('background.200', 'background.800');
  const borderColor = useColorModeValue('border.500', 'border.100');

  return (
    <Flex
      data-cy="question-container"
      gap={1}
      alignItems="center"
      padding={2}
      width="full"
      rounded="md"
      color={fontColor}
      border="1px solid"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
    >
      <Text fontSize="2xl">
        {getTemplateText(
          language,
          'game.question.effectiveness',
          getRessourceName(attacker.species!.names!, language)!,
          getRessourceName(move.names!, language)!
        )}
      </Text>
    </Flex>
  );
}
