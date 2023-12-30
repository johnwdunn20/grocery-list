import React from "react";
import { Route, Routes } from "react-router";

// Components
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
    </Routes>
  );
};

export default App;