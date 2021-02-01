import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ThemeProvider } from 'styled-components';

import db from '../../db.json';
import api from '../../services/api';
import QuizScreen from '../../src/screens';

interface ExternalDB {
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
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen externalQuiz={externalDB} />
      </ThemeProvider>
    </div>
  );
}
