import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropdownPack from "./DropdownPack";

const Img = styled.img`
  height: 50px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  background-color: #ffd0d0;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
`;

const HomeLeft = () => {
  const navigate = useNavigate();

  const navigateToNewPosting = () => {
    navigate("/"); // 새글 등록창으로 이동
  };

  return (
    <LeftDiv>
      <div>
        <Img src="public/img/profileLogo.png" />
        <span>로그인이 필요합니다.</span>
        <br />
        <Button>로그인</Button>
      </div>
      <DropdownPack />
      <div>
        <Button onClick={navigateToNewPosting}>새글 등록하기</Button>
      </div>
    </LeftDiv>
  );
};

export default HomeLeft;
