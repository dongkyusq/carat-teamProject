import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropdownPack from "./DropdownPack";

const Box = styled.div`
  width: 295px;
  height: 100%;
  border-right: solid 1px #f8caca;
`;

const LogoImg = styled.img`
  scale: 70%;
`;

const BoxInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: calc(100% - 40px);
  padding: 10px;
`;
const Logo = styled.div`
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  margin: -30px 0 30px -30px;
`;

const PostButton = styled.button`
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background: #ffd0d0;
  border: 0;
  color: #141233;

  &:hover {
    background-color: #cc8798;
    color: white;
  }
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
  width: 40px;
  height: 40px;
`;

const UserName = styled.span`
  background-color: transparent;
  border: 0;
  color: white;
  text-align: center;
  font-size: 14px;
  margin-left: 10px;
`;

const LoginBtn = styled.button`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 0;
  height: 30px;
  background: #f8cacc;
  color: #141233;
  font-weight: bold;

  &:hover {
    background-color: #cc8798;
    color: white;
  }
`;

const UserBox = styled.div`
  margin-top: -60px;
  margin-bottom: -40px;
`;

const LeftBox = () => {
  const navigate = useNavigate();

  const navigateToNewPosting = () => {
    navigate("/"); // 새글 등록창으로 이동
  };

  const navigateToHome = () => {
    navigate(-1);
  };

  return (
    <Box>
      <BoxInner>
        <Logo onClick={navigateToHome}>
          <LogoImg src="/src/assets/logo.png" alt="News Feed Logo" width="100%" height="100%" />
        </Logo>
        <Login />
        <DropdownPack />
        <PostButton onClick={navigateToNewPosting}>New Posting</PostButton>
      </BoxInner>
    </Box>
  );
};

const Login = () => {
  return (
    <UserBox>
      <UserInfo>
        <UserImg src="public\img\profileLogo.png" alt="Login" />
        <UserName>로그인이 필요합니다.</UserName>
      </UserInfo>
      <LoginBtn>로그인</LoginBtn>
    </UserBox>
  );
};

export default LeftBox;
