import React from 'react';
import styled from 'styled-components';

import { useRouter} from 'next/router';
import { useEffect, useState } from "react";

import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

import ContentLoader from "react-content-loader";
import Confetti from "react-confetti";

import db from '../db.json';

export const LoadingWidget = (props) => (
  <Widget>
    <Widget.Header />
    <ContentLoader
      speed={2}
      width={400}
      height={360}
      viewBox="0 0 400 360"
      backgroundColor="rgba(40,40,40,0.2)"
      foregroundColor="rgba(60,60,60, 0.2)"
      {...props}
    >
      <rect x="24" y="71" rx="2" ry="2" width="306" height="13" />
      <rect x="24" y="28" rx="0" ry="0" width="308" height="39" />
      <rect x="23" y="92" rx="0" ry="0" width="167" height="13" />
      <rect x="41" y="120" rx="0" ry="0" width="269" height="44" />
      <rect x="42" y="171" rx="0" ry="0" width="268" height="42" />
      <rect x="43" y="286" rx="0" ry="0" width="267" height="44" />
      <rect x="43" y="221" rx="0" ry="0" width="268" height="42" />
    </ContentLoader>
  </Widget>
);

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

export const Result = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      <Widget>
        <Widget.Header>Resultado</Widget.Header>
        <Widget.Content>
          Você chegou até o final!
        </Widget.Content>
      </Widget>
    </>
  );
};

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};


export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

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
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <Result />}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
