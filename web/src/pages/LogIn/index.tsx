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
        <h2>Welcome back to Stocker!</h2>

        <strong>Login</strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Password"
          />
          <Button type="submit">Login</Button>
        </Form>

        <LinksContainer>
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </LinksContainer>
      </FormContainer>
      <Background />
    </>
  );
};

export default LogIn;
