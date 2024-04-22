interface MobilMenuProps {
  visible?: boolean;
}

export default function MobilMenu({ visible }: MobilMenuProps) {
  if (!visible) return null;

  return (
    <div
      className='
      bg-zinc-950
      w-56
      absolute
      top-8
      left-0
      py-5
      flex 
      flex-col
      border-2
      border-gray-800'>
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>Home</div>
        <div className='px-3 text-center text-white hover:underline'>Series</div>
        <div className='px-3 text-center text-white hover:underline'>Films</div>
        <div className='px-3 text-center text-white hover:underline'>New & Popular</div>
        <div className='px-3 text-center text-white hover:underline'>My List</div>
        <div className='px-3 text-center text-white hover:underline'>Browse by Languages</div>
      </div>
    </div>
  );
}
