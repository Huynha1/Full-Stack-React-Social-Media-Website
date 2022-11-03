import React, { useState, useContext, useEffect } from "react";
// edit text is a react text edit component that will be used to change the users account information
import "react-edit-text/dist/index.css";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  getUser,
  getAllUsers,
  follow,
  unfollow,
  getFollowing,
  getFollowers,
  findUser,
} from "../data/repository";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProfileBackground from "../images/profile_page.png";

function FollowPage(props) {
  // this navigate hook will be used to navigate to the sign up page after signing out
  const navigate = useNavigate();
  const success_alert = useAlert();

  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

  // This function will display the list for the following and unfollowed users
  async function loadUsers() {
    const user_list = await getAllUsers();
    const following_list = await getFollowing(getUser().id);
    const follower_list = await getFollowers(getUser().id);

    const filtered_user_list = [];

    let is_following = false;

    // dont add the logged in user to the list so it wont be displayed on the people to follow list
    for (let i = 0; i < user_list.length; ++i) {
      for (let j = 0; j < following_list.length; ++j) {
        if (user_list[i].id == following_list[j].following_id) {
          is_following = true;
        }
      }
      if (user_list[i].id != getUser().id && !is_following) {
        filtered_user_list.push(user_list[i]);
      }

      is_following = false;
    }

    // find the user being followed based on id
    for (let i = 0; i < following_list.length; ++i) {
      const current_user = await findUser(following_list[i].following_id);
      following_list[i].username = current_user.username;
    }

    // find the followers and set their names
    for (let i = 0; i < follower_list.length; ++i) {
      const current_user = await findUser(follower_list[i].follower_id);
      follower_list[i].username = current_user.username;
      follower_list[i].isFollowing = false;

      for (let j = 0; j < following_list.length; ++j) {
        if (follower_list[i].follower_id == following_list[j].following_id) {
          follower_list[i].isFollowing = true;
        }
      }
    }

    setFollowers(follower_list);
    setFollowingUsers(following_list);
    setUsers(filtered_user_list);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const handleFollow = async (event) => {
    await follow(getUser().id, event.target.value);
    loadUsers();

    // success_alert.success(event.target.value);
  };

  const handleUnfollow = async (event) => {
    await unfollow(getUser().id, event.target.value);
    loadUsers();

    // success_alert.success(event.target.value);
  };

  return (
    <div className="FollowPage">
      <img src={ProfileBackground} style={{ width: "100%", height: "auto" }} />
      <div style={{ margin: "auto", width: "80%" }}>
        <div className="follow-card">
          <Container>
            <Row>
              <Col style={{ height: "835px" }}>
                <div className="follow-sub-card">
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "2.5%",
                    }}
                  >
                    Following
                  </div>
                  <div className="scroll-box">
                    {followingUsers.length > 0 &&
                      followingUsers.map((user) => (
                        <div className="user-follow-icon">
                          <Link
                            to={"/view-posts/" + user.following_id}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {user.username}
                          </Link>
                          <button
                            type="button"
                            value={user.following_id}
                            onClick={handleUnfollow}
                            className="btn btn-danger"
                            style={{
                              float: "right",
                              marginTop: "-2.25%",
                              width: "auto",
                              height: "100%",
                            }}
                          >
                            Unfollow
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
              <Col style={{ height: "835px" }}>
                <div className="follow-sub-card">
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "2.5%",
                    }}
                  >
                    Followers
                  </div>
                  <div className="scroll-box">
                    {followers.length > 0 &&
                      followers.map((user) => (
                        <div className="user-follow-icon">
                          {user.username}

                          {user.isFollowing && (
                            <button
                              type="button"
                              value={user.follower_id}
                              onClick={handleUnfollow}
                              className="btn btn-danger"
                              style={{
                                float: "right",
                                marginTop: "-2.25%",
                                width: "auto",
                                height: "100%",
                              }}
                            >
                              Unfollow
                            </button>
                          )}

                          {!user.isFollowing && (
                            <button
                              type="button"
                              value={user.follower_id}
                              className="btn btn-primary"
                              onClick={handleFollow}
                              style={{
                                float: "right",
                                marginTop: "-2.25%",
                                width: "auto",
                                height: "100%",
                              }}
                            >
                              Follow
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
              <Col style={{ height: "835px" }}>
                <div className="follow-sub-card">
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "2.5%",
                    }}
                  >
                    People you may know
                  </div>
                  <div className="scroll-box">
                    {users.length > 0 &&
                      users.map((user) => (
                        <div className="user-follow-icon">
                          {user.username}

                          <button
                            type="button"
                            value={user.id}
                            className="btn btn-primary"
                            onClick={handleFollow}
                            style={{
                              float: "right",
                              marginTop: "-2.25%",
                              width: "auto",
                              height: "100%",
                            }}
                          >
                            Follow
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default FollowPage;
