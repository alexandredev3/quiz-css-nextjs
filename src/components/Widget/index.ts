import styled, { StyledComponentBase, css } from 'styled-components';

interface Props {
  isFocus: boolean;
  isFilled: boolean;
}

interface IWidget extends StyledComponentBase<'div', any, {}> {
  Header?: any;
  Content?: any;
  Form?: any;
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

Widget.Form = styled.form<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;

  > p {
    width: 100%;
    font-size: 16px;
    margin-bottom: 32px;
    margin-top: -1px;
  }

  > input {
    outline: 0;
    height: 42px;
    background: transparent;
    border-radius: 4px;
    border: 1.8px solid ${({ theme }) => theme.colors.inputBorder};
    padding: 15px;
    margin-bottom: 26px;
    color: ${({ theme }) => theme.colors.contrastText};
    font-size: 14px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.inputPlaceholder};
    }

    ${({ isFilled }) =>
      isFilled &&
      css`
        border: 1.8px solid #4caf50;
      `};

    ${({ isFocus }) =>
      isFocus &&
      css`
        border: 1.8px solid #4caf50;
      `};
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

export default Widget;
