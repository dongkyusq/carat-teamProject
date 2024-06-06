import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { setIsLoggedIn } from "../redux/slices/isLoggedInSlice";

const CommentModal = ({ isOpen, onClose, user_name, text_content }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [userDatas, setUserDatas] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: userData, error } = await supabase.from("user_data").select("nickname, profile").eq("id", user.id);
        setUserDatas(userData);
        if (userData && !error) {
          dispatch(setIsLoggedIn({ isLoggedIn: true, user: userData }));
        } else {
          console.error("Failed to fetch user data", error);
        }
      } else {
        dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
      }
    };

    if (isOpen) {
      checkLoginStatus();
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <ModalBox onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <UserBox>
          <ProfileImg src="public\img\profileLogo.png" />
          <NameBox>{user_name}</NameBox>
        </UserBox>
        <ModalPost>{text_content}</ModalPost>
        <CommentBox>
          <UserBox>
            <ProfileImg src={isLoggedIn && userDatas && userDatas[0]?.profile ? userDatas[0].profile : "public/img/profileLogo.png"} />
            <NameBox>{isLoggedIn && userDatas && userDatas[0]?.nickname ? userDatas[0].nickname : "비회원"}</NameBox>
          </UserBox>
          <CommentInput placeholder={`${user_name}님에게 답글 남기기...`} />
          <AddCommentBtn>답글</AddCommentBtn>
        </CommentBox>
        <CloseButton onClick={onClose}>
          <CloseIcon sx={{ color: "#141233", fontSize: "30px", marginLeft: "110px", marginTop: "-2px", "&:hover": { color: "#f8cacc" } }} />
        </CloseButton>
      </ModalContainer>
    </ModalBox>
  );
};

const NameBox = styled.span`
  margin-left: 8px;
`;

const AddCommentBtn = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px;
  height: 35px;
  width: 60px;
  background-color: #ffd0d0;
  margin-top: 5px;
  margin-left: 440px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

const CommentInput = styled.input`
  background-color: #ffd0d0;
  border: 0;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  width: 96%;
  font-size: 18px;
  font-weight: 400;
`;

const CommentBox = styled.div`
  margin-top: 20px;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
`;

const ModalPost = styled.div`
  background-color: #ffd0d0;
  border-radius: 10px;
  padding: 10px;
  color: black;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #cc8798;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 500px;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export default CommentModal;
