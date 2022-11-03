import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import ViewUsers from "./ViewUsers";
import ViewPosts from "./ViewPosts";
import UserContext from "./UserContext";

function App() {

  return (
    // The outer provider tag is for the react alert modules

    <UserContext.Provider
      value={{
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewusers" element={<ViewUsers />} />
          <Route path="/viewposts" element={<ViewPosts />} />
        </Routes>
        
        <Footer />
      </Router>
    </UserContext.Provider>

  );
}

export default App;
