import React from 'react';
import { FiTrendingUp, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, ButtonsContainer, ButtonItem, Background } from './styles';

const Home: React.FC = () => (
  <>
    <Container>
      <h1>STOCKER</h1>
      <h3>
        Acompanhe as principais ações e fundos imobiliários do mercado de forma
        simples e prática.
      </h3>

      <ButtonsContainer>
        <ButtonItem>
          <FiTrendingUp size={24} />
          <Link to="/stocks">Ações / FIIS</Link>
        </ButtonItem>
        <ButtonItem>
          <FiLogIn size={24} />
          <Link to="/login">Fazer login</Link>
        </ButtonItem>
      </ButtonsContainer>
    </Container>
    <Background />
  </>
);

export default Home;
