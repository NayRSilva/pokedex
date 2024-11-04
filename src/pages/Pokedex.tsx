import { Suspense } from 'react';
import PokedexContainer from '../components/Pokedex/PokedexContainer';
import Stats from '../components/Pokedex/Stats';

const Pokedex = () => {
  return (
    <>
      <h1 className="my-4">My Pokemons</h1>
      <Suspense fallback={'loading stats'}>
        <Stats />
      </Suspense>
      <PokedexContainer />
    </>
  );
};

export default Pokedex;
