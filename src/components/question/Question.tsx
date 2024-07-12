import { Flex, Text } from '@chakra-ui/react';

import { Move, Pokemon } from '@/api/schema';
import { getResourceName, types, TypeTag } from '@/components';
import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';

type AttackProps = {
  pokemon: Pokemon;
  move: Move;
};

export function Question({ pokemon: attacker, move }: AttackProps) {
  const language = useLanguage();
  const { getTemplatedText } = useLocalization();

  return (
    <Flex
      data-testid="question"
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
        {getTemplatedText(
          'game.question.effectiveness',
          <Text key={attacker.species!.name}>
            {getResourceName(attacker.species!.names!, language)!}
          </Text>,
          <TypeTag
            key={move.type!.name}
            type={move.type!.name as types}
            text={move.names!}
            borderRadius="md"
          />
        )}
      </Flex>
    </Flex>
  );
}
