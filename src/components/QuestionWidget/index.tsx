import { useRouter } from 'next/router';
import { FormEvent } from 'react';

import Button from '../Button';
import Widget from '../Widget';

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
  onSubmit: () => void;
}

export default function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}: Props) {
  const { query } = useRouter();

  const questionId = `question__${questionIndex}`;

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

        <Widget.Form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input id={alternativeId} type="radio" name={questionId} />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
        </Widget.Form>
      </Widget.Content>
    </Widget>
  );
}
