import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Input } from 'components/ui';
import router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

export default function Home() {
  const user = useUser();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div className='bg-white'>
      <div className={styles.gradient}>
        <Head>
          <title>
            Feedlr.- The one stop solution to recieve all the feedback for your
            project
          </title>
          <meta
            name='description'
            content=' Feedlr.- The one stop solution to recieve all the feedback for your
          project'
          />
          <link rel='icon' href='/bli.svg' />
        </Head>

        <main className={styles.main}>
          <header>
            <div className='container mx-auto px-4 md:px-8 flex items-center justify-between md:py-4 py-2'>
              <Link href='/'>
                <a>
                  <Image src='/wfl.svg' alt='Logo' height={40} width={80} />
                </a>
              </Link>
              <nav>
                <ul className='flex gap-4'>
                  <li>
                    <a
                      className='text-white'
                      href='https://github.com/projectashik/feedlr.'
                    >
                      Github
                    </a>
                  </li>
                  {!user ? (
                    <>
                      <li>
                        <Link href='/'>
                          <a className='text-white'>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/'>
                          <a className='px-4 text-white bg-brand-500 rounded py-2 hover:bg-brand-600'>
                            Register
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href='/dashboard'>
                        <a className='px-4 text-white bg-brand-500 rounded py-2 hover:bg-brand-600'>
                          Dashboard
                        </a>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </header>
          <section
            id='header'
            className='container mx-auto md:px-8 px-4 flex md:flex-row flex-col items-center justify-between'
          >
            <div className='flex flex-col md:block items-center mt-10 md:mt-0'>
              <h1 className='leading-loose text-2xl text-center md:text-left md:text-5xl text-white md:leading-relaxed'>
                The one stop solution for <br />
                <span className='highlight relative '>
                  <span>collecting feedback</span>
                </span>
                <br /> for your project
              </h1>
              {!user ? (
                <Button
                  onClick={() => router.push('/api/auth/login')}
                  type='primary'
                  className='text-lg bg-brand-800 mt-4'
                >
                  Register Now
                </Button>
              ) : (
                <Button
                  onClick={() => router.push('/dashboard')}
                  type='primary'
                  className='text-lg bg-brand-800 mt-4'
                >
                  Dashboard
                </Button>
              )}
            </div>
            <Image
              src='/widget.png'
              alt='Widget Image'
              width='453'
              height='541'
              unoptimized={true}
            />
          </section>
        </main>
      </div>
      <section
        id='features'
        className='container mx-auto md:px-8 px-4 my-4 bg-white'
      >
        <div className='flex justify-center'>
          <h2 className='text-center text-white px-4 text-2xl highlight'>
            Features
          </h2>
        </div>
        <div className='mt-8'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid grid-rows-2'>
              <div className='flex gap-4'>
                <span
                  className={
                    styles.gradient +
                    ' px-6 py-4 block w-14 rounded text-white font-bold text-3xl'
                  }
                >
                  1
                </span>
                <div className='flex flex-col justify-center'>
                  <p className='font-bold text-xl'>Easy to integrate</p>
                  <p>
                    Just add the script tag provided by feedlr. in head tag.
                  </p>
                </div>
              </div>

              {loaded && (
                <Input
                  disabled
                  className='mt-3'
                  inputClass='py-3 dark:bg-gray-800 shadow-lg'
                  copy
                  value={`<script src="${window.location.origin}/init.js"></script>`}
                />
              )}
            </div>
            <div className='grid grid-rows-2'>
              <div className='flex gap-4 '>
                <span
                  className={
                    styles.gradient +
                    ' px-6 py-4 block w-14 rounded text-white font-bold text-3xl'
                  }
                >
                  2
                </span>
                <div className='flex flex-col justify-center'>
                  <p className='font-bold text-xl'>Five reactions</p>
                  <p>
                    Your visitors can give feedback from five different
                    reactions
                  </p>
                </div>
              </div>

              {loaded && (
                <Image
                  src='/images/emojis.png'
                  height='30'
                  width='100'
                  alt='Five reactions'
                  unoptimized={true}
                />
              )}
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-8'>
            <div className='grid gap-4'>
              <div className='flex gap-4'>
                <span
                  className={
                    styles.gradient +
                    ' px-6 py-4 block w-14 rounded text-white font-bold text-3xl'
                  }
                >
                  3
                </span>
                <div className='flex flex-col justify-center'>
                  <p className='font-bold text-xl'>Dark Mode</p>
                  <p>Feedlr. Widget is also available with dark mode</p>
                </div>
              </div>

              {loaded && (
                <Image
                  src='/images/darkwidget.png'
                  width='453'
                  height='541'
                  alt='Dark Mode'
                  unoptimized={true}
                />
              )}
            </div>
            <div className='grid gap-4'>
              <div className='flex gap-4'>
                <span
                  className={
                    styles.gradient +
                    ' px-6 py-4 block w-14 rounded text-white font-bold text-3xl'
                  }
                >
                  4
                </span>
                <div className='flex flex-col justify-center'>
                  <p className='font-bold text-xl'>Device, OS and Browser</p>
                  <p>
                    Know, from which device, os and browser the feedback was
                    submitted
                  </p>
                </div>
              </div>
              {loaded && (
                <Image
                  src='/images/device.png'
                  width='453'
                  height='541'
                  alt='Dark Mode'
                  unoptimized={true}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <footer
        className={
          styles.gradient +
          ' py-3 text-center text-white flex items-center justify-center'
        }
      >
        Made with{' '}
        <div className='px-1'>
          <FiHeart />
        </div>{' '}
        by <a href='https://github.com/projectashik'> Ashik Chapagain</a>
      </footer>
    </div>
  );
}
