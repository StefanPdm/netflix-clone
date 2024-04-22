// [1]
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

// [2]
const useBillboard = () => {
  const { data, error, isLoading } = useSWR('/api/random', fetcher, {
    /** This example to show what options swr has.
     * disable re-evalidation
     * For this one is static data, we only want to load once the user
     * visit the page.
     */
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;
