import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div
      className='
  h-screen
  w-screen
  bg-black
     '>
      <nav
        className='
      fixed
      w-full
      p-4
      z-10
      flex
      items-center
      gap-8
      bg-black
      bg-opacity-70
      '>
        <BsArrowLeft
          onClick={() => {
            router.back();
          }}
          className='text-white cursor-pointer'
          size={35}
        />
        <p className='text-xl md:text-3xl font-bold'>
          <span className='font-light'>Watching:&nbsp;</span>
          {data?.title}
        </p>
      </nav>
      <video
        poster={data?.thumbnailUrl}
        autoPlay
        controls
        className='
      h-full
      w-full
      '
        src={data?.videoUrl}></video>
    </div>
  );
};

export default Watch;
