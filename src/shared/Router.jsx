import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
