import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search";
import Weather from "../components/Weather";
import Temp from "../pages/Temp";
import Layout from "../Layout";
import PopularPost from "../components/PopularPost";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/" element={<Temp />} />
        <Route path="/PopularPost" element={<PopularPost />} />
        <Route element={<Layout />}>
          <Route index element={<Layout />} />
          <Route path="*" element={<Layout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
