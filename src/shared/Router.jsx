import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search";
import Weather from "../components/Weather";
import Temp from "../pages/Temp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
