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
          <script
            defer
            src='http://localhost:3000/init.js'
            data-feedlr-project-id='3f44c855-1e52-404d-989b-1a2c6fe705f8'
          ></script>
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
