import { ColumnDef } from '@tanstack/react-table';
import { PokemonForList } from '../../interfaces';
import PokemonTable from './PokemonTable';
import { Suspense, useMemo } from 'react';
import PokemonImage from '../common/PokemonImage';
import { Link } from 'react-router-dom';
import usePokemonContext from '../../hooks/usePokemonContext';

interface PokemonTableProps {
  pokemonList: PokemonForList[];
}

const PokemonTableContainer = ({ pokemonList }: PokemonTableProps) => {
  const context = usePokemonContext();

  const { handleModifyPokedex } = context;

  const columns = useMemo<ColumnDef<PokemonForList>[]>(
    () => [
      { header: 'ID', accessorKey: 'id' },
      {
        header: 'Name',
        cell: (info) => (
          <Link to={`/pokemon/${info.row.original.name}`}>
            {info.row.original.name}
          </Link>
        ),
      },
      {
        header: 'Image',
        cell: (info) => (
          <Suspense fallback={'...'}>
            <PokemonImage
              src={info.row.original.sprite}
              alt={info.row.original.name}
              width={50}
            />
          </Suspense>
        ),
      },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Weight', accessorKey: 'weight' },
      { header: 'HP', accessorKey: 'hp' },
      { header: 'Speed', accessorKey: 'speed' },
      { header: 'Attack', accessorKey: 'attack' },
      { header: 'Defense', accessorKey: 'defense' },
      { header: 'Special Attack', accessorKey: 'specialAttack' },
      { header: 'Special Defense', accessorKey: 'specialDefense' },
      {
        header: 'Types',
        cell: (info) => info.row.original.types.join(' | '),
      },
      {
        header: 'Date Added',
        accessorKey: 'dateAdded',
        cell: (info) =>
          info.row.original.dateAdded
            ? new Date(info.row.original.dateAdded).toLocaleDateString()
            : 'N/A',
      },

      {
        header: 'In Pokedex',
        accessorKey: 'caught',
        cell: (info) => (
          <div className="flex flex-col">
            {info.row.original.caught ? 'Yes' : 'No'}
            <button
              onClick={() =>
                handleModifyPokedex(
                  info.row.original.caught,
                  info.row.original.id,
                  pokemonList
                )
              }
            >
              {info.row.original.caught ? 'Remove' : 'Add'}
            </button>
          </div>
        ),
      },
    ],
    [handleModifyPokedex, pokemonList]
  );
  return (
    <>
      <h1>Container</h1>
      <div className="overflow-x-scroll m-4">
        <PokemonTable columns={columns} data={pokemonList} />
      </div>
    </>
  );
};

export default PokemonTableContainer;
