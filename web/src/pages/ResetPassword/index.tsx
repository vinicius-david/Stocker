import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock } from 'react-icons/fi';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormContainer, Background } from './styles';

const ResetPassword: React.FC = () => {
  const logInFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, []);

  return (
    <>
      <Header />
      <FormContainer>
        <h2>Reset password</h2>

        <strong>
          Define a new password to recover your access to Stocker.
        </strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="New password"
          />
          <Input
            name="password-confirmation"
            type="password"
            icon={FiLock}
            placeholder="Repeat password"
          />

          <Button type="submit">Reset</Button>
        </Form>
      </FormContainer>
      <Background />
    </>
  );
};

export default ResetPassword;
