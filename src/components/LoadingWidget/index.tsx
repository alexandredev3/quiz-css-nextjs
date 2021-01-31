import Lottie, { Options } from 'react-lottie';
import styled from 'styled-components';

import brainAnimation from '../../../brain-animation.json';
import loadingAnimation from '../../../loading-animation.json';
import Widget from '../Widget';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function LoadingWidget() {
  const brainAnimationOption: Options = {
    loop: true,
    autoplay: true,
    animationData: brainAnimation,
  };

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
          <Lottie
            options={brainAnimationOption}
            width={300}
            height={300}
            style={{
              marginTop: '-78px',
            }}
          />
          <Lottie
            options={loadingAnimationOption}
            width={200}
            height={200}
            style={{
              marginTop: '-165px',
              marginBottom: '-60px',
              marginLeft: '46px',
            }}
          />
        </SpinnerContainer>
      </Widget.Content>
    </Widget>
  );
}
