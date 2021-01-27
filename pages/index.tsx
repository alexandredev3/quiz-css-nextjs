import Head from 'next/head';
import styled from 'styled-components';
import { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
// import QuizLogo from '../src/components/QuizLogo';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, [isFocus]);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);

    setIsFilled(!!name);
  }, [isFilled, isFocus, name])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    
    router.push(`/quiz?name=${name}`)
  }, [name]);

  return (
    <>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Quiz CSS da Alura</h1>
            </Widget.Header>
            <Widget.Content>

              <Widget.Form
                onSubmit={handleSubmit}
                isFocus={isFocus}
                isFilled={isFilled}
              >
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aspernatur.</p>
                <input 
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event?.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  value={name}
                />
                <button
                  disabled={name.length === 0}
                  type="submit"
                >
                  JOGAR
                </button>
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
