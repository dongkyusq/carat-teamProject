import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function NewsfeedCreate() {
  const text = useRef("");

  const sendText = e => {
    e.preventDefault();
    console.log(text.current.value);
    /* 잘 들어온다 */
  };

  const uploadImg = e => {
    e.preventDefault();
  };

  return (
    <form>
      <StWriteWrap>
        <StTextareaWrap>
          <StExitBtn>
            <CloseIcon style={StIcon} />
          </StExitBtn>
          <StTextarea ref={text} placeholder="지금 무슨 생각을 하고 계신가요?"></StTextarea>
        </StTextareaWrap>
        <StHr />
        <StToolWrap>
          <StPhotoInput type="file" accept="image/gif, image/jpeg, image/jpg, image/png" src={<AddPhotoAlternateIcon />} />
          <StSendBtn onClick={sendText}>
            <StSpan>보내기</StSpan>
            <SendIcon style={StSendIcon} />
          </StSendBtn>
        </StToolWrap>
      </StWriteWrap>
    </form>
  );
}

export default NewsfeedCreate;

const StWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  height: 500px;
  margin: 0 auto;
  border-radius: 20px;

  font-family: "Pretendard-Regular";
  background-color: #121212;
`;
const StTextareaWrap = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
`;
const StExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  border: 0;
  background-color: transparent;
`;
const StTextarea = styled.textarea`
  display: block;
  position: absolute;
  bottom: 0px;
  left: 50px;
  width: calc(100% - 100px);
  height: calc(100% - 50px);
  padding: 10px;
  border: none;
  resize: none;
  box-sizing: border-box;
  outline: none;
  font-size: 1.1rem;

  background-color: transparent;
  color: #fefefe;
`;
const StToolWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 14%;
  padding: 12px;
  box-sizing: border-box;
`;
const StPhotoInput = styled.input`
  width: 10%;
  border: 0;
  background-color: transparent;
`;
const StSendBtn = styled.button`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 22%;
  border: 0;
  border-radius: 10px;
  align-items: center;
  background-color: #ffd0d0;
`;
const StSpan = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 900;
`;
const StHr = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background-color: #fefefe;
`;

const StIcon = {
  fontSize: "1.2rem",
  color: "#fefefe",
};
const StSendIcon = {
  display: "inline",
  fontSize: "1.1rem",
};
