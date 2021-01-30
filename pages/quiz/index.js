import React from 'react';
import ContentLoader from "react-content-loader";
import { motion } from 'framer-motion';

import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Widget from '../../src/components/Widget';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Confetti from "react-confetti";
import db from '../../db.json';

export const Loader = (props) => (
  <Widget>
    <ContentLoader
      speed={2}
      width={400}
      height={600}
      viewBox="400 360"
      backgroundColor="rgba(161, 201, 37, 1)"
      foregroundColor="rgba(32, 117, 207, 0.4)"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="400" height="50" />
      <rect x="0" y="60" rx="0" ry="0" width="400" height="150" />
      <rect x="25" y="220" rx="0" ry="0" width="300" height="50" />
      <rect x="25" y="280" rx="0" ry="0" width="300" height="10" />
      <rect x="25" y="310" rx="0" ry="0" width="300" height="50" />
      <rect x="25" y="370" rx="0" ry="0" width="300" height="50" />
      <rect x="25" y="430" rx="0" ry="0" width="300" height="50" />
      <rect x="25" y="490" rx="0" ry="0" width="300" height="50" />
      <rect x="75" y="560" rx="0" ry="0" width="200" height="30" />
    </ContentLoader>
  </Widget>
);

export const ResultWidget = ({ results }) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <>
      <Confetti width={width} height={height} recycle={false} />

      <Widget
        as={motion.section}
        transition={{ delay: 0, duration: 0.7 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >

        <Widget.Header >
          <BackLinkArrow href="/" />
          Resultado
        </Widget.Header>

        <Widget.Content>
          <p>
            Você acertou
            {' '}
            {
              results.reduce(
                (accumulator, currentResult) => {
                  return currentResult === true ? accumulator + 1 : accumulator;
                }, 0
              )
            }
            {' '}
            perguntas
          </p>

          <ul>
            {results.map(
              (result, index) => (
                <li key={`result_${index}`}>🏆 {''}
                  {index + 1}
                  {' '}
                  Resultado:
                  {result ? " Acertou!" : " Errou!"}
                </li>
              ))}
          </ul>
        </Widget.Content>
      </Widget>
    </>
  );
};

function QuestionWidget({
  question,
  questionIndex,
  totalQuestion,
  onSubmit,
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>

      <img
        alt="description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>"{question.description}"</p>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setSelectedAlternative(undefined)
              setIsQuestionSubmited(false);
            }, 2 * 1000)
          }}
        >

          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative_${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  checked={isSelected}
                  onChange={() => { setSelectedAlternative(index) }}
                />
                {alternative}
              </Widget.Topic>
            )
          })}

          <Button
            disabled={!hasAlternativeSelected}
            type="submit"
          >
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {
          screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestion={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )
        }

        {screenState === screenStates.LOADING && <Loader />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
