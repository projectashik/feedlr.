import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button } from 'components/ui';
import router from 'next/router';

export default function Home() {
  const user = useUser();
  return (
    <>
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
                          <a className='px-4 text-white bg-purple-500 rounded py-2 hover:bg-purple-600'>
                            Register
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href='/dashboard'>
                        <a className='px-4 text-white bg-purple-500 rounded py-2 hover:bg-purple-600'>
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
            <div>
              <h1
                className='leading-loose text-2xl text-center md:text-left md:text-5xl text-white '
                style={{ lineHeight: '5rem !important' }}
              >
                The one stop solution for <br />
                <span className='before:bg-purple-700 z-50 highlight before:rounded before:absolute relative before:top-0 before:left-0 before:h-full before:transform before:-rotate-2 before:w-full'>
                  <span className='z-50'>collecting feedback</span>
                </span>
                <br /> for your project
              </h1>
              {!user ? (
                <Button
                  onClick={() => router.push('/api/auth/login')}
                  type='primary'
                  className='text-lg bg-purple-800 mt-4'
                >
                  Register Now
                </Button>
              ) : (
                <Button
                  onClick={() => router.push('/dashboard')}
                  type='primary'
                  className='text-lg bg-purple-800 mt-4'
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
            />
          </section>
        </main>
      </div>
      <section id='features' className='container mx-auto md:px-8 px-4 my-4'>
        <h2 className='text-center text-2xl'>Features</h2>
        <div className='mt-4'>
          <div>
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
                <p>Just add the script tag provided by feedlr. in head tag.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
