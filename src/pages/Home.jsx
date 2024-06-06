import styled from "styled-components";
import LeftBox from "../components/LeftBox";
import MainFeed from "../components/MainFeed";
import Search from "../components/Search";
import PopularPost from "../components/PopularPost";
import Weather from "../components/Weather";
import { useState } from "react";

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
    <Box $width="20%" $minWidth="350px" style={{ border: "0" }}>
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

export default function Home() {
  const [userInput, setUserInput] = useState("");
  return (
    <LayoutContainer>
      <LeftBox />
      <FeedBox userInput={userInput} setUserInput={setUserInput} />
      <RightBox userInput={userInput} setUserInput={setUserInput} />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

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
