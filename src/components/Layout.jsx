import styled from "styled-components";
import Search from "./Search";
import PopularPost from "./PopularPost";
import MainFeed from "./MainFeed";
import { useState } from "react";
import Weather from "./Weather";

const LayoutContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Box = styled.div`
  width: ${props => props.$width || "100%"};
  min-width: ${props => props.$minWidth || "0"};
  height: 100%;
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

const LoginBox = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  margin-bottom: 30px;
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

const UserName = styled.span`
  font-size: ${props => props.$fontSize || "18px"};
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
const CopyRight = styled.div`
  flex-shrink: 0;
  padding: 50px 30px;
  align-items: center;
  text-align: center;

  & > p {
    font-size: 12px;
    margin-bottom: 20px;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const LeftBox = () => {
    return (
        <Box $width="15%" $minWidth="250px">
            <BoxInner>
                <Logo>
                    <img src="/src/assets/logo.png" alt="News Feed Logo" width="100%" height="100%" />
                </Logo>
                <Login />
                <PostButton>새글 등록하기</PostButton>
            </BoxInner>
        </Box>
    );
};

const Login = () => {
    return (
        <LoginBox>
            <UserInfo>
                <UserImg src="/src/assets/User.jpg" alt="Login" />
                <UserName>로그인을 하세요</UserName>
            </UserInfo>
        </LoginBox>
    );
};

const FeedBox = ({ userInput }) => {
    return (
        <Box $width="65%">
            <BoxInner>
                <MainFeed userInput={userInput} />
            </BoxInner>
        </Box>
    );
};

const RightBox = ({ userInput, setUserInput }) => {
    return (
        <Box $width="20%" $minWidth="350px">
            <BoxInner>
                <Search userInput={userInput} setUserInput={setUserInput} />
                <PopularPost />
                <Weather />
                <CopyRight>
                    <p>박채수 윤새라 이성찬 양동규 유수지 이녕수</p>
                    <p>copyright ⓒ 2024 캐럿 All right reserved.</p>
                </CopyRight>
            </BoxInner>
        </Box>
    );
};

export default function Layout() {
    const [userInput, setUserInput] = useState("");

    return (
        <LayoutContainer>
            <LeftBox />
            <FeedBox userInput={userInput} setUserInput={setUserInput} />
            <RightBox userInput={userInput} setUserInput={setUserInput} />
        </LayoutContainer>
    );
}
