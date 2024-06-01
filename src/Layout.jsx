import styled from "styled-components";
import "./layout.css";

const Box = styled.div`
    width: ${(props) => props.$width || "100%"};
    min-width: ${(props) => props.$minWidth || "0"};
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
    margin-bottom: ${(props) => props.$marginBottom || "20px"};
`;

const UserImg = styled.img`
    border-radius: 100%;
    background: #F8CACC;
    width: ${(props) => props.$width || "50px"};
    height: ${(props) => props.$height || "50px"};
    margin-right: ${(props) => props.$marginRight || "15px"};
`;

const UserName = styled.span`
    font-size: ${(props) => props.$fontSize || "18px"};
`;

const PostButton = styled.button`
    flex-shrink: 0;
    width: 100%;
    height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 20px;
    background: #FFD0D0;
    color: #000;
`;

const LeftBox = () => {
    return (
        <Box $width="15%" $minWidth="250px">
            <BoxInner>
                <Logo>
                    <img src="/src/assets/logo.png" alt="News Feed Logo" width="100%" height="100%"/>
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

const FeedBox = () => {
    return (
        <Box $width="65%">
            <BoxInner>
                <FeedList />
            </BoxInner>
        </Box>
    );
};

const FeedList = () => {
    return (
        <ul className="feedList">
            <li className="feedItem">
                <div className="userInfo">
                    <img src="/src/assets/User.jpg" alt="User" />
                    <span className="userName">User Name</span>
                </div>
                <div className="feedContent">
                    <p className="feedText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt aliquam. Nullam nec purus nec nunc tincidunt aliquam.</p>
                </div>
            </li>
        </ul>
    );
};

const RightBox = () => {
    return (
        <Box $width="20%" $minWidth="350px">
            <BoxInner>
                <SearchBox />
                <UserList />
                <WeatherBox />

                <div className="copyRight">
                    <p>박채수 윤새라 이성찬 양동규 유수지 이녕수</p>
                    <p>copyright ⓒ 2024 캐럿 All right reserved.</p>
                </div>
            </BoxInner>
        </Box>
    );
};

const SearchBox = () => {
    return (
        <div className="searchBox">
            <input type="text" className="searchInput" placeholder="Search" />
            <button className="searchButton">
                <svg id="fi_3031293" enable-background="new 0 0 461.516 461.516" height="20" viewBox="0 0 461.516 461.516" width="20" xmlns="http://www.w3.org/2000/svg">
                <g><path d="m185.746 371.332c41.251.001 81.322-13.762 113.866-39.11l122.778 122.778c9.172 8.858 23.787 8.604 32.645-.568 8.641-8.947 8.641-23.131 0-32.077l-122.778-122.778c62.899-80.968 48.252-197.595-32.716-260.494s-197.594-48.252-260.493 32.716-48.252 197.595 32.716 260.494c32.597 25.323 72.704 39.06 113.982 39.039zm-98.651-284.273c54.484-54.485 142.82-54.486 197.305-.002s54.486 142.82.002 197.305-142.82 54.486-197.305.002c-.001-.001-.001-.001-.002-.002-54.484-54.087-54.805-142.101-.718-196.585.239-.24.478-.479.718-.718z"></path></g>
                </svg>
            </button>
        </div>
    );
};

const UserList = () => {
    return (
        <ul className="userList">
            <li className="userItem">
                <div className="userInfo">
                    <img src="/src/assets/User.jpg" alt="User" />
                    <span className="userName">User Name</span>
                </div>
                <div className="recentContent">
                    <p className="contentTitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt aliquam. Nullam nec purus nec nunc tincidunt aliquam.</p>
                </div>
            </li>
        </ul>
    );
};

const WeatherBox = () => {
    return (
        <div className="weatherBox">
            <div className="weatherBoxInner">
            </div>
        </div>
    );
};

export default function Layout() {
    return (
        <div className="layoutContainer">
            <LeftBox />
            <FeedBox />
            <RightBox />
        </div>
    );
}