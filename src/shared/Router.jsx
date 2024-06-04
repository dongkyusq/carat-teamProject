import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from '../components/Layout';
import Login from "../pages/Login";
import Join from "../pages/Join";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Layout />} />
          <Route path="*" element={<Layout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
