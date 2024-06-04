import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const dummyData = {
    nickname: "name",
    id: "@id__",
    comment: "어렵다...",
    background: "",
    profile: "",
  };

  const navigate = useNavigate();

  return (
    <StMainContainer>
      <StHeader>
        <StyledArrowBackIcon onClick={() => navigate("/")} />
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
  width: 775px;
  margin: 0 auto;
  border-left: solid 1px #cc8798;
  border-right: solid 1px #cc8798;
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #141233;
`;

const StyledArrowBackIcon = styled(ArrowBackIcon)`
  font-size: 1.4rem;
  color: #fefefe;
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
  height: 200px;
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
  margin-top: 15px;
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
