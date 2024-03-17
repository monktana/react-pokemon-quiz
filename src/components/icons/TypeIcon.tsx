import { IconProps } from '@chakra-ui/react';

import { BugIcon } from './Bug';
import { DarkIcon } from './Dark';
import { DragonIcon } from './Dragon';
import { ElectricIcon } from './Electric';
import { FairyIcon } from './Fairy';
import { FightingIcon } from './Fighting';
import { FireIcon } from './Fire';
import { FlyingIcon } from './Flying';
import { GhostIcon } from './Ghost';
import { GrassIcon } from './Grass';
import { GroundIcon } from './Ground';
import { IceIcon } from './Ice';
import { NormalIcon } from './Normal';
import { PoisonIcon } from './Poison';
import { PsychicIcon } from './Psychic';
import { RockIcon } from './Rock';
import { SteelIcon } from './Steel';
import { WaterIcon } from './Water';

type TypeName =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export const TypeIcon = ({ type, ...rest }: { type: TypeName } & IconProps) => {
  switch (type) {
    case 'bug':
      return <BugIcon name={type} {...rest} />;
    case 'dark':
      return <DarkIcon name={type} {...rest} />;
    case 'dragon':
      return <DragonIcon name={type} {...rest} />;
    case 'electric':
      return <ElectricIcon name={type} {...rest} />;
    case 'fairy':
      return <FairyIcon name={type} {...rest} />;
    case 'fighting':
      return <FightingIcon name={type} {...rest} />;
    case 'fire':
      return <FireIcon name={type} {...rest} />;
    case 'flying':
      return <FlyingIcon name={type} {...rest} />;
    case 'ghost':
      return <GhostIcon name={type} {...rest} />;
    case 'grass':
      return <GrassIcon name={type} {...rest} />;
    case 'ground':
      return <GroundIcon name={type} {...rest} />;
    case 'ice':
      return <IceIcon name={type} {...rest} />;
    case 'normal':
      return <NormalIcon name={type} {...rest} />;
    case 'poison':
      return <PoisonIcon name={type} {...rest} />;
    case 'psychic':
      return <PsychicIcon name={type} {...rest} />;
    case 'rock':
      return <RockIcon name={type} {...rest} />;
    case 'steel':
      return <SteelIcon name={type} {...rest} />;
    case 'water':
      return <WaterIcon name={type} {...rest} />;
    default:
      console.log(`no icon for type: ${type}`);
      break;
  }
};
