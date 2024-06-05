import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Layout from "../components/Layout";
import Login from "../components/Login";
=======
>>>>>>> 25b5930d34c6107ae13589ea3e77c98e9e3a9d09
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
<<<<<<< HEAD
        <Route path="/mypage" element={<MyPage />} />
=======
>>>>>>> 25b5930d34c6107ae13589ea3e77c98e9e3a9d09
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
