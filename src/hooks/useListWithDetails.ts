import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPokemonsWithDetails } from '../api/pokemon';

export const useListWithDetails = () => {
  const query = useSuspenseQuery({
    queryKey: ['pokemonList'],
    queryFn: () =>
      fetchPokemonsWithDetails().then((apiResult) => ({
        total: apiResult.total,
        pokemonList: apiResult.pokemonList,
      })),
  });

  if (query.error && !query.isFetching) {
    throw query.error;
  }
  return {
    isLoading: query?.isLoading,
    isError: query?.isError,
    isSuccess: query?.isSuccess,
    pokemonListApi: query?.data?.pokemonList,
    pokemonCount: query?.data?.total,
  };
};
