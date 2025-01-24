import axios, { AxiosError } from 'axios';
import Input from '@/components/Input';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';
import Head from 'next/head';

// npm install react-icons - for using icons  (https://react-icons.github.io/react-icons/)
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { useTransition } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [variant, setVariant] = useState('login');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>('');
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError('');
  }, []);

  const login = useCallback(async () => {
    // important: first login in code, then register

    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/profiles');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An unexpected error occurred');
      }
    });
  }, [email, password, router]);

  const register = useCallback(async () => {
    if (!email || !password || !username) {
      return;
    }
    try {
      const result = await axios.post('/api/register', { email, password, username });
      if (axios.isAxiosError(error)) {
        setError('Wrong data entered');
      } else {
        login();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Email already exists');
      } else {
        console.log(error);
        setError('An unexpected error occurred');
      }
    }
  }, [email, password, username, login, error]);

  return (
    <>
      <Head>
        <title>Stefllix</title>
        <meta content='Streaming clone built with Next.js and Tailwind CSS' />
        <meta
          name='google-site-verification'
          content='47SIeUaOiPuUBAyT8BmgTIqtidTc-ADCRKkFzjj0TOM'
        />
      </Head>
      <div className="relative h-full w-full bg-[url('/images/hero-english.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
        <div className='bg-black w-full h-full lg:bg-opacity-50'>
          <nav className='px-12 py-5'>
            <Image
              src='/images/logo-2.png'
              alt='logo'
              width={200}
              height={54}
              priority={true}
            />
          </nav>
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full h-[560px] relative'>
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

              {error && <div className=' text-red-600 px-4 absolute'>{error}</div>}

              <div>
                <div
                  className={`text-white text-center absolute top-72 transition-all duration-150 ${
                    isPending ? 'opacity-1' : 'opacity-0'
                  }`}>
                  Please wait...
                </div>
              </div>

              <button
                onClick={variant === 'login' ? login : register}
                disabled={isPending}
                className='
                  bg-red-600 py-3 text-white rounded-md w-full  mt-12
                  hover:bg-red-700 transition-all duration-300 disabled:bg-neutral-500
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
