/* eslint-disable no-unused-expressions */
import styled, { StyledComponentBase } from 'styled-components';

interface IWidget extends StyledComponentBase<'div', any, {}> {
  Header?: any;
  Content?: any;
  Form?: any;
  Topic?: any;
  Button?: any;
}

interface Props {
  selected: boolean;
  correct: boolean;
  wrong: boolean;
}

const Widget: IWidget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  > p {
    width: 100%;
    font-size: 16px;
    margin-bottom: 32px;
    margin-top: -1px;
  }

  > button {
    height: 42px;
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.contrastText};
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.buttonFilled};

    &:disabled {
      background: ${({ theme }) => theme.colors.disableButton};
    }

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  }
`;

Widget.Topic = styled.a<Props>`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;

  > input {
    display: none;
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  background-color: ${({ theme, selected }) =>
    selected && `${theme.colors.primary}`};
  background-color: ${({ theme, correct }) =>
    correct && `${theme.colors.success}`};
  background-color: ${({ theme, wrong }) => wrong && `${theme.colors.wrong}`};
`;

Widget.Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 16px;
`;

export default Widget;
