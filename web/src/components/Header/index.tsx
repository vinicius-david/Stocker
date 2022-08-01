import React, { useRef, useCallback } from 'react';
import { FiHome, FiUser, FiTrendingUp, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../Input';

import { Header, HeaderContent, IconsContainer } from './styles';

const Button: React.FC = () => {
  const searchFormRef = useRef<FormHandles>(null);

  const handleSearchSubmit = useCallback(() => {
    console.log('data');
  }, []);

  return (
    <Header>
      <h1>STOCKER</h1>

      <HeaderContent>
        <Form ref={searchFormRef} onSubmit={handleSearchSubmit}>
          <Input name="search" placeholder="Buscar uma ação" />

          <button type="submit">
            <FiSearch size={24} />
          </button>
        </Form>

        <IconsContainer>
          <Link to="/">
            <FiHome size={24} />
          </Link>
          <Link to="/login">
            <FiUser size={24} />
          </Link>
          <Link to="/stocks">
            <FiTrendingUp size={24} />
          </Link>
        </IconsContainer>
      </HeaderContent>
    </Header>
  );
};

export default Button;
