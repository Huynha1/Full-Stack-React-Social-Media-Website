import React, { useState, useContext, useEffect } from "react";
// edit text is a react text edit component that will be used to change the users account information
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  findUserByUsername,
  findUserByEmail,
  getUser,
  removeUser,
  updateUser,
  updateUserWOPassword,
  deleteUser,
  verifyUserByID,
  deletePostByUserId,
  deleteCommentByUserId,
  countPosts,
  deleteFollower,
  deleteFollowing,
  countFollower,
  countFollowing,
} from "../data/repository";

import ProfileBackground from "../images/profile_page.png";
import User_Avatar from "../images/avatar.png";
import Edit_Icon from "../images/edit_icon.png";
import Delete_Icon from "../images/delete_icon.png";
import Check_Icon from "../images/check_icon.png";
import Cross_Icon from "../images/cross_icon.png";

function Profile(props) {
  // this navigate hook will be used to navigate to the sign up page after signing out
  const navigate = useNavigate();

  // this alert hook will be used to show a pop up message when the user deleted or edit their account
  const alert = useAlert();

  // This state will change depending on whether the user are editing their profile details or not
  const [editing, setEditing] = useState(false);
  // These edit states will be the values of the edited profile details
  const [edit_name, setEdit_Name] = useState("");

  const [edit_email, setEdit_Email] = useState("");
  const [date_joined_string, setDate_Joined_String] = useState("");

  // This state will be used to check if the current password input matches with their original password
  const [confirm_current_password, setConfirm_Current_Password] = useState("");

  // These states will be used to for the users new password input
  const [new_password, setNew_Password] = useState("");
  const [confirm_new_password, setConfirm_New_Password] = useState("");

  // These are the error states
  const [name_error, setNameError] = useState(null);
  const [email_error, setEmailError] = useState(null);
  const [password_error, setPassword_Error] = useState(null);

  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // regular expression to check if email is valid
  const valid_email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // regular expression to check if password contains symbols
  const symbols_regex = /[^((0-9)|(a-z)|(A-Z)|\s)]/g;
  // regular expression to check if password contains number
  const numbers_regex = /\w*\d{1,}\w*/g;
  // regular expression to check if password contains uppercase characters
  const uppercase_regex = /[A-Z]+/g;

  async function loadStats() {
    setPostCount(await countPosts(getUser().id));
    setFollowerCount(await countFollower(getUser().id));
    setFollowingCount(await countFollowing(getUser().id));
  }

  // this useeffect hook will set the logged in name as the edit name state
  useEffect(() => {
    loadStats();
    setEdit_Name(getUser().username);
    setEdit_Email(getUser().email);

    // The commands below will build a string for the date in a readable format
    let date_string = "";

    date_string += getUser().date_joined.substring(8, 10) + " ";

    switch (getUser().date_joined.substring(5, 7)) {
      case "01":
        date_string += "Jan ";
        break;
      case "02":
        date_string += "Feb ";
        break;
      case "03":
        date_string += "Mar ";
        break;
      case "04":
        date_string += "Apr ";
        break;
      case "05":
        date_string += "May ";
        break;
      case "06":
        date_string += "Jun ";
        break;
      case "07":
        date_string += "Jul ";
        break;
      case "08":
        date_string += "Aug ";
        break;
      case "09":
        date_string += "Sep ";
        break;
      case "10":
        date_string += "Oct ";
        break;
      case "11":
        date_string += "Nov ";
        break;
      case "12":
        date_string += "Dec ";
        break;
    }

    date_string += getUser().date_joined.substring(0, 4);

    setDate_Joined_String(date_string);
  }, []);

  // This handler will update the changes the user has made to their profile
  const Confirm_Changes = async (e) => {
    // Reset name and email error after every click
    setNameError(null);
    setEmailError(null);
    setPassword_Error(null);

    let name_error_message = [];
    let email_error_message = [];
    // Check database if username is taken
    if (
      (await findUserByUsername(edit_name)) !== null &&
      (await findUserByUsername(edit_name)).id != getUser().id
    ) {
      name_error_message.push(<div>Username is already taken</div>);
    } else if (edit_name.length > 40) {
      name_error_message.push(
        <div>Userame cannot be longer than 40 characters</div>
      );
    }

    if (!valid_email_regex.test(edit_email)) {
      email_error_message.push(<div>Please enter valid email</div>);
    }

    // Check the database is email taken
    //TODO check if email exists but not current
    if (
      (await findUserByEmail(edit_email)) !== null &&
      (await findUserByEmail(edit_email)).id != getUser().id
    ) {
      email_error_message.push(<div>Email is already taken</div>);
    }

    // If there is an error with email or name then return
    if (name_error_message.length > 0 || email_error_message.length > 0) {
      if (name_error_message.length > 0) {
        setNameError(name_error_message);
      }
      if (email_error_message.length > 0) {
        setEmailError(email_error_message);
      }
      return;
    }

    // This array will contain all the password error messages
    let password_error_message = [];

    // the if statements perform password validation on the new passwords
    // the first if statement will check if the current password matches with the users current password
    if (
      confirm_current_password.length > 0 ||
      new_password.length > 0 ||
      confirm_new_password.length > 0
    ) {
      if (
        // if confirm current password is correct
        (await verifyUserByID(getUser().id, confirm_current_password)) === null
      ) {
        password_error_message.push(<div>Current password does not match</div>);
      } else {
        if (new_password != confirm_new_password) {
          password_error_message.push(<div>New passwords do not match.</div>);
        } else {
          if (new_password.length < 8) {
            password_error_message.push(
              <div>New password needs to be at least 8 characters long</div>
            );
          }
          if (!uppercase_regex.test(new_password)) {
            password_error_message.push(
              <div>
                New password needs to contain at least 1 uppercase letter
              </div>
            );
          }
          if (!symbols_regex.test(new_password)) {
            password_error_message.push(
              <div>new password needs to contain at least 1 symbol</div>
            );
          }
          if (!numbers_regex.test(new_password)) {
            password_error_message.push(
              <div>new password needs to contain at least 1 number</div>
            );
          }
        }
      }
    } else if (
      confirm_current_password.length == 0 &&
      new_password.length == 0 &&
      confirm_new_password.length == 0
    ) {
      const user = await updateUserWOPassword(
        getUser().id,
        edit_name,
        edit_email
      );
    }

    // If there are password errors return
    if (password_error_message.length > 0) {
      setPassword_Error(password_error_message);
      return;
    } else if (
      password_error_message.length == 0 &&
      (confirm_current_password.length > 0 ||
        new_password.length > 0 ||
        confirm_new_password.length > 0)
    ) {
      // else if there is
      const user = await updateUser(
        getUser().id,
        edit_name,
        edit_email,
        new_password
      );
    }

    // the states for the current logged in users will be changed to the updated details
    // setLogged_In_Password(new_password);
    setEditing(false);

    //renavigate to page to apply changes to navbar
    navigate("/profile");
    // setLogged_In_Name(edit_name);
    alert.success("Profile details successfully changed");

    // Reset input fields
    setConfirm_Current_Password("");
    setNew_Password("");
    setConfirm_New_Password("");
  };

  // This handler will revert the changes the user has made to their account if they choose to cancel it
  const Cancel_Changes = (e) => {
    // Reset name and email error after every click
    setNameError(null);
    setEmailError(null);
    setPassword_Error(null);

    setConfirm_Current_Password("");
    setNew_Password("");
    setConfirm_New_Password("");

    setEdit_Name(getUser().username);
    setEdit_Email(getUser().email);
    setEditing(false);
    alert.error("Changes Cancelled");
  };

  // This handler will delete the users profile from the user date global state array
  const Delete_Profile = (e) => {
    async function applyDeletion() {
      await Promise.all([
        deletePostByUserId(getUser().id),
        deleteUser(getUser().id),
        deleteCommentByUserId(getUser().id),
        deleteFollower(getUser().id),
        deleteFollowing(getUser().id),
      ]);
      // await deletePostByUserId(getUser().id);
      // await deleteUser(getUser().id);
      // await deleteCommentByUserId(getUser().id);
      // await deleteFollower(getUser().id);
      // await deleteFollowing(getUser().id);
    }

    const confirmBox = window.confirm("Confirm to delete your account");
    if (confirmBox === true) {
      applyDeletion();
      //TODO delete follows too and votes
      removeUser();
      navigate("/sign-up");
      alert.show("Account has been deleted");
    }
  };

  return (
    <div className="Profile">
      <img src={ProfileBackground} style={{ width: "100%", height: "auto" }} />
      <div style={{ margin: "auto", width: "500px" }}>
        <div className="profile-card">
          {/* The tags below will display the user's name and the edittext tag will allow the user to edit their name */}
          {editing ? (
            <EditText
              defaultValue={edit_name}
              value={edit_name}
              editButtonProps={{
                style: {
                  marginLeft: "5px",
                  width: 16,
                  backgroundColor: "rgb(0,0,0, 0)",
                },
              }}
              showEditButton
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                backgroundColor: "rgb(0,0,0, 0)",
              }}
              onChange={(e) => setEdit_Name(e.target.value)}
            />
          ) : (
            <p
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              {edit_name}
            </p>
          )}
          {name_error && (
            <div
              style={{ fontSize: "15px", color: "red", textAlign: "center" }}
            >
              {name_error}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <img src={User_Avatar} style={{ width: "125px" }} />
          </div>
          <p />
          {editing ? (
            <EditText
              defaultValue={edit_email}
              value={edit_email}
              editButtonProps={{
                style: {
                  marginLeft: "5px",
                  width: 16,
                  backgroundColor: "rgb(0,0,0, 0)",
                },
              }}
              showEditButton
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                backgroundColor: "rgb(0,0,0, 0)",
              }}
              onChange={(e) => setEdit_Email(e.target.value)}
            />
          ) : (
            <p
              style={{
                fontSize: "20px",
                color: "#c7c7c7",
                textAlign: "center",
              }}
            >
              {edit_email}
            </p>
          )}
          {email_error && (
            <div
              style={{ fontSize: "15px", color: "red", textAlign: "center" }}
            >
              {email_error}
            </div>
          )}
          <div
            style={{
              fontSize: "20px",
              color: "#c7c7c7",
              textAlign: "center",
            }}
          >
            {followingCount} Followers
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#c7c7c7",
              textAlign: "center",
            }}
          >
            {followerCount} Following
          </div>
          <p
            style={{
              fontSize: "20px",
              color: "#c7c7c7",
              textAlign: "center",
            }}
          >
            {postCount} Posts
          </p>
          <p
            style={{
              fontSize: "20px",
              color: "#c7c7c7",
              textAlign: "center",
            }}
          >
            Joined: {date_joined_string}
          </p>
          {editing && (
            <div>
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                  required
                  value={confirm_current_password}
                  onChange={(e) => setConfirm_Current_Password(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  required
                  minLength="8"
                  value={new_password}
                  onChange={(e) => setNew_Password(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  required
                  minLength="8"
                  value={confirm_new_password}
                  onChange={(e) => setConfirm_New_Password(e.target.value)}
                />
              </div>
            </div>
          )}
          {password_error && (
            <div
              style={{ fontSize: "15px", color: "red", textAlign: "center" }}
            >
              {password_error}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            {editing ? (
              <img
                class="btn-hover3"
                src={Check_Icon}
                style={{ height: "25px", paddingRight: "10px" }}
                onClick={Confirm_Changes}
                title={"Save Changes"}
                alt=""
              />
            ) : (
              <img
                class="btn-hover3"
                src={Edit_Icon}
                style={{ height: "25px", paddingRight: "10px" }}
                onClick={() => setEditing(true)}
                title={"Edit Profile"}
                alt=""
              />
            )}
            {editing ? (
              <img
                class="btn-hover3"
                src={Cross_Icon}
                style={{ height: "25px", paddingRight: "10px" }}
                onClick={Cancel_Changes}
                title={"Cancel Changes"}
                alt=""
              />
            ) : (
              <img
                class="btn-hover3"
                src={Delete_Icon}
                style={{ height: "25px", paddingLeft: "10px" }}
                onClick={Delete_Profile}
                title={"Delete Profile"}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
