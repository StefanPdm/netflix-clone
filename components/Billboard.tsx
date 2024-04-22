import useBillboard from '@/hooks/useBillboard';
import React from 'react';
import logoSymbol from '/public/images/Netflix-Symbol.png';
import { RiPlayFill } from 'react-icons/ri';
import { MdInfoOutline } from 'react-icons/md';
import Image from 'next/image';

export default function Billboard() {
  const { data: billboard } = useBillboard();
  console.log('Billboard: ', billboard);
  return (
    <div className='relative h-[56.26vw]'>
      <video
        className='w-full h-[56.25vw] object-cover brightness-[60%]'
        src={billboard?.videoUrl}
        poster={billboard?.thumbnailUrl}
        autoPlay
        muted
        loop></video>
      <div className='absolute top-[25%] xl:top-[35%] px-4 md:px-16 flex flex-col w-full'>
        <Image
          src={logoSymbol}
          alt='logoSymbol'
          height={60}
          className='px-1 hidden xl:block'
        />
        <p className='text-xl md:text-5xl lg:text-7xl h-full w-[50%] font-bold drop-shadow-2xl'>
          {billboard?.title}
        </p>
        <p className='text-[8px] md:text-[12px] lg:text-[21px] mt-3 md:mt-8 w-[80%] lg:w-[50%] drop-shadow-xl '>
          {billboard?.description}
        </p>
        <div className='flex gap-5 mt-4 justify-end  text-[8px] md:text-[12px] lg:text-[21px]'>
          <span className='font-bold'>{billboard?.genre}</span>
          <span>&nbsp;|&nbsp;</span>
          <span>{billboard?.duration}</span>
        </div>
        <div className='flex gap-2 md:gap-4'>
          <button
            className='bg-white py-1 md:py-1 px-1 md:px-4 text-gray-900 rounded-md mt-1 md:mt-5 w-fit
            hover:bg-opacity-20 hover:text-white transition-all duration font-semibold text-xs lg:text-lg flex items-center gap-1
            '>
            <RiPlayFill className='h-4 md:h-8 w-4 md:w-8' />
            Play
          </button>
          <button
            className='bg-gray-600 py-1 md:py-1 px-1 md:px-4 text-white rounded-md mt-1 md:mt-5 w-fit
            hover:bg-opacity-50 transition-all duration font-medium text-xs lg:text-lg flex items-center gap-1
            '>
            <MdInfoOutline className='h-4 md:h-7 w-4 md:w-7' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
