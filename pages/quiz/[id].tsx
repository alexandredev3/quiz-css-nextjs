import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { ThemeProvider } from 'styled-components';

import db from '../../db.json';
import api from '../../services/api';
import QuizScreen from '../../src/screens';

interface Data {
  title: string;
  description: string;
  author: string;
  bg: string;
  theme: any;
  // eslint-disable-next-line react/no-unused-prop-types
  questions: Array<{
    image: string;
    title: string;
    description: string;
    answer: number;
    alternatives: string[];
  }>;
}

interface Props {
  data: Data;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query as { id: string; name: string };

  try {
    const response = await api.get(`/quiz?id=${id}`);

    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch {
    // eslint-disable-next-line no-return-assign
    context.res.statusCode = 500;
    return {
      props: {
        data: db,
      },
    };
  }
};

export default function QuizDaGaleraPage(props: Props) {
  return (
    <>
      <ThemeProvider theme={props.data.theme}>
        <QuizScreen externalQuiz={props.data} />
      </ThemeProvider>
    </>
  );
}
