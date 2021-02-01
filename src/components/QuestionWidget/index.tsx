import { FormEvent, useState, useCallback } from 'react';

import BackLinkArrow from '../BackLinkArrow';
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
  const { SUCCESS, ERROR } = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };

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
        if (isCorrect) {
          setResultState(SUCCESS);
          handleAddResult(isCorrect);

          return setTimeout(() => {
            setResultState(null);
            setSelectedAlternative(null);
            onSubmit();
          }, 1000);
        }

        setResultState(ERROR);
        handleAddResult(isCorrect);
        return setTimeout(() => {
          setResultState(null);
          setSelectedAlternative(null);
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
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
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
            const alternativeSuccess =
              resultState === 'SUCCESS' && alternativeSelected;
            const alternativeError =
              resultState === 'ERROR' && alternativeSelected;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                selected={alternativeSelected}
                success={alternativeSuccess}
                error={alternativeError}
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

          {!resultState && (
            <Button type="submit" disabled={hasAlternativeSelected}>
              Confirmar
            </Button>
          )}
          <Widget.Icons>
            {resultState === 'SUCCESS' && <CorrectIcon />}

            {resultState === 'ERROR' && <WrongIcon />}
          </Widget.Icons>
        </Widget.Form>
      </Widget.Content>
    </Widget>
  );
}
