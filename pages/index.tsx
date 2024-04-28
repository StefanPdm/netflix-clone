import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movieList = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
      />
      <Navbar />
      <Billboard />
      <div className='pb-40 -mt-[20px] lg:-mt-[60px] relative z-20'>
        <MovieList
          data={movieList}
          title='Trending Now'
          toShuffle={true}
        />{' '}
        <MovieList
          data={favorites}
          title={`${user?.name}'s Favorites`}
          toShuffle={false}
        />{' '}
        <MovieList
          data={movieList}
          title='Independent Movies'
          toShuffle={true}
        />
      </div>
    </>
  );
}
