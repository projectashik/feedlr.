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
          <script defer src='./init.js'></script>
          <meta property='og:title' content='Feedlr.' />
          <meta
            property='og:description'
            content='The one stop solution to recieve all the feedback for your
            project'
          />
          <meta property='og:image' content='/images/ogImage.png' />
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
