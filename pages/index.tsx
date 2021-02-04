import { motion } from 'framer-motion';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState, useMemo, FormEvent, ChangeEvent } from 'react';

import db from '../db.json';
import api from '../services/api';
import Button from '../src/components/Button';
import ExternalQuiz from '../src/components/ExternalQuiz';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export interface ExternalDB {
  data: Array<{
    _id: string;
    bg: string;
    author: string;
    title: string;
    url: string;
    theme: any;
    questions: Array<{
      image: string;
      title: string;
      description: string;
      answer: number;
      alternatives: string[];
    }>;
  }>;
}

export async function getServerSideProps() {
  const response = await api.get('/externalDb');

  const data: ExternalDB = response.data;

  return {
    props: {
      data,
    },
  };
}

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useMemo(() => {
    const nameIsString = typeof name !== 'string';
    const nameHasThreeCharacters = name.length < 3;
    const nameHasEighteenCharacters = name.length > 18;

    console.log(!name);

    if (!name) {
      return setError('Coloque um nome para Jogar!');
    }
    if (nameIsString) {
      return setError('Seu nome teve conter pelo menos uma letra');
    }
    if (nameHasThreeCharacters) {
      return setError('Seu nome tem que ter pelos 3 caracteres');
    }
    if (nameHasEighteenCharacters) {
      return setError('Seu nome teve ser abaixo de 18 caracteres');
    }

    return setError(null);
  }, [name]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event?.preventDefault();

      if (error) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return router.push(`/quiz?name=${name}`);
    },
    [name, error]
  );

  return (
    <>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <motion.div
            transition={{
              duration: 0.3,
              delay: 0.3,
              damping: 50,
            }}
            variants={{
              show: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
            initial="hidden"
            animate="show"
          >
            <QuizLogo className="logo" />
          </motion.div>
          <Widget
            as={motion.section}
            transition={{
              type: 'spring',
              duration: 0.4,
              stiffness: 500,
              damping: 20,
            }}
            variants={{
              show: {
                y: 0,
                visibility: 'visible',
                rotate: '0deg',
                display: 'block',
                opacity: 1,
              },
              hidden: {
                display: 'none',
                visibility: 'hidden',
                rotate: '30deg',
                y: '200px',
                opacity: 0,
              },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Quiz CSS da Alura</h1>
            </Widget.Header>
            <Widget.Content>
              <Widget.Form onSubmit={handleSubmit}>
                <p>{db.description}</p>
                <Input
                  error={error}
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    // eslint-disable-next-line prettier/prettier
                    setName(event?.target.value)}
                  value={name}
                  name="name"
                />
                <Button disabled={!!error}>{`JOGAR ${name}`}</Button>
              </Widget.Form>
            </Widget.Content>
          </Widget>

          <motion.div
            transition={{
              delay: 0.2,
              duration: 0.4,
              damping: 50,
            }}
            variants={{
              show: {
                y: 0,
                display: 'block',
                visibility: 'visible',
                rotate: '0deg',
                opacity: 1,
              },
              hidden: {
                y: '200px',
                display: 'none',
                visibility: 'hidden',
                rotate: '-30deg',
                opacity: 0,
              },
            }}
            initial="hidden"
            animate="show"
          >
            <ExternalQuiz error={error} externalDb={data} playerName={name} />
          </motion.div>
          <Footer
            as={motion.footer}
            variants={{
              show: {
                y: 0,
                visibility: 'visible',
                display: 'block',
                rotate: '0deg',
                transition: {
                  duration: 0.4,
                  delay: 0.3,
                  damping: 50,
                },
                opacity: 1,
              },
              hidden: {
                display: 'none',
                visibility: 'hidden',
                y: '200px',
                rotate: '30deg',
                opacity: 0,
              },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/alexandredev3" />
      </QuizBackground>
    </>
  );
}
