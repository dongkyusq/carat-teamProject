import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Temp from "../pages/Temp"
import Join from "../pages/Join";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
