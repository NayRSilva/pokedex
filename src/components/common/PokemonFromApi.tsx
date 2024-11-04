import { useGetPokemonByName } from '../../hooks/useGetPokemonByName';
import PokemonDetailedInfo from './PokemonDetailedInfo';

interface PokemonQuery {
  name: string;
}

const PokemonFromApi = ({ name }: PokemonQuery) => {
  const pokemonFetched = useGetPokemonByName(name);
  console.log(pokemonFetched);
  return pokemonFetched ? (
    <PokemonDetailedInfo pokemon={pokemonFetched?.pokemon} />
  ) : (
    <div>Only pokemons saved to pokedex can be accessed offline</div>
  );
};

export default PokemonFromApi;
