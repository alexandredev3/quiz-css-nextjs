import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

import db from '../../db.json';
import LoadingWidget from '../../src/components/LoadingWidget';
import QuestionWidget from '../../src/components/QuestionWidget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import ResultWidget from '../../src/components/ResultWidget';

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

  useEffect(() => {
    setTimeout(() => {
      setScreenState(QUIZ);
    }, 1000);
  }, []);

  const handleAddResult = useCallback(
    (result: boolean) => {
      return setResults([...results, result]);
    },
    [results]
  );

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
        <title>Quiz CSS</title>

        <meta
          name="description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://quiz-css-alexandredev3.vercel.app/"
        />
        <meta property="og:title" content="Quiz CSS da Alura" />
        <meta
          property="og:description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />
        <meta property="og:image" content={db.bg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://quiz-css-alexandredev3.vercel.app/"
        />
        <meta property="twitter:title" content="Quiz CSS da Alura" />
        <meta
          property="twitter:description"
          content="Quiz CSS da Alura, Feito por Alexandre com 💚"
        />
        <meta property="twitter:image" content={db.bg} />
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
