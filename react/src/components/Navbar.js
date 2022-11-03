import React, { Component, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import companylogo from "../images/LANLogo3D.png";
import UserContext from "./UserContext";
import { useAlert } from "react-alert";
import { getUser, removeUser } from "../data/repository";

function Navbar(props) {
  // this alert hook will alert the user once they sign out
  const alert = useAlert();

  // this navigate hook will be used to navigate to the sign up page after signing out
  const navigate = useNavigate();

  // This handler will change the logged in state to false and sign the user out
  const SignOut = (e) => {
    // setLogged_In(false);
    // setLogged_In_Name("");
    // setLogged_In_Email("");
    // setLogged_In_Password("");
    // setUser_Date_Joined("");
    removeUser();
    alert.success("Sign out successful");
    navigate("/sign-in");
  };

  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        {getUser() ? (
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
            className="navbar-brand"
          >
            Loop Agile Now
          </Link>
        ) : (
          <Link
            to="/home"
            style={{ textDecoration: "none", color: "white" }}
            className="navbar-brand"
          >
            Loop Agile Now
          </Link>
        )}
        {getUser() ? (
          <Link to="/dashboard">
            <img
              src={companylogo}
              alt=""
              height="35"
              className="d-inline-block align-text-top navbar-logo-space navbar-logo-center"
            />
          </Link>
        ) : (
          <Link to="/home">
            <img
              src={companylogo}
              alt=""
              height="35"
              className="d-inline-block align-text-top navbar-logo-space navbar-logo-center"
            />
          </Link>
        )}
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {getUser() && (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {getUser().username}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link
                      to="/profile"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <a class="dropdown-item">View Profile</a>
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      style={{ color: "red" }}
                      onClick={SignOut}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </li>
            )}
            {!getUser() && (
              <li class="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            )}
            {getUser() && (
              <li class="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            {getUser() && (
              <li class="nav-item">
                <Link className="nav-link" to="/follow-page">
                  Find People
                </Link>
              </li>
            )}
            {!getUser() && (
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  Sign In
                </Link>
              </li>
            )}
            {!getUser() && (
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
          {getUser() && window.location.href.substring(22) != "postpage" && (
            <Link to="/postpage">
              <button
                class="btn btn-primary btn-hover2"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(40,27,131,1) 0%, rgba(124,71,171,1) 50%, rgba(255,118,191,1) 100%)",
                  border: "0px",
                }}
              >
                New Post +
              </button>
            </Link>
          )}
          {getUser() && window.location.href.substring(22) == "postpage" && (
            <button
              class="btn btn-primary"
              style={{
                background:
                  "linear-gradient(90deg, rgba(40,27,131,1) 0%, rgba(124,71,171,1) 50%, rgba(255,118,191,1) 100%)",
                border: "0px",
              }}
              disabled
            >
              New Post +
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
