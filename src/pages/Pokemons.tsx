import { Suspense } from 'react';
import PokemonListContainer from '../components/PokemonList/PokemonListContainer';

const Pokemons = () => {
  return (
    <>
      <h1 className="my-4">All 150 Pokemons</h1>
      <Suspense fallback={<h2>Loading</h2>}>
        <PokemonListContainer />
      </Suspense>
    </>
  );
};

export default Pokemons;
