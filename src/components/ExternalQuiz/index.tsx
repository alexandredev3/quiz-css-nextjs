import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import url from 'url';

import LoadingWidget from '../LoadingWidget';
import Widget from '../Widget';

interface Props {
  quizExternal: string[];
  playerName: string;
}

export default function ExternalQuiz({ quizExternal, playerName }: Props) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePlayQuiz(title: string, user: string) {
    if (!playerName) {
      return alert('Coloque um nome para jogar!');
    }

    setIsLoading(true);

    return push(`/quiz/${title}___${user}?name=${playerName}`);
  }

  return (
    <>
      {isLoading ? (
        <LoadingWidget />
      ) : (
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>
              Dá uma olhada nesses quizes incríveis que o pessoal da Imersão
              React fez:
            </p>

            <ul>
              {quizExternal.map((quizUrl) => {
                const quiz = url
                  .parse(quizUrl)
                  .hostname?.replace('.', ' ')
                  .replace('.vercel.app', '')
                  .split(' ');

                if (quiz) {
                  const title = quiz[0];
                  const user = quiz[1];

                  return (
                    <li key={quizUrl}>
                      <Widget.Topic
                        as={motion.a}
                        onClick={() => handlePlayQuiz(title, user)}
                        whileTap={{
                          scale: 0.9,
                        }}
                        whileHover={{
                          scale: 1.04,
                        }}
                      >
                        {`${user}/${title}`}
                      </Widget.Topic>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </Widget.Content>
        </Widget>
      )}
    </>
  );
}
