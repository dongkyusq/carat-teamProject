import React from "react";
import styled from "styled-components";

const MyPage = () => {
  const dummyData = {
    nickname: "name",
    id: "@id__",
    comment: "어렵다...",
    background: "",
    profile: "",
  };

  return (
    <StMainContainer>
      <StHeader>
        <StBackButton>←</StBackButton>
      </StHeader>
      <StBackground>
        <StBackgroundImage src={dummyData.background} alt="Background" />
      </StBackground>
      <StProfileContainer>
        <StProfileWrapper>
          <StProfileImage src={dummyData.profile} alt="Profile" />
          <StUserInfo>
            <StUserName>{dummyData.nickname}</StUserName>
            <StUserId>{dummyData.id}</StUserId>
            <StUserComment>{dummyData.comment}</StUserComment>
          </StUserInfo>
        </StProfileWrapper>
        <StEditProfileButton>프로필수정</StEditProfileButton>
      </StProfileContainer>
    </StMainContainer>
  );
};

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141233;
  color: #fff;
  width: 600px;
  margin: 0 auto;
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  background-color: #141233;
`;

const StBackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

const StBackground = styled.div`
  width: 100%;
  height: 200px;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StProfileContainer = styled.section`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffcccc;
  border: 5px solid #1a1a1a;
  margin-right: 20px;
`;

const StUserInfo = styled.div`
  text-align: left;
`;

const StUserName = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const StUserId = styled.p`
  font-size: 18px;
  color: #aaa;
`;

const StUserComment = styled.p`
  font-size: 16px;
  margin-top: 5px;
`;

const StEditProfileButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  color: #1a1a1a;
  background-color: #ffd0d0;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffc0c0;
  }
`;

export default MyPage;
