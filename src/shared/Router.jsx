import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Home from "../pages/Home";
=======
import Layout from '../Layout';
>>>>>>> 224fb9054749f5b15805ed99d737222a878d7b8f

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
=======
        <Route element={<Layout/>}>
          <Route index element={<Layout/>}/> 
          <Route path="*" element={<Layout/>}/> 
        </Route>
>>>>>>> 224fb9054749f5b15805ed99d737222a878d7b8f
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
