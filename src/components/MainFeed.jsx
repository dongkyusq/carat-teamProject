import styled from "styled-components";
import { useEffect } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSortSlice";

const MainFeed = ({ userInput }) => {
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = date.toLocaleTimeString("ko-KR", options);
    return `${year}년${month}월${day}일 / ${formattedTime}`;
  };

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase().includes(userInput.toLowerCase()));

  return (
    <List>
      {filteredPosts.map((post, index) => (
        <ListItem key={index}>
          <UserInfo>
            <UserImg src="/src/assets/User.jpg" alt="User" />
            <UserName>{post.user_name}</UserName>
            <TimeBox>{formatDate(post.created_at)}</TimeBox>
          </UserInfo>
          <FeedContent>
            <Posts>{post.text_content}</Posts>
            <IconListBox>
              <Button>
                <CommentIcon style={commentIcon} />
              </Button>
              <Button>
                <FavoriteBorderIcon style={likeIcon} />
              </Button>
            </IconListBox>
          </FeedContent>
        </ListItem>
      ))}
    </List>
  );
};

const TimeBox = styled.p`
  margin-left: 10px;
  font-size: 13px;
  color: #b7bec4;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const commentIcon = {
  fontSize: "40px",
  color: "white",
};

const likeIcon = {
  fontSize: "40px",
  color: "white",
};

const IconListBox = styled.div`
  display: flex;
  margin: 0 0 5px 15px;
`;

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
  font-size: ${props => props.$fontSize || "18px"};
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
  border-radius: 20px;
  color: #000;
  word-wrap: break-word;
  word-break: keep-all;
`;

export default MainFeed;
