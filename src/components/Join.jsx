import React, { useRef, useState } from "react";
import Modal from "../pages/Modal";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid"; //yarn add uuid
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const idRef = useRef();
  const pwRef = useRef();
  const confirmpwRef = useRef();
  const mbtiRef = useRef();

  const signUpUser = async e => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: idRef.current.value,
      password: pwRef.current.value,
    });

    if (error) {
      console.log(error);
    } else {
      console.log("authdata:", data);
    }

    const user = data.user;
    if (user) {
      const defaultProfile = 'https://jwyfdpnxmxjqwmmqfjsf.supabase.co/storage/v1/object/public/profile/public/default-profile.jpg';
      const defaultBackground = 'https://jwyfdpnxmxjqwmmqfjsf.supabase.co/storage/v1/object/public/bg/public/default-bg.png';
      const { error: insertError } = await supabase.from("user_data").insert([
        {
          name: nameRef.current.value,
          nickname: nicknameRef.current.value,
          email: idRef.current.value,
          password: pwRef.current.value,
          id: data.user.id,
          mbti: mbtiRef.current.value,
          profile: defaultProfile,
          background: defaultBackground,
        },
      ]);
      if (insertError) {
        console.log(insertError);
      } else {
        console.log("insertdata:", data);
        alert("회원가입이 완료되었습니다");
        setIsModalOpen(false);
        navigate("/");
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
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
              <Input type="text" ref={nameRef} required />
            </JoinInput>

            <JoinInput>
              <Lable> 닉네임 * : </Lable>
              <Input type="text" ref={nicknameRef} required />
            </JoinInput>

            <JoinInput>
              <Lable> 아이디 * : </Lable>
              <Input type="email" placeholder="이메일 형식으로 입력해주세요" ref={idRef} required />
            </JoinInput>

            <JoinInput>
              <Lable> 비밀번호 * : </Lable>
              <Input type="password" placeholder="비밀번호를 입력해주세요" ref={pwRef} required />
            </JoinInput>

            <JoinInput>
              <Lable> 비밀번호 확인 * : </Lable>
              <Input type="password" placeholder="비밀번호를 입력해주세요" ref={confirmpwRef} required />
            </JoinInput>

            <JoinInput>
              <Lable> MBTI * : </Lable>
              <Input type="text" placeholder="대문자로 입력해주세요" ref={mbtiRef} required />
            </JoinInput>

            <Text> *는 필수 </Text>
            <Button type="submit" onClick={signUpUser}>
              회원가입
            </Button>
          </Form>
        </JoinWrapper>
      </Modal>
    </div>
  );
};

export default Join;

const Button = styled.button`
  background-color: #ffd0d0;
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
  background-color: #cc8798;
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
  background-color: #ffd0d0;
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

const Text = styled.div`
  font-size: 15px;
  color: red;
`;
