import React, { useState } from "react";
import styled from "styled-components";

const ProfileEdit = ({ profile, onClose, onSave }) => {
  const [nickname, setNickname] = useState(profile.nickname || "");
  const [text, setText] = useState(profile.text || "");

  const handleSaveClick = () => {
    onSave({ ...profile, nickname, text });
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>
          <h2>프로필 수정</h2>
        </ModalHeader>
        <ModalBody>
          <label>
            닉네임:
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
          </label>
          <label>
            상태 메시지:
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
          </label>
        </ModalBody>
        <ModalFooter>
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={onClose}>취소</button>
        </ModalFooter>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #121212;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h2 {
    margin: 0;
    color: #fff;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    color: #fff;

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  button:nth-child(1) {
    background-color: #ffd0d0;
    color: #000;

    &:hover {
      background-color: #ffc0c0;
    }
  }

  button:nth-child(2) {
    background-color: #121212;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  }
`;

export default ProfileEdit;
