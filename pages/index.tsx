import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  useCallback,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';

import db from '../db.json';
import Button from '../src/components/Button';
import ExternalQuiz from '../src/components/ExternalQuiz';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [quizExternal, setQuizExternal] = useState<string[] | null>([]);

  const baseURL = `/api`;
  const api = axios.create({
    baseURL,
  });

  useEffect(() => {
    api
      .get('/db')
      .then((response) => {
        const data = response.data.external;

        setQuizExternal(data);
      })
      .catch((error) => {
        alert('Ocorreu um erro inesperado!');
        return console.log(error);
      });
  }, []);

  const handleSubmit = useCallback(
    (event?: FormEvent, quizUrl?: string) => {
      event?.preventDefault();

      const apiUrl = `${quizUrl}api`;

      // fazer validação no Input
      if (!name) {
        return alert('Coloque um nome!!');
      }

      if (quizUrl) {
        return router.push(`/quiz?name=${name}&apiUrl=${apiUrl}`);
      }

      return router.push(`/quiz?name=${name}`);
    },
    [name]
  );

  return (
    <>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo className="logo" />
          <Widget>
            <Widget.Header>
              <h1>Quiz CSS da Alura</h1>
            </Widget.Header>
            <Widget.Content>
              <Widget.Form onSubmit={handleSubmit}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, aspernatur.
                </p>
                <Input
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    // eslint-disable-next-line prettier/prettier
                    setName(event?.target.value)}
                  value={name}
                  name="name"
                />
                <Button disabled={name.length === 0} type="submit">
                  {`JOGAR ${name}`}
                </Button>
              </Widget.Form>
            </Widget.Content>
          </Widget>

          {quizExternal && (
            <ExternalQuiz quizExternal={quizExternal} onSubmit={handleSubmit} />
          )}
          <Footer />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/alexandredev3" />
      </QuizBackground>
    </>
  );
}
