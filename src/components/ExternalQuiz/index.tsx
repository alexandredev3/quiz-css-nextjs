import { FormEvent } from 'react';
import url from 'url';

import LoadingWidget from '../LoadingWidget';
import Widget from '../Widget';

interface Props {
  quizExternal: string[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event?: FormEvent, urlQuiz?: string) => void;
}

export default function ExternalQuiz({ quizExternal, onSubmit }: Props) {
  if (quizExternal.length === 0) {
    return <LoadingWidget />;
  }

  return (
    <Widget>
      <Widget.Content>
        <h1>Quizes da Galera</h1>
        <p>
          Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React
          fez:
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
                  <Widget.Topic onClick={() => onSubmit(undefined, quizUrl)}>
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
  );
}
