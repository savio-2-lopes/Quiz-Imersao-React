import React from 'react';
import ContentLoader from "react-content-loader";
import { motion } from 'framer-motion';

import QuizContainer from '../components/QuizContainer';
import QuizBackground from '../components/QuizBackground';
import AlternativesForm from '../components/AlternativesForm';
import Widget from '../components/Widget';
import Button from '../components/Button';
import BackLinkArrow from '../components/BackLinkArrow';

export const Loader = (props) => (
  <Widget>
    <ContentLoader
      speed={2}
      width={400}
      height={360}
      viewBox="400 360"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="350" height="400" />
    </ContentLoader>
  </Widget>
);

export const ResultWidget = ({results}) => (
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
      <BackLinkArrow href="/"/>
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
              <li key={`result_${index}`}>
                #
                {index + 1}
                {' '}
                Resultado: 
                {
                  result 
                  ? " Acertou!" 
                  : " Errou!"
                }
              </li>
            )
          )}
      </ul>
    </Widget.Content>
  </Widget>
);

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
      <Widget.Header>
        <BackLinkArrow href="/"/>

        <h3>
          {`Pergunta ${questionIndex+1} de ${totalQuestion}`}
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
                    onChange={() => {setSelectedAlternative(index)}}
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

export default function QuizPage({externalQuestions, externalBackground}) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);

  const totalQuestions= externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  function addResult(result){
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
    <QuizBackground backgroundImage={externalBackground}>
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

        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}
