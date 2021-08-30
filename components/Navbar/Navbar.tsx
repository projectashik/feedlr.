import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Custom UI Imports
import { Avatar, Button, Divider, Dropdown } from 'components/ui';
import {
  FiSun,
  FiMoon,
  FiClipboard,
  FiCopy,
  FiTrash,
  FiLogOut,
  FiUser,
  FiSettings,
  FiPlus,
} from 'react-icons/fi';
import React from 'react';
import { useTheme } from 'next-themes';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { createProjectVisibleAtom } from 'state';

export const Navbar = () => {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const { user } = useUser();
  const router = useRouter();

  const [visible, setVisible] = useAtom(createProjectVisibleAtom);
  function toggleCreateProjectModal() {
    setVisible(!visible);
  }

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const goToProfile = () => {
    router.push('/accounts/profile');
  };

  const logout = () => {
    router.push('/api/auth/logout');
  };

  const UserProfileDrop = () => {
    return (
      <Dropdown
        side='bottom'
        align='end'
        className='w-64 focus:outline-none'
        overlay={[
          <Dropdown.Item
            key={Math.random()}
            onClick={goToProfile}
            icon={<FiUser />}
          >
            Profile
          </Dropdown.Item>,
          <Divider key={Math.random()} light />,
          <Dropdown.Item
            key={Math.random()}
            onClick={logout}
            icon={<FiLogOut />}
          >
            Logout
          </Dropdown.Item>,
        ]}
      >
        <button className='rounded-full inline-flex mt-2'>
          <Avatar src={user?.picture} />
        </button>
      </Dropdown>
    );
  };
  return (
    <>
      <Head>
        <title>Feedlr. - Dashboard</title>
      </Head>
      <header className='h-14 z-30 border-b dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-5 h-full md:px-8 flex justify-between items-center'>
          <Link href='/dashboard'>
            <a className='flex items-center'>
              <Image
                src={resolvedTheme === 'dark' ? '/wfl.svg' : '/bfl.svg'}
                alt='Feedlr. Logo'
                width='80'
                height='30'
              />
            </a>
          </Link>
          <nav>
            <ul className='flex items-center gap-4'>
              <li>
                <Button
                  onClick={changeTheme}
                  icon={
                    resolvedTheme === 'dark' ? (
                      <FiSun stroke='white' />
                    ) : (
                      <FiMoon stroke='black' />
                    )
                  }
                ></Button>
              </li>
              <li>
                <UserProfileDrop />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
