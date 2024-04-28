import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR('api/favoritesAll', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  return { data, error, isLoading, mutate };
};

export default useFavorites;
