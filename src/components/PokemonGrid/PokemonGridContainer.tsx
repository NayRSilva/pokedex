import { useState } from 'react';
import { PokemonForList } from '../../interfaces';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemonList: PokemonForList[];
}

const PokemonGridContainer = ({ pokemonList }: PokemonGridProps) => {
  const [selectedPokemons, setSelectedPokemons] = useState<number[]>([]);

  const handleModifySelectedPokemons = (id: number) => {
    if (selectedPokemons.includes(id)) {
      const newSelected = selectedPokemons.filter(
        (pokemonId) => pokemonId !== id
      );
      setSelectedPokemons(newSelected);
    } else {
      setSelectedPokemons([...selectedPokemons, id]);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex mb-4 justify-start">
        <button
          disabled={selectedPokemons.length === 0}
          className="p-2 rounded-lg text-sm text-sky-900 font-bold bg-orange-400 cursor-pointer hover:bg-orange-500 disabled:bg-gray-300 disabled:text-white disabled:cursor-auto"
        >
          Remove Pokemons
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={`${pokemon.name}-${pokemon.id}`}
            pokemon={pokemon}
            shouldShowIndicator={true}
            isSelected={selectedPokemons.includes(pokemon.id)}
            handleCheckboxChange={handleModifySelectedPokemons}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonGridContainer;
