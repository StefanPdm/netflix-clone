import { useRouter } from 'next/router';
import FavoriteButton from './FavoriteButton';
import { BsChevronDown } from 'react-icons/bs';
import { RiPlayFill } from 'react-icons/ri';
import useInfoModal from '@/hooks/useInfoModal';
import Image from 'next/image';

interface MovieCardProps {
  movie: Record<string, any>;
  lastElement?: boolean;
}

export default function MovieCard({ movie, lastElement = false }: MovieCardProps) {
  console.log('movie:', movie);
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div
      className='group bg-zinc-900 col-span relative  h-[20vw]
        lg:h-[12vw]'>
      <Image
        className='
        cursor-pointer
        w-full
        h-[20vw]
        lg:h-[12vw]
        object-cover
        rounded-md
        transition
        duration-300
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        shadow-xl
        '
        src={movie.thumbnailUrl}
        width={500}
        height={100}
        alt='thumbnail'
      />
      <div
        className={`
         absolute
          top-0
           opacity-0
             h-full
              w-full
               transition
                duration-300
                 delay-300
                  p-4
                   invisible 
         sm:visible z-10 scale-0
         group-hover:scale-125
         group-hover:-translate-y-[6vw]
         ${lastElement ? 'group-hover:-translate-x-[2vw]' : 'group-hover:translate-x-[2vw]'}
         group-hover:opacity-100
         `}>
        <Image
          className='
                object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]
        '
          width={500}
          height={100}
          src={movie.thumbnailUrl}
          alt='thumbnail2'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='bg-zinc-800 p-2 lg:p-3 w-full transition shadow-md rounded-b-md'>
          <div className='flex items-center gap-3'>
            {/* <Playbutton movieId={movie.id} /> */}
            <div
              className=' cursor-pointer w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center transition hover:bg-neutral-300'
              onClick={() => {
                router.push(`/watch/${movie?.id}`);
              }}>
              <RiPlayFill className='text-black h- w-6'></RiPlayFill>{' '}
            </div>
            <FavoriteButton movieId={movie?.id} />
            <div
              onClick={() => {
                openModal(movie?.id);
              }}
              className='cursor-pointer ml-auto
             group/item w-6 h-6 lg:w-10 lg:h-10
              border-white border-2 rounded-full
               flex justify-center items-center
               transition hover:border-neutral-300
               '>
              <BsChevronDown className='group-hover/item:text-neutral-300' />
            </div>
          </div>
          <div className='mt-4'>{movie?.title}</div>
          <p className='font-semibold mt-4 text-[10px] md:text-xs lg:text-sm flex flex-wrap gap-3 items-center'>
            <span className='text-green-400  mb-1'>{movie?.consensus}% Consensus</span>
            <span className='border-neutral-500 border px-2 font-normal text-neutral-500'>
              {movie.fsk}
            </span>
            <span className='font-normal'>
              {movie.duration} | {movie.genre}{' '}
            </span>
            <span className=' text-neutral-500'>{movie.year}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
