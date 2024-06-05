import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../components/Login";
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
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
