import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Input } from 'components/ui';
import router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  FiCode,
  FiFilter,
  FiGithub,
  FiHeart,
  FiMoon,
  FiPhone,
  FiSmile,
  FiTwitter,
} from 'react-icons/fi';
import { BiCustomize, BiDevices } from 'react-icons/bi';

export default function Home() {
  const { user } = useUser();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div className='bg-white text-black'>
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
                  {user ? (
                    <li>
                      <Link href='/dashboard'>
                        <a className='px-4 text-white bg-brand-500 rounded py-2 hover:bg-brand-600'>
                          Dashboard
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link href='/api/auth/login'>
                          <a className='text-white'>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/api/auth/login'>
                          <a className='px-4 text-white bg-brand-500 rounded py-2 hover:bg-brand-600'>
                            Register
                          </a>
                        </Link>
                      </li>
                    </>
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
              {user ? (
                <Button
                  onClick={() => router.push('/dashboard')}
                  type='primary'
                  className='text-lg bg-brand-800 mt-4'
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => router.push('/api/auth/login')}
                  type='primary'
                  className='text-lg bg-brand-800 mt-4'
                >
                  Register Now
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
        className='container mx-auto md:px-8 px-4 my-10 bg-white'
      >
        <div className='flex justify-center'>
          <h2 className='text-center text-white px-4 text-2xl highlight'>
            Features
          </h2>
        </div>
        <div className='mt-8'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex gap-4'>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <FiCode />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Easy to integrate</p>
                <p>Just add the script tag provided by feedlr. in head tag.</p>
              </div>
            </div>
            <div className='flex gap-4 '>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <FiSmile />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Five reactions</p>
                <p>
                  Your visitors can give feedback from five different reactions
                </p>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-8'>
            <div className='flex gap-4'>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <FiMoon />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Dark Mode</p>
                <p>Feedlr. Widget is also available with dark mode</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <BiDevices />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Device, OS and Browser</p>
                <p>
                  Know, from which device, os and browser the feedback was
                  submitted
                </p>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-8'>
            <div className='flex gap-4'>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <BiCustomize />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Easy to customize</p>
                <p>
                  You can easily customize the look the widget as your website
                  looks
                </p>
              </div>
            </div>
            <div className='flex gap-4'>
              <span
                className={
                  styles.gradient +
                  ' flex items-center justify-center w-14 rounded text-white font-bold text-3xl'
                }
              >
                <FiFilter />
              </span>
              <div className='flex flex-col justify-center'>
                <p className='font-bold text-xl'>Filter feedbacks</p>
                <p>
                  Filter the feedbacks by date range, reactions, device,
                  browsers and os
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        className={
          styles.gradient + ' py-3 text-center text-white flex justify-between'
        }
      >
        <div className='container mx-auto flex md:flex-row flex-col gap-5 md:px-8 px-4 justify-between'>
          <div className='flex items-center'>
            Made with{' '}
            <div className='px-1'>
              <FiHeart />
            </div>{' '}
            by &nbsp;
            <a href='https://github.com/projectashik'>Ashik Chapagain</a>
          </div>
          <div className='flex gap-4 items-center'>
            <a href='https://github.com/projectashik/feedlr.'>
              <FiGithub />
            </a>
            <a href='https://twitter.com/ChapagainAshik/'>
              <FiTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
