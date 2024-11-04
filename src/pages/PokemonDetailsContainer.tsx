import { useParams } from 'react-router-dom';

import PokemonFromApi from '../components/common/PokemonFromApi';
import { Suspense } from 'react';
import PokemonDetailedInfo from '../components/common/PokemonDetailedInfo';
import usePokemonContext from '../hooks/usePokemonContext';

const PokemonDetailsContainer = () => {
  const { name } = useParams();

  const context = usePokemonContext();

  const { pokemons } = context;
  console.log(name);
  const pokemonFromPokedex = pokemons.find((pokemon) => pokemon.name === name);

  return (
    <>
      {name && !pokemonFromPokedex ? (
        <Suspense fallback={'Loading Pokemon Details'}>
          <PokemonFromApi name={name} />
        </Suspense>
      ) : (
        pokemonFromPokedex && (
          <PokemonDetailedInfo pokemon={pokemonFromPokedex} />
        )
      )}
    </>
  );
};

export default PokemonDetailsContainer;
