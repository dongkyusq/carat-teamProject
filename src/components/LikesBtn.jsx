import React, { useEffect, useState, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import supabase from "../supabaseClient";
import styled from "styled-components";

export default function LikesBtn({ post }) {
  return (
    <StyledButton onClick={handleLike}>
      {liked ? <FavoriteIcon sx={iconStyle} /> : <FavoriteBorderIcon sx={iconStyle} />}
      <LikesCount>{post.likes}</LikesCount>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  &:hover {
    color: #f8cacc;
  }
`;

const iconStyle = {
  fontSize: "30px",
};

const LikesCount = styled.p`
  margin: 4px 0 0 2px;
  font-size: 20px;
  color: white;
`;
