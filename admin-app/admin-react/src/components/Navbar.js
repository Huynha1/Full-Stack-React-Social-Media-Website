import React, { Component, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {
  // this navigate hook will be used to navigate to the sign up page after signing out
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <div
          to="/dashboard"
          style={{ textDecoration: "none", color: "white" }}
          className="navbar-brand"
        >
          Loop Agile Now Admin 
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <li class="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/viewusers">
                  View Users
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/viewposts">
                  View Posts
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
