import { useRouter } from 'next/router';
import { FormEvent, useState, useCallback } from 'react';

import Button from '../Button';
import CorrectIcon from '../CorrectIcon';
import Widget from '../Widget';
import WrongIcon from '../WrongIcon';

interface Props {
  question: {
    image: string;
    title: string;
    description: string;
    answer: number;
    alternatives: string[];
  };
  totalQuestions: number;
  questionIndex: number;
  // eslint-disable-next-line no-unused-vars
  onSubmit: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddResult: (results: boolean) => void;
}

export default function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  handleAddResult,
}: Props) {
  const { CORRECT, WRONG } = {
    CORRECT: 'CORRECT',
    WRONG: 'WRONG',
  };

  const { query } = useRouter();
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(
    null
  );
  const [resultState, setResultState] = useState<string | null>(null);

  const questionId = `question__${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative === null;
  const isCorrect = selectedAlternative === question.answer;

  const handleSubmitForm = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (selectedAlternative || !hasAlternativeSelected) {
        setSelectedAlternative(null);

        if (isCorrect) {
          setResultState(CORRECT);
          handleAddResult(isCorrect);

          return setTimeout(() => {
            setResultState(null);
            onSubmit();
          }, 1000);
        }

        setResultState(WRONG);
        handleAddResult(isCorrect);
        return setTimeout(() => {
          setResultState(null);
          onSubmit();
        }, 1000);
      }

      return alert('Por favor selecione uma Alternativa!');
    },
    [resultState, selectedAlternative]
  );

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
        <h3>{query.name}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <Widget.Form onSubmit={(event: FormEvent) => handleSubmitForm(event)}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeSelected = index === selectedAlternative;
            const alternativeCorrect =
              resultState === 'CORRECT' && alternativeSelected;
            const alternativeWrong =
              resultState === 'WRONG' && alternativeSelected;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                selected={alternativeSelected}
                correct={alternativeCorrect}
                wrong={alternativeWrong}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Widget.Button>
            {!resultState && (
              <Button type="submit" disabled={hasAlternativeSelected}>
                Confirmar
              </Button>
            )}

            {resultState === 'CORRECT' && <CorrectIcon />}

            {resultState === 'WRONG' && <WrongIcon />}
          </Widget.Button>
        </Widget.Form>
      </Widget.Content>
    </Widget>
  );
}
