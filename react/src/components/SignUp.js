import React, { useState, useContext } from "react";
import SignUpBackGround from "../images/Sign_Up_Page.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useAlert } from "react-alert";
import {findUserByUsername, findUserByEmail, createUser, setUser} from "../data/repository";

function SignUp(props) {
  // this use alert hook will alert the user if they successfully signed up
  const success_alert = useAlert();

  // this navigate hook will navigate user to dashboard upon succesful sign up
  const navigate = useNavigate();

  // state hooks below are used for the input and to store some errors so that they can be displayed
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm_password, setConfirm_Password] = useState("");
  const [error, setError] = useState(null);
  const [email_error, setEmailError] = useState(null);
  const [name_error, setNameError] = useState(null);

  // This state will store the users that has signed up into an object array
  // const { user_data, setUser_Data } = useContext(UserContext);

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if (!isValid) return;

    // Create user.
    const user = await createUser(trimmedFields);

    success_alert.success("Sign Up Successful");

    // Set user local storage
    setUser(user);

    // add navigation here
    navigate("/dashboard");

  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();

    // regular expression to check if password contains symbol
    // const symbols = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

    // regular expression to check if email is valid
    const valid_email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // regular expression to check if password contains symbols
    const symbols_regex = /[^((0-9)|(a-z)|(A-Z)|\s)]/g;

    // regular expression to check if password contains number
    const numbers_regex = /\w*\d{1,}\w*/g;

    // regular expression to check if password contains uppercase characters
    const uppercase_regex = /[A-Z]+/g;

    // Array for storing name error messages
    let name_error_message = [];

    //this array will be used to add on error messages to the password error so that a list of errors can be displayed
    let password_error_message = [];

    let email_error_message = [];

    let key = "username";
    let field = trimmedFields[key];

    if (field.length > 40) {
      name_error_message.push(
        <div>Username cannot be more than 40 characters long</div>
      );
    }
    // if (numbers_regex.test(field) || symbols_regex.test(field)) {
    //   name_error_message.push(
    //     <div>Username cannot contain numbers or symbols</div>
    //   );
    // }
    if ((await findUserByUsername(trimmedFields.username)) !== null) {
      // currentErrors[key] = "Username is already registered.";
      name_error_message.push(<div>Username is already registered</div>);
    }

    key = "email";
    field = trimmedFields[key];
    if ((await findUserByEmail(trimmedFields.email)) !== null) {
      email_error_message.push(<div>Email is already registered</div>);
    } else if (!valid_email_regex.test(field)) {
      email_error_message.push(<div>Please enter a valid email</div>);
    }

    key = "password";
    field = trimmedFields[key];
    if (field != trimmedFields.confirmPassword) {
      password_error_message.push("Passwords do not match");
    } else {
      if (!uppercase_regex.test(field)) {
        password_error_message.push(
          <div>Password needs to contain at least 1 uppercase letter</div>
        );
      }
      if (!symbols_regex.test(field)) {
        password_error_message.push(
          <div>Password needs to contain at least 1 symbol</div>
        );
      }
      if (!numbers_regex.test(field)) {
        password_error_message.push(
          <div>Password needs to contain at least 1 number</div>
        );
      }
    }

    setError(password_error_message);
    setNameError(name_error_message);
    setEmailError(email_error_message);

    return { trimmedFields, isValid: (password_error_message.length == 0 && name_error_message.length == 0 && email_error_message.length == 0) };
  };

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  return (
    <div className="SignUp">
      <div>
        <img
          src={SignUpBackGround}
          style={{ width: "100%", height: "auto" }}
        ></img>
        <div style={{ margin: "auto", width: "500px" }}>
          {" "}
          {/* These inline styles are used to center the sign up card  */}
          <div className="sign-up-card" style={{ backgroundColor: "white" }}>
            <p
              style={{
                fontSize: "35px",
                fontWeight: "bold",
                color: "#A29BDB",
                textAlign: "center",
              }}
            >
              SIGN UP
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#A29BDB" }}
                >
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  required
                  value={fields.username}
                  onChange={handleInputChange}
                />
                {name_error && <div style={{ color: "red" }}>{name_error}</div>}
              </div>
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
                  name="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="employee@example.com"
                  required
                  value={fields.email}
                  onChange={handleInputChange}
                />
                {email_error && (
                  <div style={{ color: "red" }}>{email_error}</div>
                )}
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
                  minLength="8"
                  value={fields.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label
                  // for="exampleInputPassword1"
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#A29BDB" }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Password"
                  required
                  minLength="8"
                  value={fields.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  value="Submit"
                  class="btn btn-primary btn-hover"
                  style={{
                    backgroundColor: "#A29BDB",
                    border: "2px solid #A29BDB",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    width: "100px",
                  }}
                >
                  Sign Up
                </button>
                <p></p>
                {/* This line below displays the error if password validation fails. */}
                {error && <div style={{ color: "red" }}>{error}</div>}
                <p></p>
                <Link
                  to="/sign-in"
                  style={{ fontWeight: "bold", color: "#A29BDB" }}
                >
                  Already have an account? Click here to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
