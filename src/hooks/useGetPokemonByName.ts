import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPokemonByName } from '../api/pokemon';

export const useGetPokemonByName = (name: string) => {
  const query = useSuspenseQuery({
    queryKey: ['pokemonQuery', name], // Include `name` in the query key to cache based on the Pokemon name
    queryFn: () => fetchPokemonByName(name).then((result) => result), // Fetch function only focuses on getting the data
  });

  if (query.error && !query.isFetching) {
    throw query.error;
  }
  return {
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    pokemon: query.data,
  };
};
