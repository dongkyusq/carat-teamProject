import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search";
import Weather from "../components/Weather";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
