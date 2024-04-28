import axios, { AxiosError } from 'axios';
import { useCallback, useMemo } from 'react';
// import custom hooks
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
// icon import
import { BsStar } from 'react-icons/bs';
import { BsStarFill } from 'react-icons/bs';

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { mutate: mutateFavorits } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const StarIcon = isFavorite ? BsStarFill : BsStar;

  /**
   * set / unset Favorite
   */
  const toggleFavorite = useCallback(async () => {
    let response;
    try {
      if (isFavorite) {
        response = await axios.delete('/api/favorite', { data: { movieId } }); // for delete request you have to use data: {...}
      } else {
        console.log('Add Favorite');
        console.log('movieId: ', movieId);
        console.log('movieId: ', typeof movieId);
        response = await axios.post('/api/favorite', { movieId }); // for the post request a object for {body} is enough
      }
    } catch (error) {
      console.error(
        'Axios Error while setting favorite: ',
        (error as AxiosError).response?.data || (error as AxiosError).message
      );
    }

    console.log(response?.data);
    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutate({ ...currentUser, favoriteIds: updatedFavoriteIds });
    mutateFavorits();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorits]);

  return (
    <div
      className=' cursor-pointer
       w-6
        h-6
         lg:w-10
          lg:h-10 
          rounded-full
           border-2
           border-white
            flex
             items-center
              justify-center
               transition
                hover:border-neutral-300
                 group/item'
      onClick={toggleFavorite}>
      <StarIcon className={isFavorite ? 'text-red-800' : 'text-white'} />
    </div>
  );
}
