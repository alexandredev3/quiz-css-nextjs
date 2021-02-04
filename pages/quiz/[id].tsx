import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import db from '../../db.json';
import api from '../../services/api';
import QuizScreen from '../../src/screens';

interface ExternalDB {
  title: string;
  description: string;
  bg: string;
  theme: any;
  questions: Array<{
    image: string;
    title: string;
    description: string;
    answer: number;
    alternatives: string[];
  }>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query as { id: string; name: string };

  try {
    const response = await api.get(`/quiz?id=${id}`);

    const data: ExternalDB = response.data;

    return {
      props: {
        externalDB: data,
      },
    };
  } catch {
    // eslint-disable-next-line no-return-assign
    context.res.statusCode = 500;
    return {
      props: {
        externalDB: db,
      },
    };
  }
}

export default function QuizDaGaleraPage({
  externalDB,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>{externalDB.title}</title>

        <meta name="description" content={externalDB.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={externalDB.bg} />
        <meta property="og:title" content={externalDB.title} />
        <meta property="og:description" content={externalDB.description} />
        <meta property="og:image" content={externalDB.bg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={externalDB.title} />
        <meta property="twitter:description" content={externalDB.description} />
        <meta property="twitter:image" content={externalDB.bg} />
      </Head>
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen externalQuiz={externalDB} />
      </ThemeProvider>
    </div>
  );
}
