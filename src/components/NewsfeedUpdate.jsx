import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../API/posts";
import { uploadFile } from "../API/storage";
import { addPost } from "../redux/slices/postSlice";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function NewsfeedUpdate() {
  const [postContent, setPostContent] = useState(""); //slice 분리 필요
  const [postImgFile, setPostImgFile] = useState(null); //slice 분리 필요
  const [previewUrl, setPreviewUrl] = useState(""); //slice 분리 필요

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgObj = useRef(null);

  const getTargetPost = async () => {
    const { data: targetPost, error } = await supabase.from("posts").select().eq("id", location.state);
    console.log(targetPost);
    setPostContent(targetPost[0].text_content);
    setPreviewUrl(targetPost[0].img_content);
    return;
  };

  useEffect(() => {
    getTargetPost();
  }, []);

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

  const updateContent = async e => {
    e.preventDefault();

    if (!confirm("수정된 내용을 게시할까요?")) {
      return;
    }

    if (!postContent) {
      alert("작성된 내용이 없습니다.");
      return;
    }

    if (postImgFile) {
      // 사용자가 이미지 선택 했을 때
      uploadFile(postImgFile).then(img_content => {
        updatePost({
          img_content,
          text_content: postContent,
          postId: location.state,
        }).then(([updatedPost]) => {
          dispatch(addPost(updatedPost));
          resetImg();
          resetText();
        });
      });
      return;
    }
    // 이미지 선택 안했을 때
    updatePost({
      text_content: postContent,
      postId: location.state,
    }).then(([updatedPost]) => {
      dispatch(addPost(updatedPost));
      resetImg();
      resetText();
    });

    navigate("../");
  };

  const cancelImgFile = async imgObj => {
    event.preventDefault();
    URL.revokeObjectURL(imgObj.current); // 문제 : 삭제 후 같은 이미지를 다시 올리는 작업이 불가하다
    const { data, error } = await supabase.storage.from("img_content").remove([`public/${previewUrl}`]);
    resetImg();
  };

  const goBackPage = e => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <StForm onSubmit={updateContent}>
      <StWriteWrap>
        <StTextareaWrap>
          <StExitBtn onClick={goBackPage}>
            <CloseIcon style={stCloseIcon} />
          </StExitBtn>
          <StTextarea id="postContent" value={postContent} onChange={handleContentChange} placeholder="지금 무슨 생각을 하고 계신가요? Update"></StTextarea>
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
          <StEditBtn>
            <StSpan>수정완료</StSpan>
            <EditIcon style={stEditIcon} />
          </StEditBtn>
        </StToolWrap>
      </StWriteWrap>
    </StForm>
  );
}

export default NewsfeedUpdate;

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
const StEditBtn = styled.button`
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
const stEditIcon = {
  fontSize: "1rem",
  marginTop: "2px",
};
const stCancelIcon = {
  fontSize: "1rem",
  marginLeft: "-5px",
};
