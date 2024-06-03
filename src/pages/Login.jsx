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
            <Button onClick={openModal}>로그인</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <FormWrapper>
                    <Form>
                        <LoginInput>
                            <Label>아이디:</Label>
                            <Input type="email" placeholder="아이디를 입력하세요" required />
                        </LoginInput>
                        <LoginInput>
                            <Label>비밀번호:</Label>
                            <Input type="password" placeholder="비밀번호를 입력하세요" required />
                        </LoginInput>
                        <Button type="submit">로그인</Button>
                    </Form>
                    <LoginFooter>
                        <SignUp>회원가입</SignUp>
                    </LoginFooter>
                </FormWrapper>
            </Modal>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
  text-align: center;
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginInput = styled.div`
  margin: 20px 0;
  width: 100%;
  text-align: left;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: inline-block;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid #333;
  margin-top: 5px;
`;

const LoginFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SignUp = styled.div`
  color: #FF6F61;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;