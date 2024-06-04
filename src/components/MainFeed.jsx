import styled from "styled-components";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

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

const FeedContent = styled.div`
  width: 100%;
  background: #cc8798;
  border-radius: 20px;

  & > div {
    margin: 20px;
    padding: 20px;
    background: #ffd0d0;
    border-radius: 20px;
    color: #000;
    word-wrap: break-word;
    word-break: keep-all;
  }
`;

const MainFeed = ({ userInput }) => {
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

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase().includes((userInput || "").toLowerCase()));
  console.log("userInput", typeof userInput);

  return (
    <List>
      {filteredPosts.map((post, index) => (
        <ListItem key={index}>
          <UserInfo>
            <UserImg src="/src/assets/User.jpg" alt="User" />
            <UserName>{post.user_name}</UserName>
          </UserInfo>
          <FeedContent>
            <div>{post.text_content}</div>
          </FeedContent>
        </ListItem>
      ))}
    </List>
  );
};

export default MainFeed;
