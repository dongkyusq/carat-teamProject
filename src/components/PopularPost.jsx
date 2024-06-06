import styled from "styled-components";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

const List = styled.ul`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RecentContent = styled.div`
  padding: 20px;
  background: #ffd0d0;
  border-radius: 20px;

  & > div {
    font-size: 16px;
    color: #000;
    overflow: hidden;
    word-wrap: break-word;
    word-break: keep-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
`;

const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      let { data, error } = await supabase.from("posts").select("text_content, likes, user_name");
      if (error) {
        console.log("error", error);
      } else {
        console.log("data", data);
        setPosts(data);
      }
    };

    getProducts();
  }, []);

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase()).sort((a, b) => b.likes - a.likes);
  return (
    <List $marginBottom="30px">
      {filteredPosts.map((post, index) => (
        <ListItem key={index} $marginBottom="20px">
          <UserInfo $marginBottom="10px">
            <UserName $fontSize="16px">{post.user_name}</UserName>
          </UserInfo>
          <RecentContent>
            <div>
              {post.text_content}
              {/* {post.likes} */}
            </div>
          </RecentContent>
        </ListItem>
      ))}
    </List>
  );
};

export default PopularPost;
