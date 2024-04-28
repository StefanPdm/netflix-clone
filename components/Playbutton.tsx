import { RiPlayFill } from 'react-icons/ri';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

export default function Playbutton({ movieId }: PlayButtonProps) {
  const router = useRouter();

  return (
    <button
      className='
       bg-white 
       rounded-md
       py-1 md:py-1
       px-1 md:px-3
       w-auto
       text-xs lg:text-lg
       font-semibold
       flex
       items-center
       hover:bg-neutral-300
       transition
       text-gray-900
       '
      onClick={() => router.push(`/watch/${movieId}`)}>
      <RiPlayFill className='h-4 md:h-7 w-4 md:w-7' />
      Play
    </button>
  );
}
