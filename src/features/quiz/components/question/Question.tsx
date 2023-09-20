import { Flex, Tag, TagLeftIcon, TagLabel, Text, useColorModeValue } from '@chakra-ui/react';

import { useLanguageStore } from '@/stores';

import { Move, Pokemon } from '../../types';
import { TypeIcon } from '../icons';
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
      <Text fontSize="3xl" data-cy="pokemon-name">{getRessourceName(attacker.names, language)}</Text>
      <Text fontSize="2xl"> used </Text>
      <Tag borderRadius="md" colorScheme={move.type.name} data-cy="attack-tag">
        <TagLeftIcon as={TypeIcon} type={move.type.name} data-cy="attack-tag-icon"/>
        <TagLabel data-cy="attack-tag-name">{getRessourceName(move.names, language)}</TagLabel>
      </Tag>
    </Flex>
  );
}
