import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

interface Props {
  Component: () => null;
  pageProps: any;
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    color: ${db.theme.colors.contrastText};
  }

  html, body {
    min-height: 100vh;
  }

  input, button {
    font-family: 'Lato', sans-serif;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <meta name="author" content="Alexandre Costa" />
        <meta name="keywords" content="quiz-alura, alura, nextjs, react" />
        <meta
          name="description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://quiz-css-alexandredev3.vercel.app/"
        />
        <meta property="og:title" content="Quiz CSS da Alura" />
        <meta
          property="og:description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />
        <meta property="og:image" content={db.bg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://quiz-css-alexandredev3.vercel.app/"
        />
        <meta property="twitter:title" content="Quiz CSS da Alura" />
        <meta
          property="twitter:description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />
        <meta property="twitter:image" content={db.bg} />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
