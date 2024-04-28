import Image from 'next/image';

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobilMenu from './MobilMenu';
import AccountMenu from './AccountMenu';
import NavbarItem from './NavbarItem';
import { useCallback, useEffect, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobilMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const { data: user } = useCurrentUser();
  // console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`
         px-4
         md:px-16
         py-6
         flex
         flex-row
         items-center
         transition
         duration-500
         ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
   `}>
        <Image
          src='/images/logo.png'
          alt='logo'
          className='h-4 lg:h-7 w-auto'
          width={100}
          height={100}
        />
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          {/* <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by languages' /> */}
        </div>
        {/* <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative'>
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobilMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobilMenu visible={showMobilMenu} />
        </div> */}
        <div className='flex ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>

          <div
            className='flex flex-row items-center gap-2 cursor-pointer relative'
            onClick={toggleAccountMenu}>
            <div className=' h-6 w-6 lg:h-10 lg:w-10 rounded-md overflow-hidden'>
              <Image
                src={user?.image || '/images/default-blue.png'}
                alt='userImage'
                width={40}
                height={40}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
            />
            <AccountMenu
              visible={showAccountMenu}
              user={user}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
