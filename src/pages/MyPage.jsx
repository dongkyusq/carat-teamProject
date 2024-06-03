// import React from "react";
// import styled from "styled-components";

// const MyPage = () => {
//   const dummyData = {
//     nickname: "메롱",
//     mbti: "ESTJ",
//     comment: "파이팅",
//     background: "",
//     profile: "",
//   };
//   return <></>;
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #1a1a1a;
//   color: #fff;
// `;

// const BackgroundImage = styled.img`
//   width: 100%;
//   height: 200px;
//   background-color: #444;
// `;

// const ProfileSelect = styled.div``;

// const ProfileImage = styled.img``;

// const UserInfo = styled.div``;

// const Name = styled.div`
// `;
// export default MyPage;

import React from "react";
import styled from "styled-components";

const MyPage = () => {
  const dummyData = {
    nickname: "name",
    id: "@id__",
    comment: "한줄한마디~~",
    background: "",
    profile: "",
  };

  return (
    <Container>
      <Background>
        <BackgroundImage src={dummyData.background} alt="Background" />
      </Background>
      <ProfileSection>
        <ProfileImage src={dummyData.profile} alt="Profile" />
        <UserInfo>
          <Name>{dummyData.nickname}</Name>
          <Id>{dummyData.id}</Id>
          <Comment>{dummyData.comment}</Comment>
        </UserInfo>
      </ProfileSection>
      <Content>
        <Divider />
        <SearchAndFilter>
          <SearchInput placeholder="Search" />
          <FilterIcon>🔍</FilterIcon>
        </SearchAndFilter>
        <Posts>
          <Post>
            <PostProfileImage src={dummyData.profile} alt="Profile" />
            <PostContent>userName</PostContent>
          </Post>
        </Posts>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  color: #fff;
  width: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 200px;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  padding: 10px;
  margin-top: -50px; /* Background 영역과 프로필 영역이 겹치지 않도록 조정 */
  z-index: 1;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffcccc;
  border: 5px solid #1a1a1a; /* 배경과의 분리 */
`;

const UserInfo = styled.div`
  margin-left: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Id = styled.div`
  font-size: 18px;
  color: #aaa;
`;

const Comment = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #555;
  margin: 20px 0;
`;

const SearchAndFilter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  padding: 5px;
  font-size: 16px;
`;

const FilterIcon = styled.div`
  margin-left: 10px;
`;

const Posts = styled.div`
  width: 100%;
`;

const Post = styled.div`
  background-color: #ffcccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const PostProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffcccc;
`;

const PostContent = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

export default MyPage;
