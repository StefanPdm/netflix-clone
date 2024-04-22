import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  return { data, error, isLoading, mutate };
};

export default useCurrentUser;

// With SWR, components will get a stream of data updates constantly and automatically.
// And the UI will be always fast and reactive.
