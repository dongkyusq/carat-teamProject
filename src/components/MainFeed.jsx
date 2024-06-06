import styled from "styled-components";
import { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSortSlice";
import UserBtns from "./UserBtns";
import CommentModal from "./CommentModal";
import LikeBtn from "./LikesCount";
import supabase from "../supabaseClient";

const MainFeed = ({ userInput }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const filter = useSelector(state => state.posts.filter) || "게시물정렬";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts(filter));
  }, [dispatch, filter]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = date.toLocaleTimeString("ko-KR", options);
    return `${year}년${month}월${day}일 / ${formattedTime}`;
  };

  const handleCommentClick = post => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const filteredPosts = posts
    .filter(post => post.text_content.toLowerCase().includes(userInput.toLowerCase()))
    .sort((a, b) => {
      if (filter === "인기 게시물 순") {
        if (a.likes === null) return 1;
        if (b.likes === null) return -1;
        return b.likes - a.likes;
      }
      return 0;
    });

  return (
    <>
      <List>
        {filteredPosts.map((post, index) => (
          <ListItem key={index}>
            <UserInfo>
              <UserName>{post.user_name}</UserName>
              <TimeBox>{formatDate(post.created_at)}</TimeBox>
            </UserInfo>
            <FeedContent>
              <Posts>{post.text_content}</Posts>
              <IconListBox>
                <ButtonWrap>
                  <Button onClick={() => handleCommentClick(post)}>
                    <CommentIcon sx={iconStyle} />
                  </Button>
                  <Button>
                    <FavoriteBorderIcon sx={iconStyle} />
                    <LikesCount>{post.likes}</LikesCount>
                  </Button>
                </ButtonWrap>
                <UserBtns post={post} />
              </IconListBox>
            </FeedContent>
          </ListItem>
        ))}
      </List>
      <CommentModal isOpen={isModalOpen} onClose={handleCloseModal} user_name={selectedPost?.user_name} text_content={selectedPost?.text_content}>
        {selectedPost}
      </CommentModal>
    </>
  );
};

const ButtonWrap = styled.div`
  display: flex;
`;

const iconStyle = {
  fontSize: "30px",
  color: "white",
  "&:hover": { color: "#f8cacc" },
};

const LikesCount = styled.p`
  margin: 4px 0 0 2px;
  font-size: 20px;
  color: white;
`;

const TimeBox = styled.p`
  margin-left: 10px;
  font-size: 13px;
  color: #b7bec4;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
`;

const IconListBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
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
  border-radius: 15px;
  color: #000;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: keep-all;
`;

export default MainFeed;
