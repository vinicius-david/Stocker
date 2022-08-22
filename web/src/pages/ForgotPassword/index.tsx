import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormContainer, LinksContainer, Background } from './styles';

const ForgotPassword: React.FC = () => {
  const logInFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, []);

  return (
    <>
      <Header />
      <FormContainer>
        <h2>Forgot password</h2>

        <strong>
          An email will be sent to you with instructions on resetting your
          password.
        </strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Button type="submit">Send email</Button>
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

export default ForgotPassword;
