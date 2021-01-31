import { GetServerSidePropsContext } from 'next';
import { ThemeProvider } from 'styled-components';

import api from '../../services/api';
import QuizScreen from '../../src/screens';

interface Props {
  externalDB: {
    bg: string;
    theme: any;
    questions: Array<{
      image: string;
      title: string;
      description: string;
      answer: number;
      alternatives: string[];
    }>;
  };
}

export default function QuizDaGaleraPage({ externalDB }: Props) {
  return (
    <div>
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen externalQuiz={externalDB} />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query as { id: string; name: string };

  const [title, user] = id.split('___');

  try {
    const response = await api({
      baseURL: `https://${title}.${user}.vercel.app/api`,
      url: '/db',
      method: 'GET',
    });

    return {
      props: {
        externalDB: response.data,
      },
    };
  } catch {
    // eslint-disable-next-line no-return-assign
    return (context.res.statusMessage = 'ERRO!');
  }
}
