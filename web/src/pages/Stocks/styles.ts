import styled, { keyframes } from 'styled-components';

import homeBackground from '../../assets/stocksBackground.jpg';

const animateOpacity = keyframes`
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
`;

const animateUp = keyframes`
  from {
    opacity: 0.2;
    transform: translateX(20px);
  }
  to {
    opacity: 0.975;
    transform: translateX(0px);
  }
`;

export const Main = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  flex: 1;

  position: relative;
`;

export const InfoContainer = styled.div`
  width: 90%;
  height: 85vh;
  padding: 24px 24px;
  border-radius: 12px;
  box-shadow: 4px 4px 5px #333;
  background: var(--color-background);

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 16px;
  left: 5%;
  z-index: 2;

  animation: ${animateUp} 0.5s ease;

  * {
    opacity: 1;
  }

  h2 {
    align-self: center;
    font-size: 48px;
    margin-bottom: 5%;
  }

  .echarts-for-react {
    min-width: 100%;
    height: 50%;
  }
`;

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 90vh;

  background: url(${homeBackground}) no-repeat center;
  background-size: cover;

  animation: ${animateOpacity} 0.5s ease;
`;
