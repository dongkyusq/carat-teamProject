import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../API/posts";
import { uploadFile } from "../API/storage";
import { addPost } from "../redux/slices/postSlice";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function NewsfeedCreate() {
  const [postContent, setPostContent] = useState("");
  const [postImgFile, setPostImgFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const imgObj = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetImg = useCallback(() => {
    setPostImgFile(null);
    setPreviewUrl("");
  }, []);

  const resetText = useCallback(() => {
    setPostContent("");
  }, []);

  const handleContentChange = e => {
    setPostContent(e.target.value);
  };

  const handleImageChange = e => {
    const fileObj = e.target.files[0];
    setPostImgFile(fileObj);
    const objectUrl = URL.createObjectURL(fileObj);
    imgObj.current = objectUrl;
    setPreviewUrl(objectUrl);
  };

  async function getUserNickname() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: user_data, error } = await supabase.from("user_data").select("nickname, mbti").eq("id", user.id);
    if (error) {
      alert("닉네임이 존재하지 않습니다. 현재 계정을 삭제 후 다시 생성하여 주십시오.");
      return;
    }
    console.log(user_data);
    return [user_data[0].nickname, user_data[0].mbti, user];
  }

  const sendContent = async e => {
    e.preventDefault();

    if (!confirm("작성된 내용을 게시할까요?")) {
      return;
    }

    if (!postContent) {
      alert("작성된 내용이 없습니다.");
      return;
    }

    const [userNickname, userMbti, user] = await getUserNickname();

    if (postImgFile) {
      uploadFile(postImgFile).then(img_content => {
        createPost({
          img_content,
          text_content: postContent,
          user_name: userNickname,
          user_id: user.id,
          mbti: userMbti,
        }).then(([newPost]) => {
          dispatch(addPost(newPost));
          resetImg();
          resetText();
        });
      });
      navigate("../");
      return;
    }

    createPost({
      text_content: postContent,
      user_name: userNickname,
      user_id: user.id,
      mbti: userMbti,
    }).then(([newPost]) => {
      dispatch(addPost(newPost));
      resetImg();
      resetText();
    });

    navigate("../");
  };

  const cancelImgFile = imgObj => {
    event.preventDefault();
    URL.revokeObjectURL(imgObj.current);
    resetImg();
  };

  const goBackPage = e => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <StForm onSubmit={sendContent}>
      <StWriteWrap>
        <StTextareaWrap>
          <StExitBtn onClick={goBackPage}>
            <CloseIcon style={stCloseIcon} />
          </StExitBtn>
          <StTextarea id="postContent" value={postContent} onChange={handleContentChange} placeholder="지금 무슨 생각을 하고 계신가요?"></StTextarea>
        </StTextareaWrap>
        <StToolWrap>
          {previewUrl ? (
            <StImgPreview>
              <img src={previewUrl} alt="미리보기 이미지" width={45} />
              <StCancelBtn onClick={() => cancelImgFile(imgObj)}>
                <CloseIcon style={stCancelIcon} />
              </StCancelBtn>
            </StImgPreview>
          ) : (
            <StNoImg>이미지 없음</StNoImg>
          )}
        </StToolWrap>
        <StToolWrap>
          <StPhotoInputWrap>
            <AddPhotoAlternateIcon style={stPhotoIcon} />
            <StInput type="file" id="postImage" accept="image/*" onChange={handleImageChange} />
          </StPhotoInputWrap>
          <StSendBtn>
            <StSpan>등록하기</StSpan>
            <SendIcon style={stSendIcon} />
          </StSendBtn>
        </StToolWrap>
      </StWriteWrap>
    </StForm>
  );
}

export default NewsfeedCreate;

const StForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -250px;
`;
const StCancelBtn = styled.button`
  margin-left: 10px;

  width: 20px;
  height: 20px;
  border-radius: 9999px;
  text-align: center;

  border: 0;
  background-color: #fefefe7a;
`;
const StWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  height: 500px;
`;
const StTextareaWrap = styled.div`
  position: relative;
  width: 100%;
  height: 71%;
  background-color: #121212;
`;
const StExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
`;
const StTextarea = styled.textarea`
  display: block;
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  padding: 10px;
  border: none;
  resize: none;
  outline: none;
  box-sizing: border-box;
  overflow: auto;
  font-size: 1rem;

  background-color: transparent;
  color: #fefefe;
`;
const StToolWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 14%;
  padding: 10px;
  border-top: 1px solid #fefefe80;
  text-align: center;
  box-sizing: border-box;
  background-color: #121212;
  color: #fefefe80;
`;
const StNoImg = styled.p`
  width: 100%;
  line-height: 49px;
`;
const StPhotoInputWrap = styled.label`
  position: relative;
  width: 10%;
  border: 0;
  cursor: pointer;
`;
const StInput = styled.input`
  display: none;
`;
const StSendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 22%;
  padding: 0;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffd0d0;
`;
const StSpan = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 700;
`;
const StImgPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stCloseIcon = {
  fontSize: "1.4rem",
  color: "#fefefe",
};
const stPhotoIcon = {
  position: "absolute",
  top: "50%",
  left: "50%",
  margin: "-11.2px 0 0 -11.2px",
  fontSize: "1.4rem",
  color: "#fefefe",
};
const stSendIcon = {
  fontSize: "1rem",
  marginTop: "2px",
};
const stCancelIcon = {
  fontSize: "1rem",
  marginLeft: "-5px",
};
