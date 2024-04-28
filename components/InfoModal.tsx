import { BsXLg } from 'react-icons/bs';
import Playbutton from './Playbutton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import { useCallback, useEffect, useState } from 'react';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className='
    z-50
    transition
    duration
    bg-black
    bg-opacity-80
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    '>
      <div
        className='
     relative
     w-auto
     mx-auto
     max-w-3xl
     round-md
     overflow-hidden
     '>
        <div
          className={`
           ${isVisible ? 'scale-100' : 'scale-0'} 
           transform
           duration-300
           realative
           flex-auto
           bg-zinc-900
           drop-shadow-md
           `}>
          <div className='relative h-96'>
            <video
              className='
            w-full
            brightness-[60%]
            object-cover
            h-full
            '
              muted
              loop
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}></video>
            <div
              className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black  flex items-center justify-center'
              onClick={handleClose}>
              <BsXLg size={20} />
            </div>

            <div className='absolute bottom-[10%] left-10'>
              <p className='text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8'>
                {data?.title}
              </p>
              <div className='flex gap-4 items-center'>
                <Playbutton movieId={data?.movieId} />
                <FavoriteButton movieId={data?.movieId} />
              </div>
            </div>
          </div>

          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>New</p>
            <p className='text-lg'>{data?.duration}</p>
            <p className='text-lg'>{data?.genre}</p>
            <p className='text-lg'>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
