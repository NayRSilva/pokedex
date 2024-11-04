import { useListWithDetails } from '../../hooks/useListWithDetails';
import usePokemonContext from '../../hooks/usePokemonContext';
import ProgressBar from '../common/ProgressBar';

const Stats = () => {
  const context = usePokemonContext();
  const { pokemons } = context;
  const { pokemonListApi: pokemonsFromApi } = useListWithDetails();
  return (
    <ProgressBar
      currentCount={pokemons.length}
      totalCount={pokemonsFromApi.length}
    />
  );
};

export default Stats;
