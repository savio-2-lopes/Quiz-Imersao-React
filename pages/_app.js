import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import HeadConfig from './_head';
import db from '../db.json';
 
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
  <>
  <HeadConfig />
  <ThemeProvider theme={theme}>
     <GlobalStyle />
     <Component {...pageProps} />
  </ThemeProvider>
  </>
  );
}
