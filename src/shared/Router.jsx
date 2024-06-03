import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
