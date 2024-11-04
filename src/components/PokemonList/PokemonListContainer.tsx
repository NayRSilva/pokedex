import { useState } from 'react';
import { useListWithDetails } from '../../hooks/useListWithDetails';
import PokemonTableContainer from '../PokemonTable/PokemonTableContainer';
import { PokemonForList } from '../../interfaces';
import PokemonGridContainer from '../PokemonGrid/PokemonGridContainer';
import usePokemonContext from '../../hooks/usePokemonContext';

const PokemonListContainer = () => {
  const context = usePokemonContext();

  const localStateName = 'isTablePokemonList';

  const [isTableView, setIsTableView] = useState<boolean>(() => {
    const isTableFromLocalStorage = localStorage.getItem(localStateName);
    return isTableFromLocalStorage ? JSON.parse(isTableFromLocalStorage) : true;
  });
  const { pokemonListApi } = useListWithDetails();
  const { pokemons: pokemonsPokedex } = context;
  const pokedexPokemonIds = pokemonsPokedex.map((pokemon) => pokemon.id);
  const pokemonsForList: PokemonForList[] = pokemonListApi.map((pokemon) => ({
    ...pokemon,
    caught: pokedexPokemonIds.includes(pokemon.id),
  }));
  return (
    <>
      <div className="flex w-full justify-center gap-5">
        <button
          className={`${isTableView ? 'bg-slate-50 border-2 border-solid border-sky-500' : 'bg-zinc-100'} p-2 rounded-lg hover:bg-zinc-300`}
          onClick={() => {
            localStorage.setItem(localStateName, JSON.stringify(true));
            setIsTableView(true);
          }}
        >
          Table View
        </button>
        <button
          className={`${!isTableView ? 'bg-slate-50 border-2 border-solid border-sky-500' : 'bg-zinc-100'} p-2 rounded-lg hover:bg-zinc-300`}
          onClick={() => {
            localStorage.setItem(localStateName, JSON.stringify(false));

            setIsTableView(false);
          }}
        >
          Grid View
        </button>
      </div>
      {isTableView ? (
        <PokemonTableContainer pokemonList={pokemonsForList} />
      ) : (
        <PokemonGridContainer pokemonList={pokemonsForList} />
      )}
    </>
  );
};

export default PokemonListContainer;
