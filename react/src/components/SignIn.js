import React, { useState, useContext } from "react";
import SignInBackGround from "../images/Sign_In_Page.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useAlert } from "react-alert";
import { verifyUser, getUser} from "../data/repository";


function SignIn(props) {
  // this use alert hook will alert the user if they successfully signed up
  const success_alert = useAlert();

  // this navigate hook will navigate the user to the dashboard upon successful sign in
  const navigate = useNavigate();

  // these state hooks are for the inputs the user entered on the sign in page
  const [fields, setFields] = useState({ email: "", password: "" });


  // this state hook is used to display login error
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // this hanlder will verify the users login in details to see if they exist in the user data object array
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verify the user using sequelize
    const user = await verifyUser(fields.email, fields.password);

    if (user.block) {
      setFields({ ...fields, password: "" });
      setError("This account has been blocked");
      return
    }

    // If can't find user
    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setError("Incorrect password or email does not exist");
      return;
    }

    // Weclome user once logged in with an alert and navigate to dashboard
    success_alert.success("Welcome " + getUser().username);
    navigate("/dashboard");

  };

  return (
    <div className="SignIn">
      <div>
        <img
          src={SignInBackGround}
          style={{ width: "100%", height: "auto" }}
        ></img>
        <div className="sign-in-card" style={{ backgroundColor: "white" }}>
          <p
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              color: "#A29BDB",
              textAlign: "center",
            }}
          >
            SIGN IN
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                for="InputEmail"
                className="form-label"
                style={{ fontWeight: "bold", color: "#A29BDB" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="employee@example.com"
                required
                value={fields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                // for="exampleInputPassword1"
                className="form-label"
                style={{ fontWeight: "bold", color: "#A29BDB" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={fields.password}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                class="btn btn-primary btn-hover"
                style={{
                  backgroundColor: "#A29BDB",
                  border: "2px solid #A29BDB",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  width: "100px",
                }}
              >
                Sign In
              </button>
              <p></p>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <Link
                to="/sign-up"
                style={{ fontWeight: "bold", color: "#A29BDB" }}
              >
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
