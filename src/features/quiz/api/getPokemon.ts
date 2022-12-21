import { axios } from '@/lib/axios';

import { Pokemon } from "../types";

export const getPokemon = (id: number | string): Promise<Pokemon> => {
  return axios.get(`/pokemon/${id}`)
};