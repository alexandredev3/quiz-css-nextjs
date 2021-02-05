import Head from 'next/head';
import { useState, useCallback } from 'react';

import QuestionWidget from '../../src/components/QuestionWidget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import ResultWidget from '../../src/components/ResultWidget';

interface Props {
  externalQuiz: {
    title: string;
    description: string;
    author: string;
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
        <title>{externalQuiz.title}</title>

        <meta name="description" content={externalQuiz.description} />

        <meta name="author" content={externalQuiz.author} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={externalQuiz.bg} />
        <meta property="og:title" content={externalQuiz.title} />
        <meta property="og:description" content={externalQuiz.description} />
        <meta property="og:image" content={externalQuiz.bg} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={externalQuiz.title} />
        <meta
          property="twitter:description"
          content={externalQuiz.description}
        />
        <meta property="twitter:image" content={externalQuiz.bg} />
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
