import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import SinglePage from '../Pages/SinglePage';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<SinglePage/>} />
    </Routes>
  )
}

export default AllRoutes