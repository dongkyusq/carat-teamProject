import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../components/Join";
import Home from "../pages/Home";
import Post from "../pages/Post";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
