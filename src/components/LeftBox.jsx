import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropdownPack from "./DropdownPack";

const Box = styled.div`
  width: ${props => props.$width || "100%"};
  min-width: ${props => props.$minWidth || "0"};
  height: 100%;
  border-right: solid 1px #f8caca;
`;

const BoxInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: calc(100% - 40px);
  padding: 20px;
`;
const Logo = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  margin: -20px 0 30px -20px;
`;

const PostButton = styled.button`
  flex-shrink: 0;
  width: 100%;
  height: 70px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background: #ffd0d0;
  color: #000;
`;

const UserInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  margin-bottom: ${props => props.$marginBottom || "20px"};
`;

const UserImg = styled.img`
  border-radius: 100%;
  background: #f8cacc;
  width: ${props => props.$width || "50px"};
  height: ${props => props.$height || "50px"};
  margin-right: ${props => props.$marginRight || "15px"};
`;

const UserName = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  font-size: ${props => props.$fontSize || "18px"};
`;

const LeftBox = () => {
  const navigate = useNavigate();

  const goPostPage = () => {
    navigate("/post"); // 새글 등록창으로 이동
  };

  return (
    <Box $width="15%" $minWidth="250px">
      <BoxInner>
        <Logo>
          <img src="/src/assets/logo.png" alt="News Feed Logo" width="100%" height="100%" />
        </Logo>
        <Login />
        <DropdownPack />
        <PostButton onClick={goPostPage}>새글 등록하기</PostButton>
      </BoxInner>
    </Box>
  );
};

const Login = () => {
  return (
    <UserInfo>
      <UserImg src="/src/assets/User.jpg" alt="Login" />
      <UserName>로그인을 하세요</UserName>
    </UserInfo>
  );
};

export default LeftBox;
