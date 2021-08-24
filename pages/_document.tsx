import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
            rel='stylesheet'
          />
          <script defer src='/init.js'></script>
          {/* <script defer src='/ff.js'></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
