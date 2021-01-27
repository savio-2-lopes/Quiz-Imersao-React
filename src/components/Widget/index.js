import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child{
    margin-top: 0;
  }
  & >*:last-child{
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  input {
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
    width: 100%;
    margin-bottom: 14px;
    padding: 7px 15px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.mainBg};
    border-radius: 4px;
    font-size: 16px;
  }
  button {
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
    width: 100%;
    padding: 10px 16px;
    border: none;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
  }
  button:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
  }
`;

export default Widget;
