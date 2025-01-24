import { signOut } from 'next-auth/react';
import Image from 'next/image';
interface AccountMenuProps {
  visible?: boolean;
  user?: any;
}

export default function AccountMenu({ visible, user }: AccountMenuProps) {
  if (!visible) return null;

  function handleSignOut() {
    signOut();
  }

  return (
    <div
      className='
        bg-zinc-950
        w-56
        absolute
        top-12
        right-0
        py-5
        flex
        flex-col
        border-2
        border-gray-800'>
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex gap-3 items-center w-full'>
          <Image
            className='w-8 rounded-md'
            src={user?.image || '/images/default-blue.png'}
            alt='userImage'
            width={100}
            height={100}
          />
          <p className='text-sm group-hover/item:underline'>{user?.name}</p>
        </div>
        <hr className='bg-gray-600 border-0 my-4 h-px' />
        <div
          className='px-3 text-center text-sm hover:underline'
          onClick={handleSignOut}>
          Sign out of Stefllix
        </div>
      </div>
    </div>
  );
}
