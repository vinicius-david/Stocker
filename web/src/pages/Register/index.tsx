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
        <h2>Bem vindo(a) ao Stocker!</h2>

        <strong>Cadastro</strong>
        <Form ref={logInFormRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Digite seu nome" />
          <Input name="email" icon={FiMail} placeholder="Digite seu email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Escolha uma senha"
          />
          <Input
            name="password-confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirme sua senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <LinksContainer>
          <FiArrowLeft size={20} />
          <Link to="/login">Voltar ao login</Link>
        </LinksContainer>
      </FormContainer>
      <Background />
    </>
  );
};

export default Register;
