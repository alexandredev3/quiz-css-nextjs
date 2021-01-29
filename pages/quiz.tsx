import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

import db from '../db.json';
import LoadingWidget from '../src/components/LoadingWidget';
import QuestionWidget from '../src/components/QuestionWidget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

interface Props {
  results: Array<boolean>;
}

function ResultWidget({ results }: Props) {
  const correctAlternatives = results.filter((result) => result).length;

  return (
    <Widget>
      <Widget.Header>Tela de Resultado:</Widget.Header>

      <Widget.Content>
        <p>{`Voce acertou ${correctAlternatives} perguntas`}</p>
        <ul>
          {results.map((result, index) => {
            const resultId = `result__${index}`;
            const resultPosition = index + 1;
            const resultPositionHasTwoSquares = resultPosition < 10 ? '0' : '';

            return (
              <li key={resultId}>
                {`#${resultPositionHasTwoSquares}${resultPosition} Resultado: `}
                {result ? 'Acertou Viseravel!' : 'Errou!'}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const { QUIZ, LOADING, RESULT } = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };

  const [screenState, setScreenState] = useState(LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<Array<boolean>>([]);

  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  const handleAddResult = useCallback(
    (result: boolean) => {
      return setResults([...results, result]);
    },
    [results]
  );

  useEffect(() => {
    setTimeout(() => {
      setScreenState(QUIZ);
    }, 1000);
  }, []);

  const handleSubmitQuiz = useCallback(() => {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      return setCurrentQuestion(nextQuestion);
    }

    return setScreenState(RESULT);
  }, [questionIndex, currentQuestion]);

  return (
    <>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo className="logo" />
          {screenState === 'LOADING' && <LoadingWidget />}

          {screenState === 'QUIZ' && (
            <QuestionWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handleSubmitQuiz}
              handleAddResult={handleAddResult}
            />
          )}

          {screenState === 'RESULT' && <ResultWidget results={results} />}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
