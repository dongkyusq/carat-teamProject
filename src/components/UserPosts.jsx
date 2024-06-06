import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const UserPosts = ({ userId }) => {
  const posts = useSelector(state => state.posts.posts);
  const userPosts = posts.filter(post => post.user_id === userId);

  return (
    <PostList>
      {userPosts.map((post, index) => (
        <ListItem key={index}>
          <UserInfo>
            <UserImg src="/src/assets/User.jpg" alt="User" />
            <UserName>{post.user_name}</UserName>
            <TimeBox>{new Date(post.created_at).toLocaleString()}</TimeBox>
          </UserInfo>
          <FeedContent>
            <Posts>{post.text_content}</Posts>
            <IconListBox>
              <Button>
                <CommentIcon sx={{ fontSize: "30px", color: "white", "&:hover": { color: "#f8cacc" } }} />
              </Button>
              <Button>
                <FavoriteBorderIcon sx={{ fontSize: "30px", color: "white", "&:hover": { color: "#f8cacc" } }} />
                <LikesCount>{post.likes}</LikesCount>
              </Button>
            </IconListBox>
          </FeedContent>
        </ListItem>
      ))}
    </PostList>
  );
};

const PostList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: ${props => props.$marginBottom || "unset"};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: ${props => props.$marginBottom || "50px"};
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

const TimeBox = styled.p`
  margin-left: 10px;
  font-size: 13px;
  color: #b7bec4;
`;

const FeedContent = styled.div`
  width: 100%;
  background: #cc8798;
  border-radius: 20px;
`;

const Posts = styled.div`
  margin: 10px;
  padding: 20px;
  background: #ffd0d0;
  border-radius: 15px;
  color: #000;
  word-wrap: break-word;
  word-break: keep-all;
`;

const IconListBox = styled.div`
  display: flex;
  margin: 0 0 5px 15px;
  gap: 10px;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
`;

const LikesCount = styled.p`
  margin: 4px 0 0 2px;
  font-size: 20px;
  color: white;
`;

export default UserPosts;
