import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const fskArray = ['0', '6', '12', '16', '18'];

const useMovieList = () => {
  let { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const updatedData = data?.map((movie: any) => {
    const consensus = Math.floor(Math.random() * 30) + 70;
    const fsk = Math.floor(Math.random() * fskArray.length);
    const year = Math.floor(Math.random() * (2025 - 2000 + 1)) + 2000;
    return { ...movie, consensus: consensus, fsk: fskArray[fsk], year: year };
  });

  return { data: updatedData, error, isLoading };
};

export default useMovieList;
