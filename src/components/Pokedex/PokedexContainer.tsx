import { useState } from 'react';
import PokemonTableContainer from '../PokemonTable/PokemonTableContainer';
import { PokemonForList } from '../../interfaces';
import PokemonGridContainer from '../PokemonGrid/PokemonGridContainer';
import Select from 'react-select';
import usePokemonContext from '../../hooks/usePokemonContext';
import { exportToCSV } from '../../utils/pokemonInfo';

const localStateName = 'isPokedexPokemonList';

const PokedexContainer = () => {
  const context = usePokemonContext();

  const [isTableView, setIsTableView] = useState<boolean>(true);
  const { pokemons: pokemonsPokedex, heighTypes } = context;
  const [nameFilter, setNameFilter] = useState<string>('');
  const [heightFilter, setHeightFilter] = useState<number | null>(null);
  const [dateAddedFilter, setDateAddedFilter] = useState<Date | null>(null);

  const pokemonsForList: PokemonForList[] = pokemonsPokedex.map((pokemon) => ({
    ...pokemon,
    caught: true,
  }));

  // Define options for height filter
  const heightOptions = heighTypes.map((height) => ({
    value: height,
    label: `${height} cm`,
  }));

  // Define options for date filter
  const dateOptions = Array.from(
    new Set(
      pokemonsForList
        .filter((pokemon) => !!pokemon.dateAdded)
        .map((pokemon) => pokemon.dateAdded?.toDateString())
    )
  ).map((date) => ({ value: date, label: date }));

  // Filter function
  const filteredPokemons = pokemonsForList.filter((pokemon) => {
    const matchesName = nameFilter
      ? pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const matchesHeight = heightFilter ? pokemon.height === heightFilter : true;
    const matchesDate = dateAddedFilter
      ? pokemon.dateAdded &&
        new Date(pokemon.dateAdded).toDateString() ===
          new Date(dateAddedFilter).toDateString()
      : true;

    return matchesName && matchesHeight && matchesDate;
  });

  return (
    <>
      <div className="flex w-full gap-5 justify-center my-16">
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

      <div className="w-full my-6">
        <button
          className="p-2 bg-sky-400 rounded-lg text-white"
          onClick={() => exportToCSV(pokemonsForList, 'myPokemons')}
        >
          Export to CSV
        </button>
      </div>
      <div className="flex w-full gap-5 mb-4">
        {/* Name Filter */}
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border p-2"
        />

        {/* Height Filter */}
        <Select
          options={heightOptions}
          onChange={(selectedOption) =>
            setHeightFilter(selectedOption?.value || null)
          }
          placeholder="Filter by height"
          isClearable
          className="w-1/3"
        />

        {/* Date Added Filter */}
        <Select
          options={dateOptions}
          onChange={(selectedOption) =>
            setDateAddedFilter(
              selectedOption?.value ? new Date(selectedOption.value) : null
            )
          }
          isClearable
          placeholder="Filter by date added"
          className="w-1/3"
        />
      </div>
      {isTableView ? (
        <>
          <PokemonTableContainer pokemonList={filteredPokemons} />
        </>
      ) : (
        <>
          <PokemonGridContainer pokemonList={filteredPokemons} />
        </>
      )}
    </>
  );
};

export default PokedexContainer;
