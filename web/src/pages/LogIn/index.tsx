import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormContainer, LinksContainer, Background } from './styles';

const LogIn: React.FC = () => {
  const logInFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, []);

  return (
    <>
      <Header />
      <FormContainer>
        <h2>Bem vindo(a) de volta ao Stocker!</h2>

        <strong>Fazer login</strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="Digite seu email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Digite sua senha"
          />
          <Button type="submit">Entrar</Button>
        </Form>

        <LinksContainer>
          <Link to="/register">Cadastre-se</Link>
          <Link to="/forgot-password">Esqueci a senha</Link>
        </LinksContainer>
      </FormContainer>
      <Background />
    </>
  );
};

export default LogIn;
