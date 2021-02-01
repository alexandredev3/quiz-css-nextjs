import Lottie, { Options } from 'react-lottie';
import styled from 'styled-components';

import loadingAnimation from '../../../loading-animation.json';
import Widget from '../Widget';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function LoadingWidget() {
  const loadingAnimationOption: Options = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
  };

  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <SpinnerContainer>
          <Lottie options={loadingAnimationOption} width={200} height={200} />
        </SpinnerContainer>
      </Widget.Content>
    </Widget>
  );
}
