import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState, FormEvent, ChangeEvent } from 'react';

import db from '../db.json';
import Button from '../src/components/Button';
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

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      router.push(`/quiz?name=${name}`);
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

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora, minus.
              </p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/alexandredev3" />
      </QuizBackground>
    </>
  );
}
