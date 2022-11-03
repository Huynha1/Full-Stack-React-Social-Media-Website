import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, blockUser } from "../data/repository";
import Background from "../images/LANABackground.png";


function ViewUsers(props) {
  // These states are used for to display blocked and unblocked users
  const [users, setUsers] = useState([]);
  const [blockedusers, setBlockedUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const currentUsers = await getUsers();

    let unblockedUsers = [];
    let blockedusers = [];

    // check if users are blocked, if so then put the value in their respective array
    for (let i = 0; i < currentUsers.length; ++i) {
      if (currentUsers[i].block) {
        blockedusers.push(currentUsers[i]);
      } else {
        unblockedUsers.push(currentUsers[i]);
      }
    }

    setUsers(unblockedUsers);
    setBlockedUsers(blockedusers);
  }

  const handleBlock = async (event) => {
    const user = { id: parseInt(event.target.value), blockvalue: true };
    await blockUser(user);
    loadUsers();
  };

  const handleUnblock = async (event) => {
    const user = { id: parseInt(event.target.value), blockvalue: false };
    await blockUser(user);
    loadUsers();
  };

  return (
    <div className="ViewUsers">
      <img src={Background} style={{ width: "100%", height: "auto" }}></img>
        <div className="admin-users-card">
          <div className="column">
            <div className="follow-sub-card" style={{ height: "650px" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "2.5%",
                  color: "black",
                }}
              >
                Blocked Users
              </div>
              <div className="scroll-box">
                {blockedusers.length > 0 &&
                  blockedusers.map((user) => (
                    <div
                      className="user-follow-icon"
                      style={{ color: "black" }}
                    >
                      <Link
                        to={"" + user.following_id}
                        style={{ textDecoration: "none", color: "black"}}
                      >
                        {user.username}
                      </Link>
                      <button
                        type="button"
                        value={user.id}
                        onClick={handleUnblock}
                        className="btn btn-primary"
                        style={{
                          float: "right",
                          marginTop: "-5px",
                          width: "auto",
                          height: "100%",
                        }}
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="follow-sub-card" style={{ height: "650px" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "2.5%",
                  color: "black",
                }}
              >
                Users
              </div>
              <div className="scroll-box">
                {users.length > 0 &&
                  users.map((user) => (
          
                      <div
                        className="user-follow-icon"
                        style={{ color: "black" }}
                      >
                        {user.username}

                        <button
                          type="button"
                          value={user.id}
                          onClick={handleBlock}
                          className="btn btn-danger"
                          style={{
                            float: "right",
                            marginTop: "-5px",
                            width: "auto",
                            height: "100%",
                          }}
                        >
                          Block
                        </button>
                      </div>
                    
                  ))}
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      
    </div>
  );
}

export default ViewUsers;
