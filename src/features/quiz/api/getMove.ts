import { axios } from '@/lib/axios';

import { PokemonMove } from "../types";

export const getPokemonMove = (id : number | string): Promise<PokemonMove> => {
  return axios.get(`/move/${id}`)
};