import React from "react";
import { Route, Routes } from "react-router";

// Components
import HomePage from "./HomePage";
import Login from "./Login";

const App = () => {


  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
};

export default App;