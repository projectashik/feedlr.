import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from 'next-themes';
import NextProgress from 'next-progress';
import 'tippy.js/dist/tippy.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextProgress color='#6F47A8' options={{ showSpinner: false }} />
      <ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false}>
        <div className='min-h-screen dark:bg-gray-900'>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
