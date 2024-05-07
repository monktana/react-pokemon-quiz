import { Flex, Text } from '@chakra-ui/react';

import { Move, Pokemon } from '@/api/schema';
import { getRessourceName, types, TypeTag } from '@/components';
import { getTemplateText } from '@/hooks';
import { useLanguage } from '@/stores';

type AttackProps = {
  pokemon: Pokemon;
  move: Move;
};

export function Question({ pokemon: attacker, move }: AttackProps) {
  const language = useLanguage();

  return (
    <Flex
      data-cy="question"
      gap={1}
      alignItems="center"
      padding={2}
      width="full"
      rounded="md"
      color="font.800"
      border="1px solid"
      borderColor="border.500"
      backgroundColor="background.200"
      _dark={{
        color: 'font.100',
        borderColor: 'border.100',
        backgroundColor: 'background.800',
      }}
    >
      <Flex gap={2} fontSize="xl">
        {getTemplateText(
          language,
          'game.question.effectiveness',
          <Text>{getRessourceName(attacker.species!.names!, language)!}</Text>,
          <TypeTag type={move.type!.name as types} text={move.names!} borderRadius="md" />
        )}
      </Flex>
    </Flex>
  );
}
