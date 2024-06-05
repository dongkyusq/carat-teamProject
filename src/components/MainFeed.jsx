import styled from "styled-components";
import { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import supabase from "../supabaseClient";

const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    console.log("Error fetching posts:", error);
  }
  return data;
};

const fetchLikes = async userId => {
  const { data, error } = await supabase.from("likes").select("likes_post").eq("likes_user_id", userId);
  if (error) {
    console.log("Error fetching likes:", error);
  }
  return data;
};

const MainFeed = ({ userInput }) => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector(state => state.user?.currentUser);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts();
      setPosts(posts || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserLikes = async () => {
      if (currentUser && currentUser.id) {
        const likes = await fetchLikes(currentUser.id);
        setLikedPosts(likes.map(like => like.likes_post_id));
      }
    };
    fetchUserLikes();
  }, [currentUser]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = date.toLocaleTimeString("ko-KR", options);
    return `${year}년 ${month}월 ${day}일 / ${formattedTime}`;
  };

  const filteredPosts = posts.filter(post => post.text_content.toLowerCase().includes(userInput.toLowerCase()));

  const handleAdd = async post => {
    if (!currentUser || !currentUser.id) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    if (likedPosts.includes(post.id)) {
      alert("이미 좋아요를 눌렀습니다.");
      return;
    }

    const { data, error } = await supabase.from("likes").insert([{ likes_post: post.id, likes_user_id: currentUser.id }]);

    if (error) {
      console.log("Error inserting like:", error);
    } else {
      setLikedPosts([...likedPosts, post.id]);
    }
  };

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
              <Button onClick={() => handleAdd(post)}>
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
  margin-bottom: unset;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 50px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`;

const UserImg = styled.img`
  border-radius: 100%;
  background: #f8cacc;
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const UserName = styled.span`
  font-size: 18px;
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
