import Head from 'next/head';
import { useState, useCallback } from 'react';

import QuestionWidget from '../../src/components/QuestionWidget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import ResultWidget from '../../src/components/ResultWidget';

interface Props {
  externalQuiz: {
    bg: string;
    questions: Array<{
      image: string;
      title: string;
      description: string;
      answer: number;
      alternatives: string[];
    }>;
  };
}

export default function QuizPage({ externalQuiz }: Props) {
  const { QUIZ, RESULT } = {
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
  };

  const [screenState, setScreenState] = useState(QUIZ);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<Array<boolean>>([]);

  const questionIndex = currentQuestion;
  const question = externalQuiz.questions[questionIndex];
  const totalQuestions = externalQuiz.questions.length;

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
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={externalQuiz.bg}>
        <QuizContainer>
          <QuizLogo className="logo" />
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
