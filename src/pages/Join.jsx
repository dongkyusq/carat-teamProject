import React, { useState } from 'react'
import Modal from './Modal';
import { styled } from 'styled-components';

const Join = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <Button onClick={openModal}> 회원가입 </Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <JoinWrapper>
                    <Circle />
                    <Form>
                        <JoinInput>
                            <Lable> 이름 * : </Lable>
                            <Input type="text" required />
                        </JoinInput>

                        <JoinInput>
                            <Lable> 닉네임 * : </Lable>
                            <Input type="text" required />
                        </JoinInput>

                        <JoinInput>
                            <Lable> 아이디 * :  </Lable>
                            <Input type="email" placeholder="이메일 형식으로 입력해주세요" required />
                        </JoinInput>

                        <JoinInput>
                            <Lable> 비밀번호 * :  </Lable>
                            <Input type="password" placeholder="비밀번호를 입력해주세요" required />
                        </JoinInput>

                        <JoinInput>
                            <Lable> 비밀번호 확인 * : </Lable>
                            <Input type="password" placeholder="비밀번호를 입력해주세요" required />
                        </JoinInput>

                        <JoinInput>
                            <Lable> MBTI * :  </Lable>
                            <Input type="text" placeholder="대문자로 입력해주세요" required />
                        </JoinInput>

                        <Text> *는 핋수 </Text>
                        <Button type="submit">회원가입</Button>
                    </Form>
                </JoinWrapper>
            </Modal>
        </div>
    )
}

export default Join;

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
const JoinWrapper = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #CC8798;
  padding: 20px;
  border-radius: 15px;
  width: 850px;
  height: 850px;
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
  width: 750px;
  height: 7500px;
  justify-content: center;
    
`;

const JoinInput = styled.div`
  margin: 5px;
  width: 80%;
  text-align: left;
  padding: 20px;
`;

const Lable = styled.label`
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

const Text = styled.div`
  font-size: 15px;
  color: red;
`;


