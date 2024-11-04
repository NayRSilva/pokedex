import { Tooltip } from 'react-tooltip';
import { PokemonForList } from '../../interfaces';
import { Link } from 'react-router-dom';
import usePokemonContext from '../../hooks/usePokemonContext';

interface PokemonCardProps {
  pokemon: PokemonForList;
  shouldShowIndicator: boolean;

  isSelected?: boolean;
  handleCheckboxChange: (id: number) => void;
}

const PokemonCard = ({
  pokemon,
  shouldShowIndicator,
  isSelected,
  handleCheckboxChange,
}: PokemonCardProps) => {
  const context = usePokemonContext();

  const { addPokemon, removePokemon } = context;
  return (
    <>
      <div className="w-1/8 bg-slate-100 p-4 flex flex-col items-center justify-center rounded-lg">
        <div className="w-full min-h-6 p-2rounded-md text-start my-2 flex justify-between">
          {shouldShowIndicator && pokemon.caught ? (
            <>
              <div
                data-tooltip-id={`indicator-${pokemon.name}`}
                className="bg-green-700 rounded-[100%] mt-2 w-4 h-4 after:content-['']"
              ></div>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(pokemon.id)}
                  className="mr-2"
                />
              </label>
            </>
          ) : null}
        </div>
        <div className="w-full flex justify-center">
          <img src={pokemon.sprite} alt={pokemon.name} width={100} />
        </div>
        <Link to={`/pokemon/${pokemon.name}`}>
          <h1 className=" text-sky-900 font-semibold">{pokemon.name}</h1>
        </Link>
        {pokemon.caught ? (
          <button
            className="p-2 mt-2 rounded-lg text-sm text-sky-900 font-bold bg-orange-400 cursor-pointer hover:bg-orange-500"
            onClick={() => removePokemon(pokemon.id)}
          >
            Remove
          </button>
        ) : (
          <button
            className="p-2 mt-2 rounded-lg text-sm text-sky-900 font-bold bg-green-400 cursor-pointer hover:bg-green-500"
            onClick={() => addPokemon(pokemon)}
          >
            Add
          </button>
        )}
      </div>
      <Tooltip id={`indicator-${pokemon.name}`}>In Pokedex</Tooltip>
    </>
  );
};

export default PokemonCard;
