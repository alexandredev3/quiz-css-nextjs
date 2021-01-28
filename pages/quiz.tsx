import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

import db from '../db.json';
import LoadingWidget from '../src/components/LoadingWidget';
import QuestionWidget from '../src/components/QuestionWidget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

export default function QuizPage() {
  const { QUIZ, LOADING, RESULT } = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };

  const [screenState, setScreenState] = useState(LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

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
            />
          )}

          {screenState === 'RESULT' && (
            <p>Você acertou X questões, parabéns!</p>
          )}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
