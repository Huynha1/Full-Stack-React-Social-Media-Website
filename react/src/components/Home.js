import React from "react";
import LandingPageBackGround from "../images/Landing_Page_Background.png";
import { Link } from "react-router-dom";

// This is the home/landing page
function Home(props) {
  return (
    <div className="Home">
      <div>
        <img
          src={LandingPageBackGround}
          style={{ width: "100%", height: "auto"}}
        ></img>
        <div className="land-page-text-box container-sm">
          <h1
            style={{
              fontWeight: "bold",
              color: "#33539e",
              textShadow: "0px 0px 0px rgba(0, 0, 0, 0.75)",
            }}
          >
            Welcome to Loop Agile Now
          </h1>
          <h4>
            Loop Agile Now (LAN) is Loop Agile's dedicated social space built
            with the intention of maximising productivity and strengthening the
            bond between colleagues.
          </h4>

          <div style={{ textAlign: "center" }}>
            <Link to="/sign-in">
              <button
                type="button"
                class="btn btn-primary btn-lg btn-hover"
                style={{
                  backgroundColor: "#33539e",
                  border: "2px solid #33539e",
                  borderRadius: "100px",
                  margin: "5px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button
                type="button"
                class="btn btn-primary btn-lg btn-hover"
                style={{
                  backgroundColor: "#d0ddfb",
                  border: "2px solid #33539e",
                  borderRadius: "100px",
                  margin: "5px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
