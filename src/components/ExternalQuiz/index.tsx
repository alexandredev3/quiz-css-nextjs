import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ExternalDB } from '../../../pages';
import LoadingWidget from '../LoadingWidget';
import Quiz from '../Quiz';
import Widget from '../Widget';

interface Props {
  externalDb: ExternalDB;
  playerName: string;
  error: string | null;
}

export default function ExternalQuiz({ externalDb, playerName, error }: Props) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePlayQuiz(_id: string) {
    if (error) {
      return;
    }

    setIsLoading(true);

    // eslint-disable-next-line consistent-return
    return push(`/quiz/${_id}?name=${playerName}`);
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
              {externalDb.data.map(({ _id, author, title, bg }) => {
                return (
                  <li key={_id}>
                    <motion.div
                      whileTap={{
                        scale: 0.9,
                      }}
                      whileHover={{
                        scale: 1.04,
                      }}
                    >
                      <Quiz imageUrl={bg} onClick={() => handlePlayQuiz(_id)}>
                        <h1>{title}</h1>
                        <p>By {author}</p>
                      </Quiz>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
      )}
    </>
  );
}
