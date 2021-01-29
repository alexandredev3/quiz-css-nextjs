import styled, { keyframes } from 'styled-components';

import Widget from '../Widget';

const spinAnimation = keyframes`
  0 {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(360deg)
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;

  border: 8px solid ${({ theme }) => theme.colors.primary};
  border-top: 8px solid ${({ theme }) => theme.colors.mainBg};

  animation: ${spinAnimation} 1.5s linear infinite;
`;

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </Widget.Content>
    </Widget>
  );
}
