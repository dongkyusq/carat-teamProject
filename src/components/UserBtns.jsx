import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { getId } from "../API/authkeep";
import supabase from "../supabaseClient";

function UserBtns({ post }) {
  const [loggedId, setLoggedId] = useState(null);

  const getAuthId = () => {
    getId().then(data => {
      setLoggedId(data);
    });
  };

  useEffect(() => {
    getAuthId();
  }, []);

  /*
  삭제 클릭 시: 게시물을 바로 삭제.(x)
  수정 클릭 시: 글 등록 페이지로 이동하여 기존 글의 내용이 들어가도록 한다. 사용자가 작성한 글과 사진 모두 들어와야 한다. 수정 후에 해당 게시글의 날짜는 유지한다.
  */

  const deletePost = async () => {
    if (!confirm("해당 게시물을 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    location.reload();
  };

  return (
    <>
      {post.user_id === loggedId && (
        <StUserBtns>
          <button className="userBtn" onClick={deletePost}>
            <DeleteIcon sx={iconStyle} />
          </button>
          <button className="userBtn">
            <EditIcon sx={iconStyle} />
          </button>
        </StUserBtns>
      )}
    </>
  );
}

export default UserBtns;

const StUserBtns = styled.div`
  display: flex;

  .userBtn {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    display: flex;
  }
`;

const iconStyle = {
  fontSize: "30px",
  color: "white",
  "&:hover": { color: "#f8cacc" },
};
