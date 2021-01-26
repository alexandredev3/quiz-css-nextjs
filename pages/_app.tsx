import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';
import Head from 'next/head';

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

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = db.theme;

export default function App({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <meta name="author" content="Alexandre Costa" />
        <meta name="keywords" content="quiz-alura, alura, nextjs, react" />
        <meta name="description" content="Quiz CSS da Alura, Feito por Alexandre com 💚" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quiz-css-alexandredev3.vercel.app/" />
        <meta property="og:title" content="Quiz CSS da Alura" />
        <meta property="og:description" content="Quiz CSS da Alura, Feito por Alexandre com 💚" />
        <meta property="og:image" content={db.bg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://quiz-css-alexandredev3.vercel.app/" />
        <meta property="twitter:title" content="Quiz CSS da Alura" />
        <meta property="twitter:description" content="Quiz CSS da Alura, Feito por Alexandre com 💚" />
        <meta property="twitter:image" content={db.bg} />
      </Head>
      <ThemeProvider
        theme={theme}
      >
        <GlobalStyle />
        <Component 
          { ...pageProps }
        />
      </ThemeProvider>
    </>
  )
}