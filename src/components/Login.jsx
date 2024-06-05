import React, { useRef, useState } from 'react';
import Modal from '../pages/Modal';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = ({ isModalOpen, setIsModalOpen, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

  const signInUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: idRef.current.value,
      password: pwRef.current.value,
    });

    if (error) {
      console.log(error);
    } else {
      console.log('login: ', data);
      alert('로그인이 완료되었습니다');
      setIsLoggedIn(true);
      setIsModalOpen(false);
      // navigate('/');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const gotoJoin = () => {
    navigate('/join');
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginWrapper>
          <Circle />
          <Form>
            <LoginInput>
              <Label>아이디:</Label>
              <Input type="email" placeholder="아이디를 입력하세요" ref={idRef} required />
            </LoginInput>
            <LoginInput>
              <Label>비밀번호:</Label>
              <Input type="password" placeholder="비밀번호를 입력하세요" ref={pwRef} required />
            </LoginInput>
            <Button type="submit" onClick={signInUser}>로그인</Button>
            <SignUp onClick={gotoJoin}>회원가입</SignUp>
          </Form>
        </LoginWrapper>
      </Modal>
    </div>
  );
};

export default Login;

const Button = styled.button`
  background-color: #FFD0D0;
  color: black;
  border: none;
  padding: 10px 80px;
  margin: 20px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 15px;

  &:hover {
    background-color: #f8cacc;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #CC8798;
  padding: 20px;
  border-radius: 15px;
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  background-color: #FFD0D0;
  border-radius: 50%;
  position: absolute;
  top: -25px;
  left: -25px; 
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
  width: 700px;
  height: 700px;
  justify-content: center;
`;

const LoginInput = styled.div`
  margin: 20px 0;
  width: 80%;
  text-align: left;
  padding: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: inline-block;
  color: black;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid #333;
  margin-top: 5px;
`;

const SignUp = styled.div`
  color: #FF6F61;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;