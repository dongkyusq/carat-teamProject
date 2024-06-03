import React, { useState } from 'react';
import Modal from './LoginModal';
import styled from 'styled-components';

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <LoginWrapper>
            <Button onClick={openModal}>Login</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {/* <Title> 로그인 </Title> */}
                <Form>
                    <LoginInput>
                        <Label> 아이디 :</Label>
                        <Input type="email" placeholder='아이디를 입력하세요' required />
                    </LoginInput>
                    <LoginInput>
                        <Label> 비밀번호 :</Label>
                        <Input type="password" placeholder='비밀번호를 입력하세요' required />
                    </LoginInput>
                    <Button type="submit">로그인 </Button>
                </Form>
            </Modal>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h2`
font-size: 30px;
`;

const Button = styled.button`
  background-color: #FFD0D0;
  color: black;
  border: none;
  padding: 10px 80px;
  margin: 20px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 20px;

  &:hover {
    background-color: #f8cacc;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled.div`
  margin: 30px;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 10px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #333;
`;