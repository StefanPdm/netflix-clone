import useBillboard from '@/hooks/useBillboard';
import logoSymbol from '@/public/images/Netflix-Symbol.png';

import Image from 'next/image';

import CircleLoader from 'react-spinners/CircleLoader';
import { CSSProperties, useCallback, useState } from 'react';
import Playbutton from './Playbutton';
import useInfoModal from '@/hooks/useInfoModal';
import { MdInfoOutline } from 'react-icons/md';

const override: CSSProperties = {
  display: 'block',
  position: 'absolute',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Billboard() {
  const [videoIsLoading, setVideoLoading] = useState(false);
  const { data: billboard, isLoading } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    console.log('openModal');
    openModal(billboard?.id);
  }, [billboard?.id, openModal]);

  return (
    <div className='relative h-auto min-h-[25vw] max-h-[75vh]'>
      <video
        className='w-full h-[56.25vw] max-h-[75vh] object-cover brightness-[60%]'
        src={billboard?.videoUrl}
        poster={billboard?.thumbnailUrl}
        autoPlay
        muted
        loop
        onCanPlayThrough={() => setVideoLoading(false)} // Event, wenn das Video geladen ist
        onWaiting={() => setVideoLoading(true)} // Event, wenn das Video warten muss
      ></video>
      <div className='absolute top-0 left-0 w-full bg-gradient-to-b from-transparent from-70% to-zinc-900 z-10 h-[56.25vw] max-h-[75vh]'></div>
      <div className='absolute top-[25%] xl:top-[35%] px-4 md:px-16 flex flex-col w-full z-20'>
        <Image
          src={logoSymbol}
          alt='logoSymbol'
          height={60}
          className='px-1 hidden xl:block'
        />
        <p className='text-xl md:text-5xl lg:text-7xl h-full w-[50%] font-bold drop-shadow-2xl'>
          {billboard?.title}
        </p>
        <p className='text-[8px] md:text-[12px] lg:text-[21px] mt-3 md:mt-8 w-[80%] lg:w-[60%] drop-shadow-xl '>
          {billboard?.description}
        </p>
        <div className='flex gap-5 mt-4 justify-end  text-[8px] md:text-[12px] lg:text-[21px]'>
          <span className='font-bold'>{billboard?.genre}</span>
          <span>&nbsp;|&nbsp;</span>
          <span>{billboard?.duration}</span>
        </div>
        <div className='flex gap-2 md:gap-4'>
          <Playbutton movieId={billboard?.id} />
          <button
            onClick={handleOpenModal}
            className='bg-gray-600 py-1 md:py-1 px-1 md:px-4 text-white rounded-md w-fit
            hover:bg-opacity-50 transition-all duration font-medium text-xs lg:text-lg flex items-center gap-1
            '>
            <MdInfoOutline className='h-4 md:h-7 w-4 md:w-7' />
            More Info
          </button>
        </div>
      </div>
      <CircleLoader
        color='red'
        loading={isLoading || videoIsLoading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
        className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 '
      />
    </div>
  );
}
