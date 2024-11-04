import { useState } from 'react';
import { PokedexPokemon } from '../../interfaces';
import PokemonImage from './PokemonImage';
import { useNavigate } from 'react-router-dom';
import usePokemonContext from '../../hooks/usePokemonContext';

interface PokemonDetail {
  pokemon: PokedexPokemon;
}

const PokemonDetailedInfo = ({ pokemon }: PokemonDetail) => {
  const formattedName = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1).toLowerCase()}`;
  const [isEditing] = useState(!pokemon.note);
  const [newNote, setNote] = useState(pokemon.note || '');
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNote(e.target.value);
  const navigate = useNavigate();

  const context = usePokemonContext();
  const { addNote } = context;

  const handleSaveNote = async () => {
    const newPokemon = { ...pokemon, note: newNote };
    await addNote(newPokemon); // Wait for addNote to complete
    navigate(0);
  };

  return (
    <div className="w-full mt-4">
      <h1>{formattedName}</h1>
      <div className="flex flex-wrap justify-center">
        <PokemonImage src={pokemon.sprite} alt={pokemon.name} width={200} />
        <div className="w-full">
          <p>Health: {pokemon.hp}</p>
          <p>Height:{pokemon.height}</p>
          <p>Weight:{pokemon.weight}</p>
          <p>Speed:{pokemon.speed}</p>
          <p>Attack:{pokemon.attack}</p>
          <p>Defense:{pokemon.defense}</p>
          <p>Sp Attacak:{pokemon.specialAttack}</p>
          <div>
            <p>
              <span>Types:</span> {pokemon.types.join(',')}
            </p>
          </div>
        </div>
        {pokemon.dateAdded && (
          <p> Added to Pokedex: {pokemon.dateAdded.toDateString()}</p>
        )}
      </div>

      {pokemon.dateAdded ? (
        <div className="w-full flex flex-wrap mb-12 p-12 justify-center">
          <h1 className="w-full text-sky-600 font-bold">Note:</h1>

          {isEditing ? (
            <>
              <div className="flex flex-wrap w-3/4 ml-8  ">
                <div className="w-full border-2 border-gray-400 rounded-lg">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-2 resize-none"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={handleNoteChange}
                  />
                </div>
                <div className="w-full mt-2">
                  <button
                    onClick={handleSaveNote}
                    className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                value={newNote}
                readOnly
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PokemonDetailedInfo;
