import axios from 'axios';
import Input from '@/components/Input';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';
import Head from 'next/head';

// npm install react-icons - for using icons  (https://react-icons.github.io/react-icons/)
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'signup' : 'login'));
  }, []);

  const login = useCallback(async () => {
    // important: first login in code, then register
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', { email, password, username });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, username, login]);

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta
          name='description'
          content='Netflix clone built with Next.js and Tailwind CSS'
        />
        <meta
          name='google-site-verification'
          content='6I8DAbp2-fEP3Ck3342aLiXR7XzAZWZs4XNoanO95TM'
        />
      </Head>
      <div className="relative h-full w-full bg-[url('/images/hero-english.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
        <div className='bg-black w-full h-full lg:bg-opacity-50'>
          <nav className='px-12 py-5'>
            <Image
              src='/images/logo.png'
              alt='logo'
              width={200}
              height={54}
              priority={true}
            />
          </nav>
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full h-[560px]'>
              <h2 className='text-white text-4xl mb-8 font-semibold'>
                {variant === 'login' ? 'Sign In' : 'Create an account'}
              </h2>
              <div className='flex flex-col gap-4 h-[190px]'>
                {variant === 'signup' && (
                  <Input
                    id='username'
                    type='text'
                    value={username}
                    label='Username'
                    onChange={(ev: any) => {
                      setUsername(ev.target.value);
                    }}
                  />
                )}

                <Input
                  id='email'
                  type='email'
                  value={email}
                  label='Email'
                  onChange={(ev: Event) => {
                    setEmail((ev.target as HTMLInputElement).value);
                  }}
                />
                <Input
                  id='password'
                  type='password'
                  value={password}
                  label='Password'
                  onChange={(ev: any) => {
                    setPassword(ev.target.value);
                  }}
                />
              </div>
              <button
                onClick={variant === 'login' ? login : register}
                className='
                  bg-red-600 py-3 text-white rounded-md w-full  mt-12
                  hover:bg-red-700 transition-all duration-300
                  '>
                {variant === 'login' ? 'Login' : 'Register'}
              </button>
              <div className='flex flex-row items-center gap-4 justify-center mt-8 mb-6'>
                <div
                  onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                  className='w-10 h-10 bg-white rounded-full flex items-center opacity-70
               justify-center cursor-pointer hover:opacity-100 transition-opacity'>
                  <FcGoogle size={30} />
                </div>{' '}
                <div
                  onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                  className='w-10 h-10 bg-white opacity-70 rounded-full flex items-center
               justify-center cursor-pointer hover:opacity-100'>
                  <FaGithub
                    size={30}
                    className='text-black'
                  />
                </div>
              </div>
              <p className='text-neutral-500 text-right self-end'>
                {variant === 'login' ? 'Do not have an account? ' : 'Already have an account? '}
                <span
                  onClick={toggleVariant}
                  className='text-red-600 hover:text-red-700 cursor-pointer '>
                  {variant === 'login' ? ' Sign Up' : ' Sign In'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
