import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Head from 'next/head'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%; 
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title> Musicais Quiz</title>
        <meta name="title" content="Hamilton Quiz" />
        <meta property="org:type" content="website" />
        <meta property="org:url" content="" />
        <meta property="org:title" content="Musicais Quiz" />
        <meta property="org:image" content="https://wallpapercave.com/wp/wp2296748.jpg" />
      </Head>

      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1> Musicais Quiz</h1>
            </Widget.Header>

            <Widget.Content>
              <p> Testes os seus conhecimentos sobre musicais divita-se criando o seu AluraQuiz! </p>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/savio-2-lopes" />
      </QuizBackground>
    </>
  );
}
{/* // Todos os direitos de imagem reservados a
        // a href="https://wallpapercave.com/w/wp2296748" */}
