import styled from "styled-components";
import Search from "./components/Search";
import PopularPost from "./components/PopularPost";
import MainFeed from "./components/MainFeed";
import { useState } from "react";
import Weather from "./components/Weather";

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

const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: ${props => props.$marginBottom || "unset"};
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: ${props => props.$marginBottom || "50px"};
`;

const FeedContent = styled.div`
  width: 100%;
  background: #cc8798;
  border-radius: 20px;

  & > p {
    margin: 20px;
    padding: 20px;
    background: #ffd0d0;
    border-radius: 20px;
    color: #000;
    word-wrap: break-word;
    word-break: keep-all;
  }
`;

// const RecentContent = styled.div`
//   padding: 20px;
//   background: #ffd0d0;
//   border-radius: 20px;

//   & > p {
//     font-size: 16px;
//     color: #000;
//     overflow: hidden;
//     word-wrap: break-word;
//     word-break: keep-all;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     width: 100%;
//   }
// `;

// const SearchBox = styled.div`
//     flex-shrink: 0;
//     position: relative;
//     margin-bottom: 30px;

//     & > input {
//         width: calc(100% - 50px);
//         height: 35px;
//         border: 0;
//         border-radius: 30px;
//         padding: 0 10px 0 40px;
//     }

//     & > button {
//         position: absolute;
//         top: 50%;
//         left: 5px;
//         transform: translateY(-50%);
//         width: 24px;
//         height: 24px;
//         border: 0;
//     }
// `;

// const WeatherBox = styled.div`
//   flex-shrink: 0;
//   display: block;
//   width: 100%;
//   height: 200px;
//   background: #000;
//   border-radius: 20px;
// `;

// const WeatherInner = styled.div``;

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

// const FeedList = () => {
//   return (
//     <List>
//       <ListItem>
//         <UserInfo>
//           <UserImg src="/src/assets/User.jpg" alt="User" />
//           <UserName>User Name</UserName>
//         </UserInfo>
//         <FeedContent>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt aliquam. Nullam nec purus nec nunc tincidunt aliquam.</p>
//         </FeedContent>
//       </ListItem>
//     </List>
//   );
// };

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

// const Search = () => {
//     return (
//         <SearchBox>
//             <input type="text" placeholder="Search" />
//             <button>
//                 <svg id="fi_3031293" enable-background="new 0 0 461.516 461.516" height="20" viewBox="0 0 461.516 461.516" width="20" xmlns="http://www.w3.org/2000/svg">
//                 <g><path d="m185.746 371.332c41.251.001 81.322-13.762 113.866-39.11l122.778 122.778c9.172 8.858 23.787 8.604 32.645-.568 8.641-8.947 8.641-23.131 0-32.077l-122.778-122.778c62.899-80.968 48.252-197.595-32.716-260.494s-197.594-48.252-260.493 32.716-48.252 197.595 32.716 260.494c32.597 25.323 72.704 39.06 113.982 39.039zm-98.651-284.273c54.484-54.485 142.82-54.486 197.305-.002s54.486 142.82.002 197.305-142.82 54.486-197.305.002c-.001-.001-.001-.001-.002-.002-54.484-54.087-54.805-142.101-.718-196.585.239-.24.478-.479.718-.718z"></path></g>
//                 </svg>
//             </button>
//         </SearchBox>
//     );
// };

// const UserList = () => {
//   return (
//     <List $marginBottom="30px">
//       <ListItem $marginBottom="20px">
//         <UserInfo $marginBottom="10px">
//           <UserImg src="/src/assets/User.jpg" alt="User" $width="30px" $height="30px" $marginRight="10px" />
//           <UserName $fontSize="16px">User Name</UserName>
//         </UserInfo>
//         <RecentContent>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt aliquam. Nullam nec purus nec nunc tincidunt aliquam.</p>
//         </RecentContent>
//       </ListItem>
//     </List>
//   );
// };

// const Weather = () => {
//   return (
//     <WeatherBox>
//       <WeatherInner></WeatherInner>
//     </WeatherBox>
//   );
// };

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
