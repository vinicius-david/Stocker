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

  .echarts-for-react {
    min-width: 100%;
    height: 60%;
  }
`;

export const InfoHeader = styled.div`
  width: 100%;
  height: 20%;
  margin: 8px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h2 {
    align-self: center;
    font-size: 48px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 360px;

  button {
    max-width: 50%;
    max-height: 20%;
    margin: 2%;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;

  button {
    max-width: 50%;
    max-height: 20%;
    margin: 2%;

    background: rgba(0, 0, 0, 0);
  }
`;

export const Indicators = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 3%;
`;

export const Indicator = styled.div`
  width: 10%;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: right;

  margin: 2%;
`;

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 90vh;

  background: url(${homeBackground}) no-repeat center;
  background-size: cover;

  animation: ${animateOpacity} 0.5s ease;
`;
