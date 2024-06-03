import React, { useRef } from "react";
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
            <CloseIcon style={stCloseIcon} />
          </StExitBtn>
          <StTextarea ref={text} placeholder="지금 무슨 생각을 하고 계신가요?"></StTextarea>
        </StTextareaWrap>
        <StToolWrap>
          <StPhotoInputWrap>
            <AddPhotoAlternateIcon style={stPhotoIcon} />
            <StInput type="file" accept="image/gif, image/jpeg, image/jpg, image/png" />
          </StPhotoInputWrap>
          <StSendBtn onClick={sendText}>
            <StSpan>등록하기</StSpan>
            <SendIcon style={stSendIcon} />
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
  justify-content: center;
  width: 600px;
  height: 500px;
  margin: 0 auto;
`;
const StTextareaWrap = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  background-color: #121212;
`;
const StExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
`;
const StTextarea = styled.textarea`
  display: block;
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  padding: 10px;
  border: none;
  resize: none;
  outline: none;
  box-sizing: border-box;
  overflow: auto;
  font-size: 1rem;

  background-color: transparent;
  color: #fefefe;
`;
const StToolWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 14%;
  padding: 10px;
  border-top: 1px solid #fefefe80;
  box-sizing: border-box;
  background-color: #121212;
`;
const StPhotoInputWrap = styled.label`
  position: relative;
  width: 10%;
  border: 0;
  cursor: pointer;
`;
const StInput = styled.input`
  display: none;
`;
const StSendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 22%;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  background-color: #ffd0d0;
`;
const StSpan = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 700;
`;

const stCloseIcon = {
  fontSize: "1.4rem",
  color: "#fefefe",
};
const stPhotoIcon = {
  position: "absolute",
  top: "50%",
  left: "50%",
  margin: "-11.2px 0 0 -11.2px",
  fontSize: "1.4rem",
  color: "#fefefe",
};
const stSendIcon = {
  fontSize: "1rem",
  marginTop: "2px",
};
