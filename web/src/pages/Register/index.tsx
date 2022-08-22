import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormContainer, LinksContainer, Background } from './styles';

const Register: React.FC = () => {
  const logInFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, []);

  return (
    <>
      <Header />
      <FormContainer>
        <h2>Welcome to Stocker!</h2>

        <strong>Register</strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Password"
          />
          <Input
            name="password-confirmation"
            type="password"
            icon={FiLock}
            placeholder="Repeat password"
          />
          <Button type="submit">Register</Button>
        </Form>

        <LinksContainer>
          <FiArrowLeft size={20} />
          <Link to="/login">Back to login</Link>
        </LinksContainer>
      </FormContainer>
      <Background />
    </>
  );
};

export default Register;
