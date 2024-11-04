import { BASESPRITE, getPokemonStat } from '../utils/pokemonInfo';
import { pokemonApi } from './config';

export const fetchAllPokemon = () => {
  return pokemonApi.listPokemons(0, 150).then((data) => data);
};

export const fetchPokemonByName = (name: string) => {
  return pokemonApi.getPokemonByName(name).then((pokemonDetails) => {
    return {
      id: pokemonDetails.id,
      name: name,
      sprite: pokemonDetails.sprites.front_default || BASESPRITE,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      hp: getPokemonStat(pokemonDetails.stats, 'hp'),
      speed: getPokemonStat(pokemonDetails.stats, 'speed'),
      attack: getPokemonStat(pokemonDetails.stats, 'attack'),
      defense: getPokemonStat(pokemonDetails.stats, 'defense'),
      specialAttack: getPokemonStat(pokemonDetails.stats, 'special-attack'),
      specialDefense: getPokemonStat(pokemonDetails.stats, 'special-defense'),
      types: pokemonDetails.types.map((type) => type.type.name),
    };
  });
};

export const fetchPokemonsWithDetails = () => {
  return fetchAllPokemon().then((data) => {
    const pokemonList = data.results;

    return Promise.all(
      pokemonList.map((pokemon) => fetchPokemonByName(pokemon.name))
    ).then((detailedPokemonList) => ({
      total: data.count,
      pokemonList: detailedPokemonList,
    }));
  });
};
