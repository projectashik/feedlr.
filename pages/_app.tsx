import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider, useTheme } from 'next-themes';
import NextProgress from 'next-progress';
import 'tippy.js/dist/tippy.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Toaster } from 'react-hot-toast';
import { Widget } from 'components/Widget';

function MyApp({ Component, pageProps }: AppProps) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <NextProgress color='#6F47A8' options={{ showSpinner: false }} />
      <ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false}>
        <div className='min-h-screen dark:bg-gray-900'>
          <SkeletonTheme>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </SkeletonTheme>
          <Toaster />
        </div>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
