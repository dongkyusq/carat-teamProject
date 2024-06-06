import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropdownPack from "./DropdownPack";
import Login from "./Login";
import { useEffect, useState } from "react";
import { getId } from "../API/authkeep";
import supabase from "../supabaseClient";

const LeftBox = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const [userName, setUserName] = useState(""); // 로그인한 유저이름 상태 추가
  const [userImg, setUserImg] = useState(""); // 로그인한 유저프로필 상태 추가

  const goPostPage = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("로그인한 유저만 게시물을 작성할 수 있습니다.");
      return;
    }
    navigate("/post"); // 새글 등록창으로 이동
  };

  const navigateToHome = () => {
    navigate(-1);
  };

  const navigateToMyPage = () => {
    // mypage로 이동
    navigate("/mypage");
  };

  const signOutUser = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log("signout: ", { data, error });

    if (!error) {
      setIsLoggedIn(false);
      alert("로그아웃이 완료되었습니다");
    } else {
      console.log(error);
    }
  };

  const handlebtnClick = () => {
    if (isLoggedIn) {
      signOutUser();
    } else {
      setIsModalOpen(true);
    }
  };

  // 로그인 유지
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const userId = await getId();
  //     if (userId) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const checkLoginStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setIsLoggedIn(true);
      const { data: userData, error } = await supabase.from("user_data").select("nickname, profile").eq("id", user.id).single();
      if (userData && !error) {
        setUserName(userData.nickname);
        setUserImg(userData.profile || "/public/img/profileLogo.png");
      } else {
        console.error("Failed to fetch user data", error);
      }
    } else {
      setUserName("");
      setUserImg("public/img/profileLogo.png");
      setIsLoggedIn(false); // 로그아웃 상태로 변경
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  console.log(isLoggedIn);

  return (
    <Box>
      <BoxInner>
        <Logo onClick={navigateToHome}>
          <LogoImg src="/src/assets/logo.png" alt="News Feed Logo" width="100%" height="100%" />
        </Logo>
        <UserBox>
          <UserInfo>
            <UserImg src={userImg} alt="Login" />
            <UserName>{isLoggedIn ? userName : "로그인이 필요합니다."}</UserName>
          </UserInfo>
          <LoginBtn onClick={handlebtnClick}>{isLoggedIn ? "로그아웃" : "로그인"}</LoginBtn>
          <DropdownPack />
        </UserBox>
        <PostButton onClick={goPostPage}>새글 등록하기</PostButton>
      </BoxInner>
      <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsLoggedIn={setIsLoggedIn} /> {/* Login 컴포넌트에 props 전달 */}
    </Box>
  );
};

export default LeftBox;

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
  margin: -20px 0 0 -30px;
  cursor: pointer;
`;

const PostButton = styled.button`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background: #ffd0d0;
  border: 0;
  color: #141233;
  cursor: pointer;

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
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const UserName = styled.span`
  background-color: transparent;
  border: 0;
  color: white;
  text-align: center;
  font-size: 20px;
  margin-left: 20px;
`;

const LoginBtn = styled.button`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 0;
  height: 50px;
  background: #f8cacc;
  color: #141233;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #cc8798;
    color: white;
  }
`;

const UserBox = styled.div`
  margin-top: 0;
`;
