import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route index element={<Layout />} />
        <Route path="*" element={<Layout />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
