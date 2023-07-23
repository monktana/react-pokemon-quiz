import { Move } from "../../types";

export const getMoveName = (move: Move, locale: string) => {
  const name = move.names.find((name) => name.language.name === locale);
  if (!name) {
    return "unknown locale";
  }
  return name.name;
}