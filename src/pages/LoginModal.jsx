import React from 'react';
import styled from 'styled-components';

//modal 다운 yarn add react-modal;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <Content2>
        <Content onClick={(e) => e.stopPropagation()}>
          {children}
          {/* <CloseButton onClick={onClose}>닫기</CloseButton> */}
        </Content>
      </Content2>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #141233;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content2 = styled.div`
  background-color: #CC8798;
  width: 700px;
  height: 700px;
  border-radius: 40px;

`;

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  width: 600px;
  height: 600px;
  max-width: 100%;
  margin: 30px;
  border-radius: 40px;
`;

const CloseButton = styled.button`
  background-color: #FFD0D0;
  color: black;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #F8CACC;
  }
`;

