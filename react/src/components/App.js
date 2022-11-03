import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Navbar from "./Navbar";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Footer from "./Footer";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import PostPage from "./Post";
import Comment from "./Comment";
import UserContext from "./UserContext";
import FollowPage from "./FollowPage";
import ViewPosts from "./ViewPosts";
import { getUser } from "../data/repository";

// this handle is for the alerts for login and sign up
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  offset: '50px'
  
};

function App() {
  // This global state hook is used to check whether a user is logged in
  const [logged_in, setLogged_In] = useState(false);

  // These global state hooks are used to store user's name, email and date joined
  const [logged_in_name, setLogged_In_Name] = useState("");
  const [logged_in_email, setLogged_In_Email] = useState("");
  const [logged_in_password, setLogged_In_Password] = useState("");
  const [user_date_joined, setUser_Date_Joined] = useState("");

  // This global state hook will contain objects of users who have an account
  // These objects contain the items user_name, user_email, user_password, date_joined
  const [user_data, setUser_Data] = useState([]);

  // This state wil contain the user posts
  const [user_post, setUser_Post] = useState([]);

  // This state will contain the html elements of the user post
  const [user_post_html, setUser_Post_Html] = useState([]);

  return (
    // The outer provider tag is for the react alert modules
    <Provider template={AlertTemplate} {...options}>
    <UserContext.Provider
      value={{
        logged_in,
        setLogged_In,
        logged_in_name,
        setLogged_In_Name,
        logged_in_email,
        setLogged_In_Email,
        logged_in_password,
        setLogged_In_Password,
        user_date_joined,
        setUser_Date_Joined,
        user_data,
        setUser_Data,
        user_post,
        setUser_Post,
        user_post_html,
        setUser_Post_Html
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="postpage" element={<PostPage/>}/>
          <Route path="comment/:postId" element={<Comment/>}/>
          <Route path="follow-page" element={<FollowPage/>}/>
          <Route path="view-posts/:userId" element={<ViewPosts/>}/>
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
    </Provider>

  );
}

export default App;
