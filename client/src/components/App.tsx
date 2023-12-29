import React from "react";
import { Route, Routes } from "react-router";

// Components
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
};

export default App;